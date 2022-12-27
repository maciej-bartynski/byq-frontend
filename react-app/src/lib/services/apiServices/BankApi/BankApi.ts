import { clearBanks, createBankAsync, deleteBankAsync, editBankAsync, getBanksAsync, pocketBankAsync, unpocketBankAsync } from "reduxStorage/banks/banks"
import { store } from "reduxStorage/store"
import { BankType } from "types/Bank";

const BankApi = {
    workspaceId: "",

    clearBanks: function () {
        store.dispatch(clearBanks());
        this.workspaceId = "";
    },

    fetchBanks: function () {
        store.dispatch(getBanksAsync(this.workspaceId))
    },

    createBank: function (bankFields: Omit<BankType, "_id" | 'isPocket'>) {
        store.dispatch(createBankAsync({
            bankFields: { ...bankFields, isPocket: false },
            workspaceId: this.workspaceId
        }));
    },

    deleteBank: function (bankId: BankType["_id"]) {
        store.dispatch(deleteBankAsync({ bankId, workspaceId: this.workspaceId }));
    },

    updateBank: function (bankFields: BankType) {
        store.dispatch(editBankAsync({ bankFields, workspaceId: this.workspaceId }));
    },

    markAsPocket: function (bankId: BankType["_id"]) {
        store.dispatch(pocketBankAsync({ bankId, workspaceId: this.workspaceId }));
    },

    unmarkAsPocket: function (bankId: BankType["_id"]) {
        store.dispatch(unpocketBankAsync({ bankId, workspaceId: this.workspaceId }));
    }
}

export default BankApi