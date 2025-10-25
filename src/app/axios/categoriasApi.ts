import api from "./axiosInstance";

export interface ICategory {
  id: string;
  name: string;
  categoryImage?: string;
}

export async function getAllCategories(): Promise<ICategory[]> {
  const { data } = await api.get<ICategory[]>("/categories");
  return data;
}

export async function createCategory(name: string): Promise<ICategory> {
  const { data } = await api.post<ICategory>("/categories", { name });
  return data;
}

export async function uploadCategoryImage(
  categoryId: string,
  file: File
): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await api.post<{ message: string; imageUrl: string }>(
    `/categories/${categoryId}/upload-image`,
    formData
  );

  return data.imageUrl;
}

export async function deleteCategory(categoryId: string): Promise<void> {
  await api.delete<void>(`/categories/${categoryId}`);
}
