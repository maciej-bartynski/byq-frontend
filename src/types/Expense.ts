type Expense = {
    _id: string,
    value: number,
    name: string,
    userId: string,
    bankId: string,
    tagId?: string,
    charged: boolean,
}

export type {
    Expense
}