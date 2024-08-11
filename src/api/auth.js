import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user
    };
  } catch (error) {
    return {
      success: false,
      message: error.message
    };
  }
};

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return {
      success: true,
      user: userCredential.user
    };
  } catch (error) {
    let message = error.message;

    if (error.code === 'auth/invalid-email') {
      message = 'The email address is not valid.';
    } else if (error.code === 'auth/email-already-in-use') {
      message = 'The email address is already in use by another account.';
    } else if (error.code === 'auth/weak-password') {
      message = 'The password is too weak.';
    }

    return {
      success: false,
      message: message
    };
  }
};

