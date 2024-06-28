import { db } from "../config/FirebaseConfig";
import {
  collection,
  updateDoc,
  deleteDoc,
  getDocs,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";

export function useDb() {
  return {
    db,
    doc,
    addDoc,
    getDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    collection,
  };
}
