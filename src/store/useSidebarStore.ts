import { create } from "zustand";

type SidebarView = "menu" | "newProduct";

interface SidebarStore {
  sidebarView: SidebarView;
  setSidebarView: (view: SidebarView) => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  sidebarView: "menu",
  setSidebarView: (view) => set({ sidebarView: view }),
}));
