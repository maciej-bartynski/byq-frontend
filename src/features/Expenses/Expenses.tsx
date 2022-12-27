import { FC, useCallback, useMemo, useState } from "react";
import List from "components/List";
import stringCompareSimilar from "lib/tools/stringSoftCompare";
import useExpenses from "lib/hooks/useExpenses";
import { Expense } from "types/Expense";
import useUsers from "lib/hooks/useUsers";
import AddExpense from "features/AddExpense";
import ExpenseItem from "features/ExpenseItem";
import ExpensesApi from "lib/services/apiServices/ExpensesApi";
import useTags from "lib/hooks/useTags";
// import defaultCss from './Expenses.module.css';
import { Tag } from "types/Tag";

const Expenses: FC<{
    workspaceId: string;
    userId: string;
}> = ({
    workspaceId,
    userId,
}) => {

        const {
            users,
        } = useUsers();

        const user = users.find(u => u.user_id === userId);

        const {
            loading,
            expenses,
        } = useExpenses();

        const { tags } = useTags();

        const [addExpenseModalOpened, setAddExpenseModalOpened] = useState(false);
        const [searchTerm, setSearchTerm] = useState<string>("");

        const filteredExpenses = useMemo(() => {

            const filteredByUserId = expenses
                .filter(expense => expense.userId === userId)
                .sort((a, b) => (a.charged ? 1 : 0) - (b.charged ? 1 : 0));

            const filteredBySearchTerm = searchTerm
                ? filteredByUserId
                    .map(e => ({ ...e, workspaceId }))
                    .filter(e => stringCompareSimilar(searchTerm, e.name))
                : filteredByUserId.map(expense => ({ ...expense, workspaceId }));

            return filteredBySearchTerm

        }, [
            searchTerm,
            expenses,
            workspaceId,
            userId
        ])

        const groupExpensesByTagResolver = useCallback((item: Expense) => {
            return item.tagId || ""
        }, [])

        const nameByTagId = useCallback((groupId: string) => {
            return tags.find(tag => tag._id === groupId) || {} as Tag
        }, [tags])

        const closeAddExpenseModal = useCallback(() => {
            setAddExpenseModalOpened(false)
        }, [setAddExpenseModalOpened]);

        const openAddExpenseModal = useCallback(() => {
            setAddExpenseModalOpened(true)
        }, [setAddExpenseModalOpened]);

        const onReload = useCallback(() => {
            ExpensesApi.fetchExpenses();
        }, [])

        return (
            <>
                {!filteredExpenses.length
                    ? (
                        <List<Expense & { workspaceId: string }>
                            items={[]}
                            keyResolver={(item) => item._id}
                            ItemRenderer={ExpenseItem}
                            onSearch={setSearchTerm}
                            onReload={onReload}
                            loading={loading}
                            title={user?.email}
                            onAddItem={openAddExpenseModal}
                            listUniqueKey={userId}
                        />
                    )
                    : (
                        <List<Expense & { workspaceId: string }>
                            items={filteredExpenses}
                            keyResolver={(item) => item._id}
                            ItemRenderer={ExpenseItem}
                            onSearch={setSearchTerm}
                            onReload={onReload}
                            loading={loading}
                            title={user?.email}
                            onAddItem={openAddExpenseModal}
                            groupResolver={groupExpensesByTagResolver}
                            groupNameResolver={nameByTagId}
                            listUniqueKey={userId}
                        />
                    )}
                <AddExpense
                    open={addExpenseModalOpened}
                    onClose={closeAddExpenseModal}
                    userId={userId}
                />
            </>
        )
    }

export default Expenses;