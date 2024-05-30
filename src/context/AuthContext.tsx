import { FIREBASE_AUTH } from "firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAccout } from "@/api/accout";
import { Account, Investment } from "@/types/database.type";
import { getInvestments } from "@/api/investments";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

interface Props {
    children: ReactNode;
}

type UserContextType = {
    user: User | null
    account: Account | null
    setAccount: any
    investments: QueryDocumentSnapshot<DocumentData, DocumentData>[] | null
    setInvestments: any
}

const UserContext = createContext<UserContextType>({ user: null, account: null, setAccount: null, investments: null, setInvestments: null });

export const useUser = () => {
    return useContext(UserContext);
}

export const UserProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    const [account, setAccount] = useState(null);
    const [investments, setInvestments] = useState([]);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        console.log(user);

        if (user) {
            getAccout(user?.uid, setAccount);
            getInvestments(user?.uid, setInvestments);
        } else {
            setAccount(null);
            setInvestments([]);
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, account, setAccount, investments, setInvestments }}>
            {children}
        </UserContext.Provider>
    )
}