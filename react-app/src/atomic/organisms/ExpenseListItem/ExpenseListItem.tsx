import Input from "atomic/atoms/Input";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { BankType } from "types/Bank";
import defaultCss from './ExpenseListItem.module.css';
import * as RSuite from 'rsuite';
import ButtonWithText from "atomic/atoms/ButtonWithText";
import { Expense } from "types/Expense";
import { PickerInstance } from "rsuite/esm/Picker";

const ExpenseListItem: FC<Expense & {
    setName: (arg: string) => void;
    setValue: (arg: number) => void;
    setBankId: (bankId: string) => void;
    confirmDeleteExpense: () => void;
    cancelExpenseDeletion: () => void;
    editCharged: (arg: boolean) => void;
    user: string;
    bank: string;
    banks: BankType[];
    toggleModalUpdateTag: () =>void;
}> = ({
    _id,
    bankId,
    name,
    value,
    bank,
    user,
    charged,
    setName,
    setValue,
    confirmDeleteExpense: onBankDelete,
    cancelExpenseDeletion: onCancelExpenseDelete,
    editCharged,
    setBankId,
    banks,
    toggleModalUpdateTag
}) => {

        const [deletionModalOpened, setDeletionModalOpened] = useState(false);

        const openDeletionModal = useCallback(() => setDeletionModalOpened(true), [setDeletionModalOpened]);
        const closeDeletionModal = useCallback(() => setDeletionModalOpened(false), [setDeletionModalOpened]);

        const confirmDeleteExpense = useCallback(() => {
            onBankDelete();
            closeDeletionModal()
        }, [onBankDelete, closeDeletionModal]);

        const cancelExpenseDeletion = useCallback(() => {
            onCancelExpenseDelete()
            closeDeletionModal();
        }, [onCancelExpenseDelete, closeDeletionModal]);

        const dropdownRef = useRef<PickerInstance | null>(null);
        const [bankEditMode, setBankEditMode] = useState(false);
        const openBankEditMode = useCallback(() => {
            const canEdit = (banks.length > 1) || !(banks?.find(bank => bank._id === bankId))
            if (canEdit) {
                setBankEditMode(true)
            }
        }, [banks, bankId]);

        const closeBankEditMode = useCallback(() => {
            setBankEditMode(false)
        }, []);

        useEffect(() => {
            if (bankEditMode && dropdownRef.current?.target) {
                const input = dropdownRef.current.target.querySelector('input');
                input?.click();
            }
        }, [bankEditMode]);

        useEffect(() => {
            const canEdit = (banks.length < 2) || !(banks?.find(bank => bank._id !== bankId))

            if (!canEdit) {
                setBankEditMode(false)
            }
        }, [banks, bankId])

        const missingBankError = !banks.find(bank => bank._id === bankId);
        const bankEditionNotAllowed = !missingBankError && banks.length < 2;

        return (
            <>
                <div
                    style={{ filter: charged ? 'grayscale()' : 'none' }}
                    className={defaultCss.root}
                >
                    <div className={defaultCss.content}>
                        <div className={defaultCss.field}>
                            <Input<string>
                                value={name}
                                onTextChange={setName}
                                variant="S"
                            />
                        </div>
                        <div className={defaultCss.field}>
                            <Input<number>
                                value={value}
                                onTextChange={setValue}
                                type="number"
                                variant="S"
                            />
                        </div>
                        <div className={defaultCss.field_bank}>
                            {bankEditMode
                                ? <RSuite.SelectPicker<string>
                                    data={banks.map(bank => ({ value: bank._id, label: bank.name }))}
                                    value={bankId}
                                    onChange={value => setBankId(value || "")}
                                    onClose={closeBankEditMode}
                                    ref={dropdownRef}
                                    placement='autoVerticalStart'
                                />
                                : <Input<string>
                                    className={missingBankError ? defaultCss.inputBankNotFound : undefined}
                                    value={banks.find(bank => bank._id === bankId)?.name || 'Bank not found!'}
                                    onFocus={openBankEditMode}
                                    onTextChange={() => { }}
                                    variant="S"
                                    readOnly
                                    editableLook={missingBankError 
                                            ? <i className='fa-solid fa-triangle-exclamation'/> 
                                            : bankEditionNotAllowed ? undefined : <i className='fa-solid fa-pen'/>}
                                />
                            }
                        </div>
                    </div>
                    <div className={defaultCss.actions}>
                        <div className={defaultCss.actions__row}>
                            <ButtonWithText
                                title={<i className="fa-solid fa-trash" />}
                                onClick={openDeletionModal}
                                className={defaultCss.actions__trash}
                                text='trash'
                            />
                        </div>
                        <div className={defaultCss.actions__row}>
                            <ButtonWithText
                                title={charged ? <i className="fa-solid fa-check" /> : <i className="fa-solid fa-clock" />}
                                onClick={e => editCharged(!charged)}
                                className={defaultCss.actions__check}
                                text={charged ? 'charged' : 'active'}
                            />
                        </div>
                        <div className={defaultCss.actions__row}>
                            <ButtonWithText
                                title={<i className="fa-solid fa-tag" />}
                                onClick={toggleModalUpdateTag}
                                className={defaultCss.actions__check}
                                text='tag'
                            />
                        </div>
                    </div>
                </div>
                <RSuite.Modal
                    size="sm"
                    open={deletionModalOpened}
                    onClose={closeDeletionModal}
                >
                    <RSuite.Modal.Header>
                        Delete Expense <strong>{name}</strong>?
                    </RSuite.Modal.Header>
                    <RSuite.Modal.Body>
                        <ButtonWithText title="Delete" onClick={confirmDeleteExpense} text={`${name} will be deleted.`} />
                        <br />
                        <br />
                        <br />
                        <ButtonWithText
                            title="Cancel"
                            onClick={cancelExpenseDeletion}
                            text={`Do not delete ${name}.`}
                        />
                    </RSuite.Modal.Body>
                </RSuite.Modal>
            </>
        )
    }

export default ExpenseListItem