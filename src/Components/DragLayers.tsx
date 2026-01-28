import React from 'react';
import { Droppable } from 'react-beautiful-dnd';


type DataLayerProper = {
    data: any;
    CategoryName : string,
    CategoryOrder: number,
    LayerSequence: number
}
const DragLayers = (props : DataLayerProper) => {
  return(
    <div>
        {props.data.LayerDispalyCategories.map((layer : DataLayerProper, index : number) => (
            <Droppable droppableId={layer.CategoryName} key={layer.CategoryName}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                         className="drag-layer"
                    >
                        <p className="layer-text">
                            {layer.CategoryName}
                        </p>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        ))}
    </div>

)}

export default DragLayers;