export interface LayerItem {
  LayerId: number;
  LayerName: string;
}

export interface LayerCategory {
  CategoryName: string;
  CategoryOrder: number;
  Layers: LayerItem[];
}

export interface SelectedLayer extends LayerItem {}

export interface DragDropState {
  availableCategories: LayerCategory[];
  selectedLayers: SelectedLayer[];
  savedLayers: SelectedLayer[];   
}

export const initialState: DragDropState = {
  availableCategories: [],
  selectedLayers: [],
  savedLayers: [],  
};

