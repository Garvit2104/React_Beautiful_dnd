import React,{useState} from "react";
import layersData from "../Resources/RoofResources.json";
import resources from "../Resources/DashBoradResource.json";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import './DragDrop.css';
import DragLayers from "./DragLayers";
import DropLayers from "./DropLayers";
import {Layer } from "../Types/LayerTypes";


const DashBoard = () =>{
   
    const initialLayers: Layer[] = layersData.data.LayerDispalyCategories;

    const[availableLayers, setAvailableLayers] = useState<Layer[]>(initialLayers);

    const [selectedLayers, setSelectedLayers] = useState<Layer[]>([]);

    const [savedState, setSavedState] = useState<Layer[]>([]);

// Drag logic

    const onDragEnd = (result: DropResult) =>{
        const {source, destination} = result;

        if(!destination) return;

        if(source.droppableId === "column_1" && destination.droppableId === "column_2"){
            const item = availableLayers[source.index];
            const alreadyAdded = selectedLayers.some(l => l.id === item.id);
            if (alreadyAdded) return;

                setSelectedLayers(prev => [...prev, item]);
            }

        if(source.droppableId === "column_2" && destination.droppableId === "column_2"){
            const items = Array.from(selectedLayers);
            const[moved] = items.splice(source.index, 1);
            items.splice(destination.index, 0, moved);
            setSelectedLayers(items);
        }
    }

    const handleSubmit = () => {
    setSavedState(selectedLayers);
    alert("Layers Saved");
    };

    const handleCancel = () => {
    setAvailableLayers(initialLayers);
    setSelectedLayers(savedState);
    };
    return (
       <DragDropContext onDragEnd={onDragEnd}>
           <div className="dashboard">
                <div className="drag-panel">
                    <h2 className="layerName">
                        {resources.dragLayerHeading}
                    </h2>
                    <DragLayers layers = {availableLayers} />
                </div>
                <div className="drop-panel">
                    <h2 className="droplayer">
                        {resources.dropLayerHeading}
                    </h2>
                    <DropLayers layers = {selectedLayers} />
                </div>
            </div>

            <div className="buttons">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>

       </DragDropContext>
    )
}

export default DashBoard;