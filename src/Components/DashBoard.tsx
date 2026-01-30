import React, { useState } from "react";
import layersData from "../Resources/RoofResources.json";
import resources from "../Resources/DashBoradResource.json";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./DragDrop.css";
import DragLayers from "./DragLayers";
import DropLayers from "./DropLayers";
import DragLayerAccordion from "./DragLayerAccordion";
import { LayerItem, LayerCategory, SelectedLayer } from "../Types/LayerTypes";
import { useDragDropContext } from "../Context/DragDropContext";

const DashBoard = () => {
  const initialLayers: LayerCategory[] = layersData.data.LayerDisplayCategories;

  const [availableCategories, setAvailableCategories] =
    useState<LayerCategory[]>(initialLayers);

  const [selectedLayers, setSelectedLayers] = useState<SelectedLayer[]>([]);

  const [savedState, setSavedState] = useState<SelectedLayer[]>([]);

  // Drag logic

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // LEFT -> RIGHT
    if (destination.droppableId === "column_2") {
      const layerId = Number(draggableId.replace("layer-", ""));

      const draggedLayer = availableCategories
        .flatMap((c) => c.Layers)
        .find((l) => l.LayerId === layerId);

      if (!draggedLayer) return;

      const alreadyAdded = selectedLayers.some(
        (l) => l.LayerId === draggedLayer.LayerId,
      );
      if (alreadyAdded) return;

      setSelectedLayers((prev) => [...prev, draggedLayer]);
    }

    // Reorder RIGHT
    if (
      source.droppableId === "column_2" &&
      destination.droppableId === "column_2"
    ) {
      const items = Array.from(selectedLayers);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setSelectedLayers(items);
    }
  };

  const handleSubmit = () => {
    setSavedState(selectedLayers);
    alert("Layers Saved");
  };

  const handleCancel = () => {
    setSelectedLayers(savedState);
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
        <DropLayers layers={selectedLayers} />
      </div>

    </div>

    <div className="buttons">
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>

  </div>
</DragDropContext>

  );
};

export default DashBoard;
