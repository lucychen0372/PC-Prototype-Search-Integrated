import { create } from 'zustand'

// Define the store's state type
type CounterState = {
  count: number
}

// Define the store's actions type
type CounterActions = {
  increment: () => void
  decrement: () => void
  incrementByAmount: (amount: number) => void
  reset: () => void
}

// Combine state and actions
type CounterStore = CounterState & CounterActions

// Create the Zustand store
export const useCounterStore = create<CounterStore>((set) => ({
  // Initial state
  count: 0,

  // Actions
  increment: () => set((state) => ({ count: state.count + 1 })),

  decrement: () => set((state) => ({ count: state.count - 1 })),

  incrementByAmount: (amount: number) =>
    set((state) => ({ count: state.count + amount })),

  reset: () => set({ count: 0 }),
}))
