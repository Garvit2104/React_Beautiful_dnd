import React, { useEffect, useState } from "react";
import layersData from "../Resources/RoofResources.json";
import resources from "../Resources/DashBoradResource.json";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./DragDrop.css";
import DragLayers from "./DragLayers";
import DropLayers from "./DropLayers";
import DragLayerAccordion from "./DragLayerAccordion";
import { LayerItem, LayerCategory, SelectedLayer } from "../Types/LayerTypes";

import DroppedLayerTable from "./DroppedLayerTable";
import { useDragDrop } from "../Context/DragDropContext";
import MappedArrowComponent from "./MappedArrowComponent";

const DashBoard = () => {
  const { state, dispatch } = useDragDrop();
  const { availableCategories, selectedLayers } = state;

  const [mappings, setMappings] = useState<{ fromIndex: number; toIndex: number }[]>([]);

  // Load initial categories
  useEffect(() => {
    dispatch({
      type: "SET_AVAILABLE_CATEGORIES",
      payload: layersData.data.LayerDisplayCategories,
    });
  }, []);

  // Drag logic

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    // REORDER RIGHT
    if (source.droppableId === "column_2" && destination.droppableId === "column_2"){
      if (source.index === destination.index) return;
      dispatch({
        type: "REORDER_SELECTED_LAYERS",
        payload: { fromIndex: source.index, toIndex: destination.index },
      });
      return;
    }

    // LEFT → RIGHT
    if (destination.droppableId === "column_2") {
      const layerId = Number(draggableId.split("-")[1]);
      const draggedLayer = availableCategories.flatMap((c) => c.Layers).find((l) => l.LayerId === layerId);
      console.log("Dragged Layer:", draggedLayer);
      if (!draggedLayer) return;
      dispatch({ type: "ADD_SELECTED_LAYER", payload: draggedLayer });
    }
  };

  const handleSubmit = () => {
    dispatch({ type: "SAVE_LAYERS" });
  };

  const handleCancel = () => {
    dispatch({ type: "RESET_LAYERS" });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="dashboard-wrapper">
        <div className="dashboard">
          <div className="drag-panel">
            <h2>Available Layers</h2>
            <DragLayerAccordion layers={availableCategories} />
          </div>

          <div className="drop-panel">
            <h2>Selected Layers</h2>
            <DropLayers layers={selectedLayers}
              mappings={mappings}
            />
      
            <MappedArrowComponent layers={selectedLayers}
                  mappings={mappings}
                  setMappings={setMappings}
           />
          
          </div>
        </div>

        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
        <div className="Selected-layers">
          <h2> Submitted Layers</h2>
          <DroppedLayerTable layers={state.savedLayers} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default DashBoard;
