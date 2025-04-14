import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../common/config/firebaseConfig";

export interface Favorite {
  userId: string;
  itemId: string; 
  itemData?: any;
}

export const addFavorite = async (favorite: Favorite) => {
  try {
    const docRef = await addDoc(collection(db, "favoritos"), favorite);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getFavoritesByUser = async (userId: string) => {
  try {
    const favoritosRef = collection(db, "favoritos");
    const q = query(favoritosRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const favoritos: Favorite[] = [];
    querySnapshot.forEach((doc) => {
      favoritos.push({ ...doc.data(), id: doc.id } as unknown as Favorite);
    });

    return favoritos;
  } catch (error) {
    throw error;
  }
};

export const removeFavorite = async (userId: string, itemId: string) => {
  try {
    const favoritosRef = collection(db, "favoritos");
    const q = query(
      favoritosRef,
      where("userId", "==", userId),
      where("itemId", "==", itemId)
    );
    const querySnapshot = await getDocs(q);
    
    const deletePromises = querySnapshot.docs.map((docSnapshot) =>
      deleteDoc(doc(db, "favoritos", docSnapshot.id))
    );

    await Promise.all(deletePromises);
  } catch (error) {
    throw error;
  }
};
