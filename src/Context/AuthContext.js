import { auth } from "../Model/Services/Data/FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
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
