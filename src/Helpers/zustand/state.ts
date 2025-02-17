import { create } from "zustand";

interface StoreState {
  active: boolean;
  email: string;
  passphrase: string;
  check: boolean;
  setActive: (active: boolean) => void;
  setEmail: (email: string) => void;
  setPassphrase: (passphrase: string) => void;
  setCheck: (check: boolean) => void;
}

const useStore = create<StoreState>((set) => ({
  //dev
  //active: true,
  //production
  active: false,
  email: "",
  passphrase: "",
  check: false,
  setActive: (active) => set({ active }),
  setEmail: (email) => set({ email }),
  setPassphrase: (passphrase) => set({ passphrase }),
  setCheck: (check) => set({ check }),
}));

export default useStore;
