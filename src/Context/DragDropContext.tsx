import React, { createContext, useContext, useReducer } from "react";
import { DragDropState, initialState } from "../Types/LayerTypes";
import { dragDropReducer, DragDropAction } from "../Actions/DragDropReducer";

type DragDropContextType = {
  state: DragDropState;
  dispatch: React.Dispatch<DragDropAction>;
};

const DragDropContext = createContext<DragDropContextType | null>(null);

export const DragDropProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dragDropReducer, initialState);

  return (
    <DragDropContext.Provider value={{ state, dispatch }}>
      {children}
    </DragDropContext.Provider>
  );
};

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) throw new Error("useDragDrop must be inside Provider");
  return context;
};
