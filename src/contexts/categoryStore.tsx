// src/stores/categoryUIStore.ts
import { create } from "zustand";
import { Category } from "../types/admin";

interface CategoryUIState {
  menuOpen: boolean;
  selectedParent: Category | null;
  selectedChild: Category | null;
  setMenuOpen: (value: boolean) => void;
  setSelectedParent: (cat: Category | null) => void;
  setSelectedChild: (cat: Category | null) => void;
}

export const useCategoryUIStore = create<CategoryUIState>((set) => ({
  menuOpen: false,
  selectedParent: null,
  selectedChild: null,
  setMenuOpen: (value) => set({ menuOpen: value }),
  setSelectedParent: (cat) =>
    set({ selectedParent: cat, selectedChild: null }), // reset child on parent change
  setSelectedChild: (cat) => set({ selectedChild: cat }),
}));
