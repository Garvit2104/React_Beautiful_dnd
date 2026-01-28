import React from "react";
import layersData from "../Resources/RoofResources.json";
import resources from "../Resources/DashBoradResource.json";
import {DragDropContext} from "react-beautiful-dnd";
import './DashBoard.css';
import DragLayers from "./DragLayers";

const DashBoard = () =>{
    const[dragItems,setDragItems] = React.useState(layersData.data.LayerDispalyCategories);
    

    const onDragEnd = (result: any) =>{
}
    return (
       <DragDropContext onDragEnd={onDragEnd}>
           <div className="main">
            <div className="drag-panel">
                <h2 className="layerName">
                    {resources.dragLayerHeading}
                </h2>
            </div>
            <DragLayers data={dragItems} CategoryName={""} CategoryOrder={0} LayerSequence={0} />
            <div className="drop-panel">
                <h2 className="droplayer">
                    {resources.dropLayerHeading}
                </h2>
            </div>
            </div>
       </DragDropContext>
    )
}

export default DashBoard;