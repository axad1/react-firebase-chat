import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  loading: true,
  setLoading: (value) => set({ loading: value }),
  fetchUser: async (uid) => {
    if (!uid) return set({ currentUser: null, loading: false });
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), loading: false });
      } else {
        throw new Error("User not exists");
      }
    } catch (error) {
      console.log("error -> ", error);
      set({ currentUser: null, loading: false });
    }
  },
}));
