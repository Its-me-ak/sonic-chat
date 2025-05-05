import { User } from "@/types/types";
import { create } from "zustand";

type SelectedUserState = {
    selectedUser: User | null;
    setSelectedUser: (user: User | null) => void;
}

export const useSelectedUsers = create<SelectedUserState>((set => ({
    selectedUser: null,
    setSelectedUser: (user: User | null) => set({ selectedUser: user }),
})))