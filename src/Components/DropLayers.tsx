import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { LayerCategory } from '../Types/LayerTypes';
import './DragDrop.css';

interface Props {
  layers: LayerCategory[];
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
              draggableId={`right-${layer.CategoryOrder}`} // ✅ UNIQUE ID
              index={index}
              key={layer.CategoryOrder}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    ...provided.draggableProps.style, // ✅ MUST HAVE
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

export default DropLayers;
