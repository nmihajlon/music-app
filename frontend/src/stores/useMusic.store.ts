import { api } from "@/lib/axios";
import { create } from "zustand";

interface MusicStore {
  songs: any[];
  albums: any[];
  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/albums");
      set({ albums: response.data });
    } catch (error: any) {
      console.log("Error in get Albums metgode");
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
