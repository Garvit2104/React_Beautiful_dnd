import { LayerCategory, SelectedLayer, DragDropState, initialState, LayerItem } from "../Types/LayerTypes";

export type DragDropAction =
  | { type: "SET_AVAILABLE_CATEGORIES"; payload: LayerCategory[] }
  | { type: "ADD_SELECTED_LAYER"; payload: LayerItem }
  | { type: "SAVE_LAYERS" }
  | { type: "REMOVE_SELECTED_LAYER"; payload: number }
  | { type: "REORDER_SELECTED_LAYERS"; payload: { fromIndex: number; toIndex: number } }
  | { type: "RESET_LAYERS" };

export const dragDropReducer = (state: DragDropState, action: DragDropAction): DragDropState => {
  switch (action.type) {
    case "SET_AVAILABLE_CATEGORIES":
      return { ...state, availableCategories: action.payload };

    case "ADD_SELECTED_LAYER":
        if(state.selectedLayers.some(l => l.LayerId === action.payload.LayerId)) return state;
        return { ...state, selectedLayers: [...state.selectedLayers, action.payload] };

    case "SAVE_LAYERS":
        return {
            ...state, 
            savedLayers: state.selectedLayers,
        };
    case "REMOVE_SELECTED_LAYER":
      return {
        ...state,
        selectedLayers: state.selectedLayers.filter(l => l.LayerId !== action.payload),
      };

    case "REORDER_SELECTED_LAYERS": {
      const { fromIndex, toIndex } = action.payload;
      const updated = [...state.selectedLayers];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return { ...state, selectedLayers: updated };
    }

    case "RESET_LAYERS":
      return {
        ...state,
        selectedLayers: [],
        savedLayers: [],
      };
    
    default:
      return state;
  }
};
