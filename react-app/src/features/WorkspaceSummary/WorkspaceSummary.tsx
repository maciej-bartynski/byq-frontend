import Button from "atomic/atoms/Button";
import FieldLabel from "atomic/atoms/FieldLabel";
import FlexCentered from "atomic/atoms/FlexCentered";
import Label from "atomic/atoms/Label";
import LabelBank from "atomic/atoms/LabelBank";
import LabelNumber from "atomic/atoms/LabelNumber";
import RangeInput from "atomic/atoms/RangeInput";
import Tile from "atomic/atoms/Tile";
import WhisperPopover from "atomic/atoms/WhisperPopover";
import useBanks from "lib/hooks/useBanks";
import useBoards from "lib/hooks/useBoards";
import useExpenses from "lib/hooks/useExpenses";
import useUsers from "lib/hooks/useUsers";
import BankApi from "lib/services/apiServices/BankApi";
import { FC, Fragment, useCallback, useEffect, useMemo, useState } from "react";
import Marker from "atomic/atoms/Marker";

const WorkspaceSummary: FC = () => {
    const { banks } = useBanks();
    const { users } = useUsers();
    const { expenses } = useExpenses();
    const { board } = useBoards();
    const { contributors, owners } = board || {};
    const usersAmount = (contributors?.length ?? 0) + (owners?.length ?? 0);

    const totalCash = banks.reduce((cashSum, bank) => bank.cash + cashSum, 0);
    const totalExpensesLeft = expenses.reduce((sum, expense) => sum + (expense.charged ? 0 : expense.value), 0);
    const totalPockets = totalCash - totalExpensesLeft;
    const singlePocket = (totalPockets / usersAmount) || 0;
    const pocketBanks = useMemo(() => banks.filter(bank => bank.isPocket), [banks]);

    const percentageInputsState = usePercentageInputs(useMemo(() => ({
        items: pocketBanks.map(pb => ({ key: pb._id, percentage: pb.pocketPercentage || 0 }))
    }), [pocketBanks]))

    const disposedCashPercentage = percentageInputsState.reduce((res, s) => {
        return res + s.percentage
    }, 0);

    const undisposedCashPercentage = 100 - disposedCashPercentage;
    const undisposedCash = totalPockets * (undisposedCashPercentage / 100);

    let somethingChanged = pocketBanks.length !== percentageInputsState.length;
    pocketBanks.forEach(pb => {
        const adjacentInputState = percentageInputsState.find(iData => iData.key === pb._id);
        if (!adjacentInputState) somethingChanged = true;
        if ((pb.pocketPercentage || 0) !== adjacentInputState?.percentage) somethingChanged = true;
    });
    const allowSubmitting = somethingChanged && !undisposedCash

    const onSubmit = useCallback(() => {
        pocketBanks.forEach(bank => {
            const adjacentInputState = percentageInputsState.find(iData => iData.key === bank._id);
            BankApi.updateBank({
                ...bank,
                pocketPercentage: adjacentInputState?.percentage || 0
            })
        })
    }, [pocketBanks, percentageInputsState])

    const theme = !!undisposedCash
        ? {
            style: {
                boxShadow: "inset 0px 0px 5px 0px var(--color-red-alert)",
                backgroundColor: 'var(--color-elements)'
            }
        }
        : {
            style: { backgroundColor: 'var(--color-elements)' } 
        }

    return (
        <Tile {...theme}>
            <FlexCentered row={false} gap={8} alignItems='stretch'>
                <FlexCentered justifyContent="space-between" gap={4}>
                    <FlexCentered>
                        {!!(undisposedCash) && (<Marker
                            bgColor="color-red-alert"
                            message='Undisposed cash left.'
                            pulseColor="color-red-alert"
                            pulse
                            size={12}
                        />)}
                        <Label>
                            Manage free cash
                        </Label>
                    </FlexCentered>
                    {allowSubmitting && <Button
                        title="submit"
                        onClick={onSubmit}
                    />}
                </FlexCentered>
                <FlexCentered justifyContent="flex-end" gap={4}>
                    <FieldLabel>
                        Income:
                    </FieldLabel>
                    <LabelNumber value={totalCash} toFixed={2} iconName='fa-circle-down' />
                </FlexCentered>

                <FlexCentered justifyContent="flex-end" gap={4}>
                    <FieldLabel>
                        Costs:
                    </FieldLabel>
                    <LabelNumber value={totalCash} toFixed={2} iconName='fa-circle-up' />
                </FlexCentered>

                <FlexCentered justifyContent="flex-end" gap={4}>
                    <FieldLabel>
                        Free cash:
                    </FieldLabel>
                    <LabelNumber value={totalPockets} toFixed={2} iconName='fa-wallet' />
                </FlexCentered>
                <FlexCentered justifyContent="flex-end" gap={4}>
                    <FieldLabel>
                        Free per user:
                    </FieldLabel>
                    <LabelNumber value={singlePocket} toFixed={2} iconName='fa-user' />
                </FlexCentered>
                <hr style={{ margin: 0, width: "100%" }} />
                {pocketBanks.map(pb => {
                    const inputState = percentageInputsState.find(pis => pis.key === pb._id);
                    const bankUserName = users.find(u => u.user_id === pb.creator)?.email || pb.creator;
                    if (!inputState) return <Fragment key={pb._id} />;
                    return (
                        <FlexCentered
                            key={pb._id}
                            row={false}
                            alignItems='stretch'
                            gap={8}
                        >
                            <WhisperPopover speaker={<>{bankUserName}</>}>
                                <LabelBank name={pb.name} />
                            </WhisperPopover>

                            <FlexCentered gap={16}>
                                <RangeInput
                                    value={inputState.percentage}
                                    onChange={inputState.onChange}
                                />
                                <WhisperPopover speaker={<>Percentage of total free money</>}>
                                    <LabelNumber value={inputState.percentage} />
                                </WhisperPopover>
                            </FlexCentered>
                            <FlexCentered justifyContent="flex-end">
                                <WhisperPopover speaker={<>free money expected in this bank</>}>
                                    <LabelNumber value={totalPockets * (inputState.percentage / 100)} toFixed={2} iconName='fa-wallet' />
                                </WhisperPopover>
                            </FlexCentered>
                        </FlexCentered>
                    )
                })}
                {undisposedCash > 0
                    ? (
                        <>
                            <hr style={{ margin: 0, width: "100%" }} />
                            <FlexCentered justifyContent="flex-end" gap={4}>
                                <FieldLabel>
                                    Undisposed:
                                </FieldLabel>
                                <LabelNumber value={undisposedCash} toFixed={2} iconName='fa-money-bill-transfer' />
                            </FlexCentered>
                        </>
                    )
                    : null}

                {allowSubmitting && <FlexCentered
                    row={false}
                    gap={4}
                >
                    <hr style={{ margin: 0, width: "100%" }} />
                    <Button
                        title="submit"
                        onClick={onSubmit}
                    />
                </FlexCentered>}
            </FlexCentered>
        </Tile>
    )
}

