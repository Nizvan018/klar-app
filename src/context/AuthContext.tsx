import { FIREBASE_AUTH } from "firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAccout } from "@/api/accout";

interface Props {
    children: ReactNode;
}

type UserContextType = {
    user: User | null
    account: any
    setAccount: any
}

const UserContext = createContext<UserContextType>({ user: null, account: null, setAccount: null });

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        console.log(user);

        if (user) {
            getAccout(user?.uid, setAccount);
        } else {
            setAccount(null);
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, account, setAccount }}>
            {children}
        </UserContext.Provider>
    )
}