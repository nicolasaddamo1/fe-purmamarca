import api from "./axiosInstance";

export async function getAllProducts(){
    const res=await api.get("/products")
    return res.data
}
export async function getProductById(id:string | number){
    const res =await api.get(`/products/${id}`)
    return res.data
}
export async function updateProduct(){}
export async function pathProduct(){}
export async function postProduct(){}
export async function deleteProduct(){}
