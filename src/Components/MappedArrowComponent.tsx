import React, { useState } from "react";
import { useDragDrop } from "../Context/DragDropContext";
import { MenuItem, Select, Button } from "@mui/material";
import { SelectedLayer } from "../Types/LayerTypes";
import ArrowComponent from "./ArrowComponent";
import "./Mapping.css";

interface Props {
  layers: SelectedLayer[];
  mappings: Array<{ fromIndex: number; toIndex: number }>;
  setMappings: React.Dispatch<React.SetStateAction<Array<{ fromIndex: number; toIndex: number }>>>;
}
const MappedArrowComponent = ({ layers, mappings, setMappings }: Props) => {
  const { state, dispatch } = useDragDrop();

  const [fromIndex, setFromIndex] = useState<number | "">("");
  const [toIndex, setToIndex] = useState<number | "">("");


  // show only when layers are submitted
  if (!layers) return null;

  const fromOptions = layers.slice(0, layers.length - 1);
  const toOptions = fromIndex === "" ? [] : layers.slice(Number(fromIndex) + 1);

  const handleMap = () => {
    setMappings((prev) => [
      ...prev,
      {
        fromIndex: Number(fromIndex),
        toIndex: Number(toIndex),
      },
    ]);

    setFromIndex("");
    setToIndex("");
  };

  return (
    <div className="mapping-container">
      <h3 className="mapping-title">Map Layers</h3>

      <div className="mapping-row">
        {/* FROM */}
        <div className="mapping-select">
          <label>From Layer</label>
          <Select
            fullWidth
            displayEmpty
            value={fromIndex}
            onChange={(e) => setFromIndex(Number(e.target.value))}
          >
            <MenuItem value="">Select</MenuItem>
            {fromOptions.map((l, idx) => (
              <MenuItem key={l.LayerId} value={idx}>
                {l.LayerName}
              </MenuItem>
            ))}
          </Select>
        </div>

      

        {/* TO */}
        <div className="mapping-select">
          <label>To Layer</label>
          <Select
            fullWidth
            displayEmpty
            value={toIndex}
            onChange={(e) => setToIndex(Number(e.target.value))}
            disabled={fromIndex === ""}
          >
            <MenuItem value="">Select</MenuItem>
            {toOptions.map((l, idx) => (
              <MenuItem key={l.LayerId} value={Number(fromIndex) + 1 + idx}>
                {l.LayerName}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>

      {/* MAP BUTTON */}
      <div className="mapping-action">
        <Button
          fullWidth
          variant="contained"
          disabled={fromIndex === "" || toIndex === ""}
          onClick={handleMap}
        >
          Map
        </Button>
      </div>
    </div>
  );
};

export default MappedArrowComponent;
