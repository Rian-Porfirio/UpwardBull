import { auth } from "../../../config/FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { UsersData } from "../data/UsersData";

export async function userLogin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userInfo = await UsersData.getUserById(user.uid);

    if (userInfo.isBlocked) {
      return { error: "User blocked" };
    }

    return { user: userInfo };
  } catch (error) {
    if (error.code === "auth/user-not-found") {
      return { error: "User not found" };
    }
    if (error.code === "auth/wrong-password") {
      return { error: "Wrong password" };
    }
    return { error: "Login error. Try again." };
  }
}

export async function userRegister(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await UsersData.addUser({
      id: user.uid,
      email: user.email,
      isBlocked: false,
      isAdmin: false,
    });

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
}

export async function userLogOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error:", error);
  }
}