export default WorkspaceSummary

const usePercentageInputs = ({
    items
}: {
    items: PercentageInputParams[]
}) => {
    const initialValues = useMemo(() => items.map(item => ({ ...item, percentage: item.percentage || 0 })), [items]);
    const [values, setValues] = useState(items.map(item => ({ ...item, percentage: item.percentage || 0 })));

    useEffect(() => {
        setValues(initialValues)
    }, [initialValues])

    const sumDisposed = values.reduce((res, item) => res + item.percentage, 0);
    const canIncreaseBy = 100 - sumDisposed;

    const output: PercentageInputState[] = useMemo(() => values.map((data) => {
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const prevValue = data.percentage;
            const nextValue = +e.target.value;
            const difference = nextValue - prevValue;
            const isValid = difference <= canIncreaseBy;
            const validNextValue = isValid ? nextValue : prevValue + canIncreaseBy;
            setValues(state => {
                const nextState = state.map(dataItem => {
                    const currentItem = dataItem.key === data.key;
                    return currentItem ? { ...dataItem, percentage: validNextValue } : dataItem
                })
                return nextState;
            })
        }

        return {
            onChange,
            key: data.key,
            percentage: data.percentage
        }
    }), [
        canIncreaseBy,
        values
    ])

    return output
}

type PercentageInputState = {
    key: string,
    percentage: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

type PercentageInputParams = {
    key: string,
    percentage: number,
}