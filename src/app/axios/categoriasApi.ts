import api from "./axiosInstance";

export async function getAllCategories(){
    const res = await api.get("/categories")
    return res.data
}

