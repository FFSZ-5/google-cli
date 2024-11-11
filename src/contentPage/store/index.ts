import { create } from "zustand";

interface ICountStoreState {
  count: number;
  increment: (countNum: number) => void;
  decrement: (countNum: number) => void;
}

const useStore = create<ICountStoreState>((set) => ({
  count: 0,
  increment: (countNum: number) =>
    set((state) => ({ count: state.count + countNum })),
  decrement: (countNum: number) =>
    set((state) => ({ count: state.count - countNum })),
}));

export default useStore;
