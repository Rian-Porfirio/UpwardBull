import { useState, useEffect } from "react";
import { auth } from "../config/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { UsersData } from "../model/services/data/UsersData";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userInfo = await UsersData.getUserById(firebaseUser.uid);
          setUser(userInfo);
        } catch (error) {
          console.error(
            "Error trying to find user information:",
            error.message
          );
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user };
}
