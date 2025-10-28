import api from "./axiosInstance";

export interface IProduct {
  id: string;
  name: string;
  description?: string;
  color?: string;
  categoryId: string;
  price: number;
  stock: number;
  size?: string;
  onSale?: boolean;
  available?: boolean;
  imgs?: string[]; // 👈 Cambiado: coincide con el backend
}

// Obtener todos los productos
export async function getAllProducts(): Promise<IProduct[]> {
  const { data } = await api.get<IProduct[]>("/products");
  return data;
}

// Crear producto
export async function createProduct(
  productData: Omit<IProduct, "id" | "imgs">
): Promise<IProduct> {
  const { data } = await api.post<IProduct>("/products", productData);
  return data;
}

// Subir imágenes (usa el endpoint correcto y campo "imgs")
export async function uploadProductImages(
  productId: string,
  files: File[]
): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file)); // 👈 El campo debe ser 'files' (según tu endpoint)

  const { data } = await api.post<{ urls: string[] }>(
    `/files/uploadimages/${productId}`,

    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.urls; // 👈 el backend devuelve "urls", no "imageUrls"
}

// Eliminar producto
export async function deleteProduct(productId: string): Promise<void> {
  await api.delete(`/products/${productId}`);
}
