import { auth } from "../../../config/FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export async function userLogin(email, password) {
  let response = new Object();

  await signInWithEmailAndPassword(auth, email, password)
    .then((credencials) => {
      console.log(credencials);
      response.credencials = credencials;
    })
    .catch((error) => {
      console.log(error);
      response.error = "Invalid Email or Password";
    });

  return response;
}

export async function userRegister(email, password) {
  let response = new Object();

  await createUserWithEmailAndPassword(auth, email, password)
    .then((credencials) => {
      console.log(credencials);
      response.credencials = credencials;
    })
    .catch((error) => {
      console.log(error);
      response.error = "Something went wrong";
    });

  return response;
}

export async function userLogOut() {
  await signOut(auth).then();
}
