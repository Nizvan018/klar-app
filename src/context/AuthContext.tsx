import { FIREBASE_AUTH } from "firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Props {
    children: ReactNode;
}

const UserContext = createContext<User | null>(null);

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    )
}