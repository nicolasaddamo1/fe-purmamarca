import Product from "@/components/ProductosView/Product/Product";
import { IProduct } from "@/interfaces/productInterface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


interface ProductStore {
  products: IProduct[];
  setProducts: (p: IProduct[]) => void;
  clearProducts: () => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set) => ({
      products: [],
      setProducts: (p) => set({ products: p }),
      clearProducts:()=> set({products:[]})
    }),
    {
      name: "products-storage",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
