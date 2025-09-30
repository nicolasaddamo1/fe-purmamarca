import { IProduct } from "@/interfaces/productInterface";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";


export interface IProdCart extends IProduct{
  stock_order:number
}
interface CartStore {
  order: {
    name:string,
    direccion:string,
    prods:IProdCart[]
  }
  ;
  addProd: (p: IProdCart) => void;
  clearCart: () => void;
  clearProd:(p:IProdCart)=>void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      order: {name:"",direccion:"",prods:[]},
      addProd: (p) => set((prev)=>{return{order:{...prev.order,prods:[...prev.order.prods,p]}}}),
      clearCart:()=> set({order:{name:"",direccion:"",prods:[]}}),
     clearProd:(p)=> set((prev)=>
        {
            const filteredData= prev.order.prods.filter((prod:IProdCart)=> prod.id !=p.id)
            return{order:{...prev.order,prods:filteredData}}

        })
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
