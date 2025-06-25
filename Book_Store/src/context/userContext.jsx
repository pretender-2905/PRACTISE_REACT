import { createContext, useState } from "react";

export const userContext = createContext();

function UserContextProvider({ children }) {
    const [user, setUser] = useState({
        name: "Muhammad Ibrahim",
    });

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}

export default UserContextProvider;
