import React, { createContext, useContext, useState } from "react";
import { IUser } from "@/types/user.types";

const AuthContext = createContext<{ user?: IUser; setUser: (u: IUser | undefined) => void } | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser>();

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useGlobalUser = () => useContext(AuthContext)!;
