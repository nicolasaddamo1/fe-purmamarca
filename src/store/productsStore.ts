import { IProduct } from "@/interfaces/productInterface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProductStore {
  products: IProduct[];
  setProducts: (p: IProduct[]) => void;
  clearProducts: () => void;
  toggleAvailability: (id: string, available: boolean) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (p) => set({ products: p }),
      clearProducts: () => set({ products: [] }),
      toggleAvailability: (id, available) =>
        set((state) => ({
          products: state.products.map((prod) =>
            String(prod.id) === String(id) ? { ...prod, available } : prod
          ),
        })),
    }),
    {
      name: "products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
