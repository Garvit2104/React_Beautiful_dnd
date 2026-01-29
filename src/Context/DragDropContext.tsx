import React, {createContext, useContext} from 'react';
import { DragDropState, initialState } from '../Types/LayerTypes';
import { dragDropReducer, DragDropAction } from '../Actions/DragDropReducer';

type DragDropContextType = {
    state: DragDropState;
    dispatch: React.Dispatch<DragDropAction>;
};
  
export const DragAndDropContext = createContext<DragDropContextType | undefined>(undefined);

export const useDragDropContext = () => {
    const ctx = useContext(DragAndDropContext);
    if (!ctx) {
      throw new Error("useDragDropContext must be used within DragDropContextProvider");
    }
    return ctx;
  };
  

export const DragDropContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = React.useReducer(dragDropReducer, initialState);
            return (
        <DragAndDropContext.Provider value={{ state, dispatch }}>
            {children}
        </DragAndDropContext.Provider>
    );
}
