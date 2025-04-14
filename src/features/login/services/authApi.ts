import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../common/config/firebaseConfig";
import { LoginCredentials } from "../types";

export const loginUser = async ({ email, password }: LoginCredentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    throw error;
  }
};
