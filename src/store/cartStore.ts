import { IProduct } from "@/interfaces/productInterface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export interface IProdCart extends IProduct{
  stock_order:number
}
interface CartStore {
  prods:IProdCart[];
  addProd: (p: IProdCart) => void;
  clearCart: () => void;
  clearProd:(p:IProdCart)=>void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      prods:[],
      addProd: (p) =>
        set((prev) => {
          const exists = prev.prods.some((prod) => prod.id === p.id);

          const updatedProds = exists
            ? prev.prods.map((prod) => (prod.id === p.id ? p : prod)) 
            : [...prev.prods, p];

          return {prods: updatedProds}        
        }),
      clearCart:()=> set({prods:[]}),
     clearProd:(p)=> set((prev)=>
        {
            const filteredData= prev.prods.filter((prod:IProdCart)=> prod.id !=p.id)
            return{prods:filteredData}

        })
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
