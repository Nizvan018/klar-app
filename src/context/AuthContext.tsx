import { FIREBASE_AUTH } from "firebase-config";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getAccout, updateAccount } from "@/api/accout";
import { Account, Investment, Transfer } from "@/types/database.type";
import { getInvestments, updateCutoffDateInvestment, updateInvestmentReinvested } from "@/api/investments";
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
    const [wasCalculated, setWasCalculated] = useState(false);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
        });
    }, []);

    useEffect(() => {
        console.log(user);

        setWasCalculated(false);

        if (user) {
            getAccout(user?.uid, setAccount);
            getInvestments(user?.uid, setInvestments);
        } else {
            setAccount(null);
            setInvestments([]);
        }
    }, [user]);

    const calcInvestments = async () => {
        let countReinvestments = 0;

        await Promise.all(investments.map(async (investment) => {
            const today = (new Date().setHours(0, 0, 0, 0));

            if (!investment.data().isFinished) {
                if (investment.data().finalDate.toDate() > today && investment.data().cutoffDate.toDate().getTime() !== new Date(today).getTime()) { //the investment is not finished
                    const days = (today - investment.data().cutoffDate.toDate().setHours(0, 0, 0, 0)) / (24 * 60 * 60 * 1000);
                    const interest = Number((investment.data().amount * (investment.data().rate / 100) * (days / 365)).toFixed(2));

                    const transfer: Transfer = {
                        transmitter: investment.id,
                        recipient: Number(account.clabe),
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
                            transmitter: investment.id,
                            recipient: Number(account.clabe),
                            amount: Number(interest),
                            concept: `Rendimiento de inversión ${investment.data().name}`,
                            reference: 1234567,
                            type: 1
                        }

                        console.log('Si se hizo 2');

                        if (investment.data().action === 'retire') {
                            const finalTransfer: Transfer = {
                                transmitter: investment.id,
                                recipient: Number(account.clabe),
                                amount: Number(investment.data().amount),
                                concept: `Reintegro de inversión ${investment.data().name}`,
                                reference: 1234567,
                                type: 1
                            }

                            await updateAccount(user?.uid, interest);
                            await addTransfer(transfer);
                            await updateAccount(user?.uid, investment.data().amount);
                            await addTransfer(finalTransfer);
                            await updateCutoffDateInvestment(investment.id, investment.data().finalDate.toDate().setHours(0, 0, 0, 0), true);
                        } else {
                            await updateAccount(user?.uid, interest);
                            await addTransfer(transfer);

                            const diference = (investment.data().finalDate.toDate().setHours(0, 0, 0, 0) - investment.data().initDate.toDate().setHours(0, 0, 0, 0)) / (24 * 60 * 60 * 1000);
                            const newFinalDate = new Date(investment.data().finalDate.toDate());

                            newFinalDate.setDate(newFinalDate.getDate() + diference);
                            newFinalDate.setHours(0, 0, 0, 0);

                            console.log(investment.data().finalDate.toDate().setHours(0, 0, 0, 0));

                            await updateInvestmentReinvested(investment.id, investment.data().finalDate.toDate().setHours(0, 0, 0, 0), newFinalDate);

                            countReinvestments += 1;
                        }
                    }
                }
            }
        }));

        if (countReinvestments > 0) {
            calcInvestments();
        }
    }

    useEffect(() => {
        if (investments.length > 0 && !wasCalculated && user != null) {
            console.log('hola')
            setWasCalculated(true)
            calcInvestments();
        }
    }, [investments]);

    return (
        <UserContext.Provider value={{ user, account, setAccount, investments, setInvestments }}>
            {children}
        </UserContext.Provider>
    )
}