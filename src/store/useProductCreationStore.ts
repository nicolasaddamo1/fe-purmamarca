// src/store/useProductCreationStore.ts
import { create } from "zustand";

interface ProductCreationStore {
  name: string;
  description: string;
  color: string;
  categoryId: string;
  price: number;
  stock: number;
  size: string;
  onSale: boolean;
  priceOnSale: number;
  available: boolean;
  imgs: File[];
  imgPreviews: string[];
  setField: <K extends keyof ProductCreationStore>(
    key: K,
    value: ProductCreationStore[K]
  ) => void;
  resetForm: () => void;
}

export const useProductCreationStore = create<ProductCreationStore>((set) => ({
  name: "",
  description: "",
  color: "",
  categoryId: "",
  price: 0,
  stock: 0,
  size: "",
  onSale: false,
  priceOnSale: 0,
  available: true,
  imgs: [],
  imgPreviews: [],
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
  resetForm: () =>
    set({
      name: "",
      description: "",
      color: "",
      categoryId: "",
      price: 0,
      stock: 0,
      size: "",
      onSale: false,
      priceOnSale: 0,
      available: true,
      imgs: [],
      imgPreviews: [],
    }),
}));
