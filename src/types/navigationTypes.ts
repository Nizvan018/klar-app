import { Recipient } from "./database.type";

export type RootBottomParamList = {
    General: { id: number } | undefined;
    IsNotYou: { id: number } | undefined;
    Login: { id: number } | undefined;
    Contact: { id: number } | undefined;
    AddContact: { id: number } | undefined;
    Transfer: { id?: number, contacto: Recipient } | undefined;
    Message: { id?: number, contacto: Recipient, amount: number } | undefined;
    Deposit: { id: number } | undefined;
    Details: { id: number } | undefined;
}