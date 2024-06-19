import { auth } from "../Model/Services/Data/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function userLogin(email, password) {
  let response = new Object();

  await signInWithEmailAndPassword(auth, email, password)
    .then((credencials) => {
      console.log(credencials);
      response.credencials = credencials;
    })
    .catch((error) => {
      console.log(error);
      response.error = "Email ou Senha inválidos";
    });

  return response;
}

export async function createAccount() {
  let response = new Object();

  await createUserWithEmailAndPassword(auth, email, password)
    .then((credencials) => {
      console.log(credencials);
      response.credencials = credencials;
    })
    .catch((error) => {
      console.log(error);
      response.error = "Criação de conta negada";
    });

  return response;
}
