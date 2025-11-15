import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ICategory } from "@/app/axios/categoriasApi";

interface CategoryStore {
  categories: ICategory[];
  setCategories: (categories: ICategory[]) => void;
  addCategory: (category: ICategory) => void;
  updateCategoryInStore: (category: ICategory) => void;
  removeCategory: (id: string) => void;
  clearCategories: () => void;
  refreshStore: (newCategories: ICategory[]) => void;
}

export const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: [],
      setCategories: (categories) => set({ categories }),
      addCategory: (category) =>
        set((state) => ({ categories: [...state.categories, category] })),
      updateCategoryInStore: (category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === category.id ? category : c
          ),
        })),
      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
      clearCategories: () => set({ categories: [] }),
      refreshStore: (newCategories) => set({ categories: newCategories }),
    }),
    {
      name: "categories-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
