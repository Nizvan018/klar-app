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
    account: number
}