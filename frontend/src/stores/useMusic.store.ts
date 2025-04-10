import { api } from "@/lib/axios";
import { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  selectedAlbum: Album | null;
  isLoading: boolean;
  error: string | null;
  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (albumId: string) => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  selectedAlbum: null,
  isLoading: false,
  error: null,

  fetchAlbums: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/albums");
      set({ albums: response.data });
    } catch (error: any) {
      console.log("Error in get Albums methode");
      set({ error: error.response.data.message });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchAlbumById: async (albumId: string)  => {
    set({isLoading: true, error: null});
    try {
      const response = await api.get(`/albums/${albumId}`);
      set({selectedAlbum: response.data});
    } catch (error : any) {
      console.log("Error in getAlbumById methode");
      set({error: error.response.data.message});
    } finally {
      set({isLoading: false, error: null});
    }
  }
}));
