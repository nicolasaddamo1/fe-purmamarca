import { create } from "zustand";
// Importamos solo lo necesario
import { persist } from "zustand/middleware";

interface Admin {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface StoreState {
  admin: Admin | null;
  token: string | null;
  _hasHydrated: boolean;
  login: (admin: Admin, token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  setHasHydrated: (state: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      admin: null,
      token: null,
      _hasHydrated: false,

      login: (admin, token) => {
        set({ admin, token });
      },

      logout: () => {
        // 1. Limpia el estado de la aplicación
        set({ admin: null, token: null });

        // 2. 🔑 SOLUCIÓN: Usar la función oficial de Zustand para limpiar el almacenamiento persistido
        // Accederemos a esta función fuera de la store (en el hook o componente)
        // ya que acceder a `useStore.persist` directamente aquí es lo que causó el error de runtime.
      },

      isAuthenticated: () => {
        const { token, admin } = get();
        return !!token && !!admin;
      },

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },
    }),
    {
      name: "admin-store",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// ----------------------------------------------------
// Hook de ayuda
export const useHasHydrated = () => {
  return useStore((state) => state._hasHydrated);
};

// ----------------------------------------------------
// 🔑 Nuevo hook para manejar el logout y limpieza de storage
export const useAuthActions = () => {
  const logout = useStore((state) => state.logout);

  const handleLogoutAndClearStorage = () => {
    logout();

    // Ejecutamos la limpieza del storage de forma segura
    // El método persist está disponible en la store principal de Zustand.
    (useStore.persist as any).clearStorage();
  };

  return { handleLogoutAndClearStorage };
};
