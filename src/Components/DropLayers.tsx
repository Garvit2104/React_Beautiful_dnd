import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDragDrop } from '../Context/DragDropContext';
import DeleteIcon from "@mui/icons-material/Close";
import './DragDrop.css';
import { LayerItem, SelectedLayer } from '../Types/LayerTypes';
import ArrowComponent from './ArrowComponent';

interface Props {
  layers: SelectedLayer[];
  mappings: Array<{ fromIndex: number; toIndex: number }>;
}

const DropLayers = ({ layers, mappings }: Props) => {
  const { state, dispatch  } = useDragDrop();
  const { activeLayerId } = state;
  return (
    <Droppable droppableId="column_2">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="drop-list"
        >
          {layers.map((layer, index) => (
            <Draggable
              key={layer.LayerId}
              draggableId={`right-${layer.LayerId}`}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="drop-row"
                >
                  {/* Layer */}
                  <div
                    id={`layer-${index}`}
                    className="drop-item"
                    style={{
                      background:
                        activeLayerId === layer.LayerId
                          ? "#1976d2"
                          : undefined,
                      color:
                        activeLayerId === layer.LayerId ? "#fff" : undefined,
                    }}
                    onClick={() =>
                      dispatch({
                        type: "SET_ACTIVE_LAYER",
                        payload: layer.LayerId,
                      })
                    }
                  >
                    {layer.LayerName}
                    <DeleteIcon
                      style={{ float: "right", cursor: "pointer" }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_SELECTED_LAYER",
                          payload: layer.LayerId,
                        })
                      }
                    />
                  </div>

                  {/* Arrow Column */}
                  <div className="arrow-column">
                    {mappings
                      .filter((m) => m.fromIndex === index)
                      .map((_, i) => (
                        <ArrowComponent key={i} fromIndex={0} toIndex={0} />
                      ))}
                  </div>
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DropLayers;
