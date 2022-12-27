import Button from "atomic/atoms/Button";
import FieldLabel from "atomic/atoms/FieldLabel";
import Input from "atomic/atoms/Input";
import { FC, useCallback, useState } from "react";
import { BankType } from "types/Bank";
import defaultCss from './BankListItem.module.css';
import * as RSuite from 'rsuite';
import ButtonWithText from "atomic/atoms/ButtonWithText";
import FlexCentered from "atomic/atoms/FlexCentered";
import LabelNumber from "atomic/atoms/LabelNumber";
import Marker from "atomic/atoms/Marker";

const BankListItem: FC<BankType & {
    setName: (arg: string) => void;
    setCash: (arg: number) => void;
    setIsPocket: (isPocket: boolean) => void,
    confirmDeleteBank: () => void;
    cancelBankDeletion: () => void;
    totalExpenses: number;
    savedCashPerPocket: number;
}> = ({
    _id,
    name,
    cash,
    creator,
    isPocket,
    setName,
    setCash,
    setIsPocket,
    confirmDeleteBank: onBankDelete,
    cancelBankDeletion: onCancelBankDelete,
    totalExpenses,
    savedCashPerPocket
}) => {
        const [deletionModalOpened, setDeletionModalOpened] = useState(false);
        const openDeletionModal = useCallback(() => setDeletionModalOpened(true), [setDeletionModalOpened]);
        const closeDeletionModal = useCallback(() => setDeletionModalOpened(false), [setDeletionModalOpened]);

        const confirmDeleteBank = useCallback(() => {
            onBankDelete();
            closeDeletionModal()
        }, [onBankDelete, closeDeletionModal]);

        const cancelBankDeletion = useCallback(() => {
            onCancelBankDelete()
            closeDeletionModal();
        }, [onCancelBankDelete, closeDeletionModal]);

        const cashBalance = cash - totalExpenses - (isPocket ? savedCashPerPocket : 0);

        const theme = isPocket
            ? {
                style: {
                    boxShadow: "inset 0px 0px 5px 0px var(--color-green-alert)"
                }
            }
            : {}

        return (
            <>
                <div className={defaultCss.root} {...theme}>
                    <FlexCentered
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        gap={4}
                    >
                        <FlexCentered
                            className={defaultCss.content}
                            row={false}
                            gap={4}
                            alignItems='flex-start'
                        >
                            {isPocket && <Marker
                                bgColor="color-green-alert"
                                message='This Bank is marked as "pocket". Free money can be stored here.'
                                pulseColor="color-green-alert"
                                pulse
                                size={12}
                            />}

                            <Input<string>
                                value={name}
                                onTextChange={setName}
                                variant="S"
                            />

                            <Input<number>
                                value={cash}
                                onTextChange={setCash}
                                type="number"
                                variant="S"
                            />

                            <FieldLabel>
                                {creator}
                            </FieldLabel>

                        </FlexCentered>
                        <FlexCentered alignItems="flex-end" row={false} gap={4}>
                            <FlexCentered
                                justifyContent="flex-end"
                                gap={4}
                            >
                                <FieldLabel>
                                    Trash
                                </FieldLabel>
                                <Button
                                    title={<i className="fa-solid fa-trash" />}
                                    onClick={openDeletionModal}
                                    className={defaultCss.actions__trash}
                                />
                            </FlexCentered>
                            <FlexCentered
                                justifyContent="flex-end"
                                gap={4}
                            >
                                <FieldLabel>
                                    {isPocket ? "Unpocket" : "Pocket"}
                                </FieldLabel>
                                <Button
                                    title={<i className="fa-solid fa-wallet" />}
                                    onClick={() => setIsPocket(!isPocket)}
                                    className={isPocket ? defaultCss.actions__wallet_clicked : defaultCss.actions__wallet}
                                />
                            </FlexCentered>
                        </FlexCentered>
                    </FlexCentered>
                    <FlexCentered alignItems="flex-end" row={false} gap={4}>
                        {totalExpenses !== 0 && (
                            <FlexCentered
                                justifyContent="flex-end"
                                gap={4}
                            >
                                <FieldLabel>
                                    Costs
                                </FieldLabel>
                                <LabelNumber
                                    value={totalExpenses}
                                    toFixed={2}
                                    iconName='fa-circle-up'
                                />
                            </FlexCentered>
                        )}
                        {isPocket && (
                            <FlexCentered
                                justifyContent="flex-end"
                                gap={4}
                            >
                                <FieldLabel>
                                    Free money
                                </FieldLabel>
                                <LabelNumber
                                    value={savedCashPerPocket}
                                    toFixed={2}
                                    iconName='fa-wallet'
                                />
                            </FlexCentered>
                        )}
                        {cashBalance !== 0 && (
                            <FlexCentered
                                justifyContent="flex-end"
                                gap={4}
                            >
                                <FieldLabel
                                    className={cashBalance > 0
                                        ? defaultCss.yellowAlertColor
                                        : defaultCss.redAlertColor
                                    }
                                >
                                    {cashBalance > 0 ? "Undisposed" : "Missing"}
                                </FieldLabel>
                                <LabelNumber
                                    value={cashBalance}
                                    toFixed={2}
                                    iconName='fa-money-bill-transfer'
                                    className={cashBalance > 0
                                        ? defaultCss.yellowAlertColor
                                        : defaultCss.redAlertColor
                                    }
                                />
                            </FlexCentered>
                        )}
                    </FlexCentered>
                </div>
                <RSuite.Modal
                    size="sm"
                    open={deletionModalOpened}
                    onClose={closeDeletionModal}
                >
                    <RSuite.Modal.Header>
                        Delete Bank <strong>{name}</strong>?
                    </RSuite.Modal.Header>
                    <RSuite.Modal.Body>
                        <ButtonWithText title="Delete" onClick={confirmDeleteBank} text={`${name} will be deleted.`} />
                        <br />
                        <br />
                        <br />
                        <ButtonWithText
                            title="Cancel"
                            onClick={cancelBankDeletion}
                            text={`Do not delete ${name}.`}
                        />
                    </RSuite.Modal.Body>
                </RSuite.Modal>
            </>
        )
    }

export default BankListItem