import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { LayerCategory } from '../Types/LayerTypes';
import './DragDrop.css';

interface Props {
  layers: LayerCategory[];
}

const DragLayers: React.FC<Props> = ({ layers }) => {
  return (
    <Droppable droppableId="column_1">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="drag-list"
        >
          {layers.map((layer, index) => (
            <Draggable
              draggableId={`left-${layer.CategoryOrder}`}  
              index={index}
              key={layer.CategoryOrder}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style, 
                  }}
                  className="layer-item"
                >
                  {layer.CategoryName}
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

export default DragLayers;
