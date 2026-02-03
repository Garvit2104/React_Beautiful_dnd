import React, { useState } from "react";
import { useDragDrop } from "../Context/DragDropContext";
import { MenuItem, Select, Button } from "@mui/material";

const MappedArrowComponent = () => {
  const { state, dispatch } = useDragDrop();
  const { savedLayers } = state;

  const [fromIndex, setFromIndex] = useState<number | "">("");
  const [toIndex, setToIndex] = useState<number | "">("");

  // show only when layers are submitted
  if (savedLayers.length < 2) return null;

  const fromOptions = savedLayers.slice(0, savedLayers.length - 1);
  const toOptions =
    fromIndex === ""
      ? []
      : savedLayers.slice(Number(fromIndex) + 1);

  const handleMap = () => {
    if (fromIndex === "" || toIndex === "") return;

    dispatch({
      type: "ADD_MAPPING",
      payload: {
        fromLayerId: savedLayers[fromIndex].LayerId,
        toLayerId: savedLayers[toIndex].LayerId,
      },
    });

    setFromIndex("");
    setToIndex("");
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h3>Map Layers</h3>

      <Select
        fullWidth
        displayEmpty
        value={fromIndex}
        onChange={(e) => setFromIndex(Number(e.target.value))}
      >
        <MenuItem value="">From Layer</MenuItem>
        {fromOptions.map((l, idx) => (
          <MenuItem key={l.LayerId} value={idx}>
            {l.LayerName}
          </MenuItem>
        ))}
      </Select>

      <Select
        fullWidth
        displayEmpty
        value={toIndex}
        onChange={(e) => setToIndex(Number(e.target.value))}
        style={{ marginTop: 10 }}
        disabled={fromIndex === ""}
      >
        <MenuItem value="">To Layer</MenuItem>
        {toOptions.map((l, idx) => (
          <MenuItem
            key={l.LayerId}
            value={Number(fromIndex) + 1 + idx}
          >
            {l.LayerName}
          </MenuItem>
        ))}
      </Select>

      <Button
        fullWidth
        variant="contained"
        style={{ marginTop: 10 }}
        onClick={handleMap}
      >
        Map
      </Button>
    </div>
  );
};

export default MappedArrowComponent;
