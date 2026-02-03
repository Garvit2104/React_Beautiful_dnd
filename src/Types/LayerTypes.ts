export interface LayerItem {
  LayerId: number;
  LayerName: string;
}

export interface LayerCategory {
  CategoryName: string;
  CategoryOrder: number;
  Layers: LayerItem[];
}

export interface LayerMapping {
  fromLayerId: number;
  toLayerId: number;
}

export interface SelectedLayer extends LayerItem {}

export interface DragDropState {
  availableCategories: LayerCategory[];
  selectedLayers: SelectedLayer[];
  savedLayers: SelectedLayer[];  
  mappings: LayerMapping[];
  activeLayerId: number | null;
}

export const initialState: DragDropState = {
  availableCategories: [],
  selectedLayers: [],
  savedLayers: [], 
  mappings: [],
  activeLayerId: null, 
};

