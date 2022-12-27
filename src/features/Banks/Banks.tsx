import { FC, useCallback, useMemo, useState } from "react";
import List from "components/List";
import { BankType } from "types/Bank";
import BankItem from "features/BankItem";
import AddBank from "features/AddBank";
import useBanks from "lib/hooks/useBanks";
import stringCompareSimilar from "lib/tools/stringSoftCompare";
import BankApi from "lib/services/apiServices/BankApi";
import useExpenses from "lib/hooks/useExpenses";

const Banks: FC<{
    workspaceId: string
}> = ({
    workspaceId
}) => {

        const {
            loading: loadingBanks,
            banks
        } = useBanks();

        const {
            loading: loadingExpenses,
            expenses,
        } = useExpenses();

        const [addBankModalOpened, setAddBankModalOpened] = useState(false);
        const [searchTerm, setSearchTerm] = useState<string>("");

        const totalCash = banks.reduce((cashSum, bank) => bank.cash + cashSum, 0);
        const totalExpensesLeft = expenses.reduce((sum, expense) => sum + (expense.charged ? 0 : expense.value), 0);
        const totalPockets = totalCash - totalExpensesLeft;

        const filteredBanks = useMemo(() => {
            return banks
                .map(bank => {

                    const expensesSum = expenses.reduce((sum, expense) => {
                        const cost = expense.bankId === bank._id
                            ? (!expense.charged && expense.value) || 0
                            : 0
                        return sum + cost
                    }, 0);

                    return {
                        ...bank,
                        workspaceId,
                        totalExpenses: expensesSum,
                        savedCashPerPocket: totalPockets*((bank.pocketPercentage || 0)/100)
                    }
                })
                .filter(bank => {
                    if (!searchTerm) return true;
                    return stringCompareSimilar(searchTerm, bank.name)
                })
        }, [searchTerm, banks, workspaceId, expenses, totalPockets]);

        const closeAddBankModal = useCallback(() => {
            setAddBankModalOpened(false)
        }, [setAddBankModalOpened]);

        const openAddBankModal = useCallback(() => {
            setAddBankModalOpened(true)
        }, [setAddBankModalOpened]);

        const onReload = useCallback(() => {
            BankApi.fetchBanks();
        }, [])

        return (
            <>
                <List<BankType & {
                    workspaceId: string,
                    totalExpenses: number,
                    savedCashPerPocket: number
                }>
                    items={filteredBanks}
                    keyResolver={(item) => item._id}
                    ItemRenderer={BankItem}
                    onSearch={setSearchTerm}
                    onReload={onReload}
                    loading={loadingBanks || loadingExpenses}
                    title='Banks'
                    onAddItem={openAddBankModal}
                />
                <AddBank
                    open={addBankModalOpened}
                    onClose={closeAddBankModal}
                    workspaceId={workspaceId}
                />
            </>
        )
    }

export default Banks