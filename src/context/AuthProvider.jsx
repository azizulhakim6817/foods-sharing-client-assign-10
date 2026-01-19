import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //! register/sign-Up----------------
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //! login/sign-in---------------------------
  const loignUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //! google Provider-------------------
  const googleSignUp = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //! sign-Out(auth)--------
  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    register,
    loignUser,
    googleSignUp,
    user,
    loading,
    setLoading,
    signOutUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
