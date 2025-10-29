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
  imgs?: string[];
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

// Subir imágenes
export async function uploadProductImages(
  productId: string,
  files: File[]
): Promise<string[]> {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));

  const { data } = await api.post<{ urls: string[] }>(
    `/files/uploadimages/${productId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data.urls;
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
