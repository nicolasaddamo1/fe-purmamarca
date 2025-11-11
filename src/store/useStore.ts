import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";

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
        set({ admin: null, token: null });
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

export const useHasHydrated = () => {
  return useStore((state) => state._hasHydrated);
};

export const useAuthActions = () => {
  const logout = useStore((state) => state.logout);

  const handleLogoutAndClearStorage = async () => {
    logout();
    const storage = (useStore.persist?.getOptions().storage ??
      localStorage) as PersistStorage<StoreState>;
    await storage.removeItem("admin-store");
  };

  return { handleLogoutAndClearStorage };
};
