export type LayerCategory = {
  CategoryName: string;
  CategoryOrder: number;
  LayerSequence: number;
  id: number;
  Layers: LayerItem[];
};

export type LayerItem = {
  LayerId: number;
  LayerName: string;
};

export type DragDropState = {
  availableCategories: LayerCategory[];
  selectedLayers: LayerItem[];
};

export type RoofResources = {
  data: {
    LayerDisplayCategories: LayerCategory[];
  };
};

export const initialState: DragDropState = {
  availableCategories: [],
  selectedLayers: [],
};


export type SelectedLayer = LayerItem;




