import api from "./axiosInstance";

interface LoginResponse {
  success: string;
  accessToken: string;
  user?: {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  };
}

export const loginRequest = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return data;
};
