import { User } from '@/types';
import { create } from 'zustand'

interface GeneralStore {
	user: (User) | null;
	updateUser: (user: User) => void;
}

export const useGeneralStore = create<GeneralStore>((set, get) => ({
    updateUser: (user) => {
        set({ user });
    },
}))