import useUsers from "lib/hooks/useUsers";
import { FC, useCallback, useEffect, useState } from "react";
import OtherUser from "types/OtherUser";
import { Expense } from "types/Expense";
import ExpensesApi from "lib/services/apiServices/ExpensesApi";
import ExpenseListItem from "atomic/organisms/ExpenseListItem";
import useBanks from "lib/hooks/useBanks";
import EditExpenseTag from "features/EditExpenseTag";

const ExpenseItem: FC<Expense> = ({
    _id,
    name,
    value,
    bankId,
    userId,
    charged,
}) => {
    const { users } = useUsers();
    const { banks } = useBanks();
    const userData = users.find(user => user.user_id === userId) as OtherUser;
    const [currentName, setName] = useState<string>(name);
    const [currentCharged, setCharged] = useState<boolean>(charged);
    const [currentValue, setValue] = useState<number>(value);
    const [currentBankId, setBankId] = useState<string>(bankId);
    const bankData = banks.find(bank => bank._id === currentBankId);
    const confirmDeleteExpense = useCallback(() => {
        ExpensesApi.deleteExpense(_id)
    }, [_id])
    const cancelExpenseDeletion = useCallback(() => { }, [])

    const [updateTagOpened, setUpdateTagOpened] = useState(false);
    const toggleModalUpdateTag = useCallback(() => {
        setUpdateTagOpened(state => !state);
    }, [setUpdateTagOpened]);

    const editCharged = useCallback((charged: boolean) => {
        setCharged(charged)
        ExpensesApi.updateExpense({
            _id,
            name,
            value,
            userId,
            bankId,
            charged: charged
        })
    }, [_id, value, bankId, userId, name]);

    const editName = useCallback((name: string) => {
        setName(name)
        ExpensesApi.updateExpense({
            _id,
            name: name,
            value,
            userId,
            bankId,
            charged
        })
    }, [_id, value, bankId, userId, charged]);

    const editValue = useCallback((value: number) => {
        setValue(value)
        ExpensesApi.updateExpense({
            _id,
            name,
            value: value,
            userId,
            bankId,
            charged
        })
    }, [_id, name, bankId, userId, charged]);

    const editBankId = useCallback((bankId: string) => {
        setBankId(bankId)
        ExpensesApi.updateExpense({
            _id,
            name,
            value,
            userId,
            bankId: bankId,
            charged
        })
    }, [_id, value, name, userId, charged]);

    const editTagId = useCallback((newTagId: string) => {
        ExpensesApi.updateExpense({
            _id,
            name,
            value,
            userId,
            bankId,
            charged,
            tagId: newTagId,
        })
    }, [_id, value, name, userId, charged, bankId]);

    useEffect(() => {
        setName(name)
        setValue(value)
        setBankId(bankId)
        setCharged(charged)
    }, [value, name, bankId, charged]);

    return (
        <>
            <ExpenseListItem
                _id={_id}
                charged={currentCharged}
                name={currentName}
                value={currentValue}
                user={userData?.email}
                bank={bankData?.name || ""}
                userId={userId}
                bankId={bankId}
                setName={editName}
                setValue={editValue}
                setBankId={editBankId}
                confirmDeleteExpense={confirmDeleteExpense}
                cancelExpenseDeletion={cancelExpenseDeletion}
                editCharged={editCharged}
                banks={banks}
                toggleModalUpdateTag={toggleModalUpdateTag}
            />
            {updateTagOpened && <EditExpenseTag
                open={updateTagOpened}
                onClose={toggleModalUpdateTag}
                editTagId={editTagId}
            />}
        </>
    )
}

export default ExpenseItem;