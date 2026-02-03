import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDragDrop } from '../Context/DragDropContext';
import DeleteIcon from "@mui/icons-material/Close";
import './DragDrop.css';
import { LayerItem } from '../Types/LayerTypes';

interface Props {
  layers: LayerItem[];
}

const DropLayers = ({ layers }: Props) => {
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
                <div id={`layer-${layer.LayerId}`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="drop-item"
                  style={{
                    ...provided.draggableProps.style,
                    background:
                      activeLayerId === layer.LayerId
                        ? "#1976d2"
                        : undefined,
                    color:
                      activeLayerId === layer.LayerId ? "#fff" : undefined,
                  }}    
                  onClick={() => dispatch({
                      type: "SET_ACTIVE_LAYER",
                      payload: layer.LayerId,
                    })
                  }
                >
                  {layer.LayerName}
                  <DeleteIcon
                    style={{ cursor: "pointer", float: "right" }}
                    onClick={() => dispatch({ type: "REMOVE_SELECTED_LAYER", payload: layer.LayerId })}
                  />

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
