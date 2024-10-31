import { create } from "zustand";

export const useBunsStore = create((set) => ({
    selectedBuns: null, 
    countBun: 1, 
    bunsState: [], 
    error: null,
    
    setCount: (count) => set({ countBun: count }),
    setBuns: (buns) => set({ bunsState: buns }),
    selectBun: (bun, price) => set({ selectedBuns: { name: bun, price } }),
    resetSelection: () => set({ selectedBuns: null, countBun: 1 }), 
    setError: (error) => set({ error }), 
}));