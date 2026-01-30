import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { SelectedLayer } from '../Types/LayerTypes';
import './DragDrop.css';

interface Props {
  layers: SelectedLayer[];
}

const DropLayers: React.FC<Props> = ({ layers }) => {
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
                  className="drop-item"
                  style={{
                    ...provided.draggableProps.style
                  }}
                >
                  {layer.LayerName}
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
