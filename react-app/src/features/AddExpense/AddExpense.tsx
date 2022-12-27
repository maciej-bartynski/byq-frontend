import { FC, useCallback, useEffect, useState } from "react";
import defaultCss from './AddExpense.module.css';
import * as RSuite from 'rsuite';
import useBanks from "lib/hooks/useBanks";
import { Button, ButtonToolbar, Form } from "rsuite";
import useExpenses from "lib/hooks/useExpenses";
import ExpensesApi from "lib/services/apiServices/ExpensesApi";
import Field from "atomic/atoms/Field";
import Label from "atomic/atoms/Label";
import useTags from "lib/hooks/useTags";

const initialValues = {
    name: "",
    value: 0,
    userId: "",
    bankId: "",
}

const AddExpense: FC<{
    open: boolean;
    onClose: () => void;
    userId: string;
}> = ({
    open,
    onClose,
    userId
}) => {

        const { loading: loadingExpenses } = useExpenses();
        const { banks } = useBanks();
        const [formValue, setFormValue] = useState<typeof initialValues>(initialValues);
        const { tags } = useTags();

        const onClear = useCallback(() => {
            setFormValue(initialValues)
        }, [])

        const onExit = useCallback(() => {
            onClose();
            onClear();
        }, [onClose, onClear])

        const onSubmitCallback = useCallback((status: boolean) => {
            if (status && !loadingExpenses) {
                ExpensesApi.createExpense(formValue);
            }
        }, [loadingExpenses, formValue])

        const banksData = banks.map((bank) => ({
            value: bank._id,
            label: bank.name,
        }))

        const tagsData = tags.map((tag) => ({
            value: tag._id,
            label: tag.name,
        }))

        useEffect(() => {
            if (!loadingExpenses) {
                setFormValue(initialValues)
            }
        }, [loadingExpenses])

        return (
            <RSuite.Modal
                size="sm"
                open={open}
                onClose={onExit}
            >
                <RSuite.Modal.Header>
                    Add Expense for {userId}
                </RSuite.Modal.Header>
                <RSuite.Modal.Body>
                    <Form
                        model={model}
                        onSubmit={onSubmitCallback}
                        formDefaultValue={initialValues}
                        formValue={formValue}
                        className={defaultCss.form}
                        onChange={(formValues) => setFormValue({ ...formValues, userId } as typeof initialValues)}
                    >

                        <Field>
                            <Label required>
                                Expense name
                            </Label>
                            <RSuite.Form.Control
                                name="name"
                                placeholder="ex. Gym"
                            />
                        </Field>

                        <Field>
                            <Label required>
                                Expense value
                            </Label>
                            <RSuite.Form.Control
                                name="value"
                                type="number"
                                placeholder="ex. 100"
                            />
                        </Field>


                        <Field>
                            <Label required>
                                Charged bank
                            </Label>
                            <RSuite.Form.Control
                                name="bankId"
                                accepter={RSuite.SelectPicker}
                                placeholder="Charged bank"
                                data={banksData}
                                cleanable
                            />
                        </Field>

                        
                        <Field>
                            <Label>
                                Tag - optional
                            </Label>
                            <RSuite.Form.Control
                                name="tagId"
                                accepter={RSuite.SelectPicker}
                                placeholder="Tag"
                                data={tagsData}
                                cleanable
                            />
                        </Field>

                        <ButtonToolbar>
                            <Button
                                disabled={loadingExpenses}
                                appearance="primary"
                                type="submit"
                            >
                                {loadingExpenses ? "Loading" : "Submit"}
                            </Button>
                        </ButtonToolbar>
                    </Form>
                </RSuite.Modal.Body>
            </RSuite.Modal>
        )
    }

export default AddExpense

const { StringType, NumberType } = RSuite.Schema.Types;
const model = RSuite.Schema.Model({
    name: StringType().isRequired('This field is required.'),
    value: NumberType().isRequired('This field is required.'),
    bankId: StringType().isRequired('This field is required.'),
    tagId: StringType()
});