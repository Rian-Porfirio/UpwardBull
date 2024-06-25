import { db } from "../config/FirebaseConfig";
import {
  collection,
  updateDoc,
  deleteDoc,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";

export function useDb() {
  return {
    db,
    doc,
    addDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    collection,
  };
}
