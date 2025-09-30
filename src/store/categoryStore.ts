import { TCategory } from "@/interfaces/productInterface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


interface CategoryStore {
  categories: TCategory[];
  setCategories: (p: TCategory[]) => void;
  clearCategories: () => void;
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (p) => set({ categories: p }),
      clearCategories:()=> set({categories:[]})
    }),
    {
      name: "categories-storage",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
