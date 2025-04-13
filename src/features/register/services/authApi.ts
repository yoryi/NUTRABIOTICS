import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../common/config/firebaseConfig";

interface RegisterCredentials {
  email: string;
  password: string;
}

export const registerUser = async ({ email, password }: RegisterCredentials) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    throw error;
  }
};
