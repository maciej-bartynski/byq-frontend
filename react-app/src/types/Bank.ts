type BankType = {
    _id: string,
    name: string,
    cash: number,
    creator: string,
    isPocket: boolean,
    pocketPercentage?: number,
}

export type {
    BankType
}