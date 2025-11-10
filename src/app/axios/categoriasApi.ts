import api from "./axiosInstance";

export interface ICategory {
  id: string;
  name: string;
  categoryImage?: string;
}

// Traer todas las categorías
export async function getAllCategories(): Promise<ICategory[]> {
  const { data } = await api.get<ICategory[]>("/categories");
  return data;
}

// Crear categoría
export async function createCategory(name: string): Promise<ICategory> {
  const { data } = await api.post<ICategory>("/categories", { name });
  return data;
}

// Subir imagen
export async function uploadCategoryImage(
  categoryId: string,
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await api.post<{ message: string; imageUrl: string }>(
    `/categories/${categoryId}/upload-image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data.imageUrl;
}

// Actualizar solo nombre
export async function updateCategory(
  categoryId: string,
  data: { name: string }
): Promise<ICategory> {
  const { data: updatedCategory } = await api.patch<ICategory>(
    `/categories/${categoryId}`,
    data
  );
  return updatedCategory;
}

// Eliminar categoría
export async function deleteCategory(categoryId: string): Promise<void> {
  await api.delete<void>(`/categories/${categoryId}`);
}
