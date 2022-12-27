import { createBankAsync, deleteBankAsync, editBankAsync, getBanksAsync } from "reduxStorage/banks/banks";
import { useAppDispatch, useAppSelector } from "reduxStorage/hooks";
import { useCallback } from "react";
import { BankType } from "types/Bank";
import { selectBanks } from "reduxStorage/banks/banks";

function useBanks() {
    const dispatch = useAppDispatch();
    const { banks, status } = useAppSelector(selectBanks)
    const loading = status === 'loading';

    const fetchBanks = useCallback((workspaceId: string) => {
        dispatch(getBanksAsync(workspaceId))
    }, [dispatch]);

    const createBank = useCallback((values: {
        workspaceId: string;
        bankFields: Omit<BankType, "_id">;
    }) => {
        dispatch(createBankAsync(values));
    }, [dispatch]);

    const editBank = useCallback((values: {
        workspaceId: string;
        bankFields: BankType;
    }) => {
        dispatch(editBankAsync(values));
    }, [dispatch]);

    const removeBank = useCallback((args: {
        workspaceId: string;
        bankId: BankType["_id"];
    }) => {
        dispatch(deleteBankAsync(args));
    }, [dispatch]);

    return {
        banks,
        fetchBanks,
        createBank,
        removeBank,
        editBank,
        loading
    }
}

export default useBanks;