import { updateGender } from "@/api/user.api";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type User = {
  id: number;
  email: string;
  username: string;
  gender: "male" | "female" | null;
  avatar: string | null;
  bio: string | null;
  dateOfBirth: Date | null;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isEditingGender: boolean;
  setIsEditingGender: (isEditing: boolean) => void;
  updateGender: (gender: "male" | "female") => Promise<void>;
};

const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      isEditingGender: false,
      setIsEditingGender: (isEditing) => set({ isEditingGender: isEditing }),
      updateGender: async (gender) => {
        const user = get().user;
        if (!user) return;

        try {
          // Вызов API для обновления пола
          await updateGender(user.id, gender);
          set({ user: { ...user, gender } });
        } catch (error) {
          console.error("Error updating gender:", error);
          throw error;
        }
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
