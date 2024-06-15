import { Recipient } from "./database.type";

interface investmentData {
    amount: number,
    investmentType: 'Flex' | 'Fixed',
    days: number,
    rate: number
}


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
    Earnings: { id: number } | undefined;
    Investments: { id: number } | undefined;
    NewInvestment: { id: number } | undefined;
    SelectAction: { id?: number, investmentData: investmentData } | undefined;
    ConfigureInvestment: { id?: number, investmentData: investmentData, action: string } | undefined;
    InvestmentDetails: { id?: number, investment: any, investmentId: string } | undefined;
    AdjustInvestment: { id?: number, name: string, action: 'retire' | 'reinvest' } | undefined;
}