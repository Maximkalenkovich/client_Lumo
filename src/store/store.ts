import { create } from "zustand";
import type { MyProfile } from "@/types";

type UserStore = {
  token: string | null;
  user: MyProfile | null;
  setSession: (token: string, user: MyProfile) => void;
  setToken: (token: string) => void;
  setUser: (user: MyProfile) => void;
};

/** The session lives in memory only: Telegram re-authenticates the user on every launch. */
const useUserStore = create<UserStore>()((set) => ({
  token: null,
  user: null,
  setSession: (token, user) => set({ token, user }),
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
}));

export default useUserStore;
