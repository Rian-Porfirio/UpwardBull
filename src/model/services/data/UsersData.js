import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../config/FirebaseConfig";
import { auth } from "../../../config/FirebaseConfig";

const usersCollection = collection(db, "users");

export const UsersData = {
  async getAllUsers() {
    const userSnapshot = await getDocs(usersCollection);
    const userList = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return userList;
  },

  async getUserById(userId) {
    try {
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        return { id: userSnapshot.id, ...userSnapshot.data() };
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error while trying to find the Id:", error.message);
      throw error;
    }
  },

  async addUser(userData) {
    try {
      const userRef = doc(db, "users", userData.id);
      await setDoc(userRef, userData);
    } catch (error) {
      console.error("Error while adding a new User:", error.message);
      throw error;
    }
  },

  async blockUser(userId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { isBlocked: true });
  },

  async unblockUser(userId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { isBlocked: false });
  },

  async makeUserAdmin(userId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { isAdmin: true });
  },

  async revokeAdminFromUser(userId) {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { isAdmin: false });
  },

  async getCurrentUser() {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          return { id: userSnapshot.id, ...userSnapshot.data() };
        } else {
          throw new Error("User not found in database");
        }
      } else {
        throw new Error("None users are authenticated");
      }
    } catch (error) {
      console.error("Error while getting current user:", error.message);
      throw error;
    }
  },
};
