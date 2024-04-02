export type RootBottomParamList = {
    General: { id: number } | undefined;
    IsNotYou: { id: number } | undefined;
    Login: { id: number } | undefined;
    Contact: { id: number } | undefined;
    AddContact: { id: number } | undefined;
    Transfer: { id?: number, contacto: string } | undefined;
}