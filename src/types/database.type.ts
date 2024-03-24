export interface Recipient {
    name: string,
    numberType: 'CLABE' | 'Tarjeta'
    number: number,
    label?: string
}