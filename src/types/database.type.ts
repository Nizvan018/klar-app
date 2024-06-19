import { Timestamp } from "firebase/firestore"

export interface Recipient {
    name: string,
    numberType: 'CLABE' | 'Tarjeta'
    number: number,
    label?: string
}

export interface Account {
    name: string,
    clabe: string,
    card_number: string,
    amount: number
}

export interface Transfer {
    transmitter: number
    recipient: number
    amount: number
    concept: string
    reference?: number
    type: 1 | 2
}

export interface Investment {
    account_id: string
    name: string
    type: 'Flex' | 'Fixed'
    action: 'retire' | 'reinvest'
    rate: number
    amount: number
    initDate: Date
    cutoffDate: Date
    finalDate: Date
    isFinished: boolean
}