import useUsers from "lib/hooks/useUsers";
import { FC, useCallback, useEffect, useState } from "react";
import { BankType } from "types/Bank";
import OtherUser from "types/OtherUser";
import BankListItem from 'atomic/organisms/BankListItem';
import BankApi from "lib/services/apiServices/BankApi";

const BankItem: FC<BankType & {
    totalExpenses: number,
    savedCashPerPocket: number,
}> = ({
    _id,
    name,
    cash,
    creator,
    isPocket,
    savedCashPerPocket,
    totalExpenses
}) => {
    const { users } = useUsers();
    const bankCreatorData = users.find(user => user.user_id === creator) as OtherUser;
    const [currentName, setName] = useState<string>(name);
    const [currentIsPocket, setIsPocket] = useState<boolean>(isPocket);
    const [currentCash, setCash] = useState<number>(cash);
    const confirmDeleteBank = useCallback(() => {
        BankApi.deleteBank(_id)
    }, [_id])
    const cancelBankDeletion = useCallback(() => { }, [])

    const editName = useCallback((name: string) => {
        setName(name)
        BankApi.updateBank({
            _id,
            name: name,
            cash: currentCash,
            isPocket: currentIsPocket,
            creator,
        })
    }, [_id, creator, currentCash, currentIsPocket]);

    const editCash = useCallback((cash: number) => {
        setCash(cash)
        BankApi.updateBank({
            _id,
            name: currentName,
            cash: cash,
            isPocket: currentIsPocket,
            creator
        })
    }, [_id, creator, currentName, currentIsPocket])

    const editIsPocket = useCallback((isPocket: boolean) => {
        setIsPocket(isPocket)
        isPocket 
            ? BankApi.markAsPocket(_id)
            : BankApi.unmarkAsPocket(_id)
    }, [_id])

    useEffect(() => {
        setName(name)
        setCash(cash)
    }, [cash, name]);

    return <BankListItem
        _id={_id}
        name={currentName}
        cash={currentCash}
        isPocket={isPocket}
        savedCashPerPocket={savedCashPerPocket}
        creator={bankCreatorData?.email}
        setName={editName}
        setCash={editCash}
        setIsPocket={editIsPocket}
        confirmDeleteBank={confirmDeleteBank}
        cancelBankDeletion={cancelBankDeletion}
        totalExpenses={totalExpenses}
    />
}

export default BankItem;