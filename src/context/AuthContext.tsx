import { FIREBASE_AUTH } from "firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAccout, updateAccount } from "@/api/accout";
import { Account, Investment, Transfer } from "@/types/database.type";
import { getInvestments, updateCutoffDateInvestment } from "@/api/investments";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { addTransfer } from "@/api/transfers";

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        console.log(user);

        setLoading(true);

        if (user) {
            getAccout(user?.uid, setAccount);
            getInvestments(user?.uid, setInvestments);
            setLoading(false);
        } else {
            setAccount(null);
            setInvestments([]);
            setLoading(false);
        }
    }, [user]);

    const calcInvestments = async () => {
        await Promise.all(investments.map(async (investment) => {
            const today = (new Date().setHours(0, 0, 0, 0));

            if (!investment.data().isFinished) {
                if (investment.data().finalDate.toDate() > today && investment.data().cutoffDate.toDate().getTime() !== new Date(today).getTime()) { //the investment is not finished
                    const days = (today - investment.data().cutoffDate.toDate().setHours(0, 0, 0, 0)) / (24 * 60 * 60 * 1000);
                    const interest = Number((investment.data().amount * (investment.data().rate / 100) * (days / 365)).toFixed(2));

                    const transfer: Transfer = {
                        transmitter: Number(account.clabe),
                        recipient: Number(account.number),
                        amount: Number(interest),
                        concept: `Rendimiento de inversión ${investment.data().name}`,
                        reference: 1234567,
                        type: 1
                    }

                    console.log('Si se hizo 1');

                    await updateAccount(user?.uid, interest);
                    await addTransfer(transfer);
                    await updateCutoffDateInvestment(investment.id, new Date(today), false);
                } else {
                    if (investment.data().cutoffDate.toDate().getTime() !== new Date(today).getTime()) {
                        const days = (investment.data().finalDate.toDate().setHours(0, 0, 0, 0) - investment.data().cutoffDate.toDate().setHours(0, 0, 0, 0)) / (24 * 60 * 60 * 1000);
                        const interest = Number((investment.data().amount * (investment.data().rate / 100) * (days / 365)).toFixed(2));

                        const transfer: Transfer = {
                            transmitter: Number(account.clabe),
                            recipient: Number(account.number),
                            amount: Number(interest),
                            concept: `Rendimiento de inversión ${investment.data().name}`,
                            reference: 1234567,
                            type: 1
                        }

                        console.log('Si se hizo 2');

                        await updateAccount(user?.uid, interest);
                        await addTransfer(transfer);
                        await updateCutoffDateInvestment(investment.id, new Date(today), true);
                    }
                }
            }
        }));
    }

    useEffect(() => {
        if (investments.length > 0 && !loading) {
            console.log('hola')
            calcInvestments();
        }
    }, [loading]);

    return (
        <UserContext.Provider value={{ user, account, setAccount, investments, setInvestments }}>
            {children}
        </UserContext.Provider>
    )
}