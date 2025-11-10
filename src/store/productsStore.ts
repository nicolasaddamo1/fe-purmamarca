import { IProduct } from "@/interfaces/productInterface";
import { IPromotion } from "@/interfaces/promotionsInterface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProductStore {
  products: IProduct[];
  promotions: IPromotion[];
  setProducts: (p: IProduct[]) => void;
  clearProducts: () => void;
  setPromotions: (p: IPromotion[]) => void;
  clearPromotions: () => void;
  toggleAvailability: (id: string, available: boolean) => void;
  updateProductInStore: (updated: IProduct) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      promotions: [],
      setProducts: (p) => set({ products: p }),
      clearProducts: () => set({ products: [] }),
      setPromotions: (prom) => set({ promotions: prom }),
      clearPromotions: () => set({ promotions: [] }),
      toggleAvailability: (id, available) =>
        set((state) => ({
          products: state.products.map((prod) =>
            String(prod.id) === String(id) ? { ...prod, available } : prod
          ),
        })),
      updateProductInStore: (updated) =>
        set((state) => ({
          products: state.products.map((p) =>
            String(p.id) === String(updated.id) ? updated : p
          ),
        })),
    }),
    {
      name: "products-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
