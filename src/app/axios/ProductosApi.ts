import api from "./axiosInstance";
import { IProduct } from "@/interfaces/productInterface";

// Obtener todos los productos
export async function getAllProducts(): Promise<IProduct[]> {
  const { data } = await api.get<IProduct[]>("/products");
  return data;
}

export async function getProductById(id: string | number) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}

// Crear producto
export async function createProduct(
  productData: Omit<IProduct, "id" | "imgs" | "category" | "promotion">
): Promise<IProduct> {
  const { data } = await api.post<IProduct>("/products", productData);
  return data;
}

// Subir imágenes
export async function uploadProductImages(
  productId: string,
  files: File[]
): Promise<IProduct> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const { data } = await api.post(
    `/files/uploadimages/${productId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data;
}

// Eliminar producto
export async function deleteProduct(productId: string): Promise<void> {
  await api.delete(`/products/${productId}`);
}

// ✅ Actualizar disponibilidad (PATCH parcial)
export async function updateProductAvailability(
  productId: string,
  available: boolean
): Promise<IProduct> {
  const { data } = await api.patch<IProduct>(`/products/${productId}`, {
    available,
  });
  return data;
}

export async function updateProduct(id:string,data:Partial<IProduct>){
  const res = await api.put(`/products/${id}`,data)
  return res.data
}