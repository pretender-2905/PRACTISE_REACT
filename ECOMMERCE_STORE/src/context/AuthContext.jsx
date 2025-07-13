import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Spinner } from "@heroui/react";
import { auth, db } from "../utils/firebase";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isLogin: false,
    userInfo: {}
  });

  const [loading, setLoading] = useState(true);

  const handleAuthStateChanged = async (firebaseUser) => {
    if (firebaseUser) {
      console.log("User logged in:", firebaseUser);

      // Fetch additional user data
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      setUser({
        isLogin: true,
        userInfo: {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...userData, // country, username, etc.
        },
      });
    } else {
      console.log("User not logged in.");
      setUser({
        isLogin: false,
        userInfo: {},
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? (
      <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
