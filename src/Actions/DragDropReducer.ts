import {LayerItem,LayerCategory, initialState, DragDropState} from '../Types/LayerTypes';

export type DragDropAction =
| { type: "SET_AVAILABLE_CATEGORIES"; payload: LayerCategory[] }
| { type: "SET_SELECTED_LAYERS"; payload: LayerItem[] }
| { type: "ADD_SELECTED_LAYER"; payload: LayerItem }
| { type: "REMOVE_SELECTED_LAYER"; payload: number } // LayerId
| { type: "REORDER_SELECTED_LAYERS"; payload: { fromIndex: number; toIndex: number } }
| { type: "RESET_LAYERS" };


export const dragDropReducer = (state: DragDropState, action: DragDropAction): DragDropState => {
    switch (action.type) {
        case 'SET_AVAILABLE_CATEGORIES':
        return {
            ...state,
            availableCategories: action.payload,
        };
        case 'SET_SELECTED_LAYERS':
        return {
            ...state,
            selectedLayers: action.payload,
        };        
        case "ADD_SELECTED_LAYER": {
            const exists = state.selectedLayers.some(l => l.LayerId === action.payload.LayerId);
            if (exists) return state;
            return {
                ...state,
                selectedLayers: [...state.selectedLayers, action.payload],
            };
        } 
        case "REMOVE_SELECTED_LAYER":
            return {
            ...state,
            selectedLayers: state.selectedLayers.filter(l => l.LayerId !== action.payload),
        };
  
        case "REORDER_SELECTED_LAYERS": {
            const { fromIndex, toIndex } = action.payload;
            if (fromIndex < 0 || toIndex < 0 || fromIndex >= state.selectedLayers.length || toIndex >= state.selectedLayers.length) 
            {
                return state;
            }
  
            const updated = [...state.selectedLayers];
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, moved);
  
            return { ...state, selectedLayers: updated };
        }
  
        case "RESET_LAYERS":
            return initialState;
  
        default:
            return state;
    } 
}
    