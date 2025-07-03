import { Spinner } from "@heroui/react";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isLogin: false,
    userInfo: {},
  });

  const [loading, setLoading] = useState(true);

  // Handle user state changes
  function handleAuthStateChanged(user) {
    if (user) {
      setUser({
        isLogin: true,
        userInfo: {
          name: user?.displayName,
          photoUrl: user?.photoURL,
          email: user?.email
        }

      });

    } else {
      setUser({
        isLogin: false,
        userInfo: {},
      });
    }
    setLoading(false); // fix: there was an undefined variable "initializing"

  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return () => unsubscribe(); // cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {loading ? (
        <div className="w-full h-96 flex justify-center items-center">
          <Spinner classNames={{ label: "text-foreground mt-4" }} label="Please wait..." variant="simple" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
