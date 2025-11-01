import { IPromotion, IPromotionDTO } from "@/interfaces/promotionsInterface";
import api from "./axiosInstance";
import { toast } from "react-toastify";

// ✅ Obtener todas las promociones
export async function getAllPromotions(): Promise<IPromotion[]> {
  try {
    const { data } = await api.get("/promotions");
    return data;
  } catch (error) {
    toast.error("Error al cargar promociones");
    throw error;
  }
}

// ✅ Obtener una promoción por ID
export async function getPromotionById(id: string): Promise<IPromotion> {
  try {
    const { data } = await api.get(`/promotions/${id}`);
    return data;
  } catch (error) {
    toast.error("Error al obtener la promoción");
    throw error;
  }
}

export async function createPromotion(formData: FormData): Promise<IPromotion> {
  try {
    const payload: IPromotionDTO = {
      name: formData.get("name") as string,
       image_url: formData.get("image_url") as string,
      start_date: formData.get("start_date") as string,
      expiration_date: formData.get("expiration_date") as string,
      promo_percentage: formData.get("promo_percentage")
        ? Number(formData.get("promo_percentage"))
        : undefined,
      category_ids: formData.getAll("category_ids") ? formData.getAll("category_ids"):undefined,
    };

    const { data } = await api.post("/promotions", payload);
    return data;
  } catch (error) {
    toast.error("Error al crear la promoción");
    throw error;
  }
}

export async function updatePromotion(
  id: string,
  formData: FormData
): Promise<IPromotion> {
  try {
    const payload: Partial<IPromotionDTO> = {
      name: formData.get("name") as string,
      image_url: formData.get("image_url") as string,
      start_date: formData.get("start_date") as string,
      expiration_date: formData.get("expiration_date") as string,
      promo_percentage: formData.get("promo_percentage")
        ? Number(formData.get("promo_percentage"))
        : undefined,
      category_ids: formData.getAll("category_ids") as string[],
    };

    const { data } = await api.put(`/promotions/${id}`, payload);
    return data;
  } catch (error) {
    toast.error("Error al actualizar la promoción");
    throw error;
  }
}

export async function patchPromotion(
  id: string,
  formData: FormData
): Promise<IPromotion> {
  try {
    const payload: Partial<IPromotionDTO> = {};
    for (const [key, value] of formData.entries()) {
      if (value) {
        if (key === "promo_percentage") {
          (payload as any)[key] = Number(value);
        } else if (key === "category_ids") {
          (payload as any)[key] = formData.getAll("category_ids");
        } else {
          (payload as any)[key] = value;
        }
      }
    }

    const { data } = await api.patch(`/promotions/${id}`, payload);
    return data;
  } catch (error) {
    toast.error("Error al editar la promoción");
    throw error;
  }
}

export async function deletePromotion(id: string) {
  try {
    const { data } = await api.delete(`/promotions/${id}`);
    return data;
  } catch (error) {
    toast.error("Error al eliminar la promoción");
    throw error;
  }
}


export async function uploadPromotionImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("files", file);

    const { data } = await api.post<{ urls: string[] }>(
      `/files/upload-images-no-id/temp`, 
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return data.urls[0];
  } catch (error) {
    toast.error("Error al subir la imagen");
    throw error;
  }
}

