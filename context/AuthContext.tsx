import React, { createContext, useContext, useState } from "react";
import { AuthanticatedUser } from "../types/auth";

const AuthContext = createContext<
    | { user: AuthanticatedUser; setUser: (u: AuthanticatedUser) => void }
    | undefined
>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [user, setUser] = useState<AuthanticatedUser>(null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useGlobalUser = () => useContext(AuthContext)!;
