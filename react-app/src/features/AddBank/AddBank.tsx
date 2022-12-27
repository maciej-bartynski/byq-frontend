import { FC, useCallback, useEffect, useState } from "react";
import * as RSuite from 'rsuite';
import useBanks from "lib/hooks/useBanks";
import { Button, ButtonToolbar, Form } from "rsuite";
import defaultCss from "./AddBank.module.css";
import useUsers from "lib/hooks/useUsers";
import useBoards from "lib/hooks/useBoards";
import BanksApi from "lib/services/apiServices/BankApi"
import Field from "atomic/atoms/Field";
import Label from "atomic/atoms/Label";

const initialValues = {
    name: "",
    cash: 0,
    creator: "",
}

const AddBank: FC<{
    open: boolean;
    onClose: () => void;
    workspaceId: string
}> = ({
    open,
    onClose,
    workspaceId
}) => {

        const {
            loading: loadingBanks,
        } = useBanks();

        const board = useBoards().boards.find(board => board._id === workspaceId);

        const [formValue, setFormValue] = useState<typeof initialValues>(initialValues);

        const onClear = useCallback(() => {
            setFormValue(initialValues)
        }, [setFormValue])

        const onExit = useCallback(() => {
            onClose();
            onClear();
        }, [onClose, onClear])

        const onSubmitCallback = useCallback((status: boolean) => {
            if (status && !loadingBanks) {
                BanksApi.createBank(formValue);
            }
        }, [loadingBanks, formValue])

        const { users } = useUsers();
        const filteredUsers = users.filter(user => {
            return board?.contributors.some(contributor => contributor === user.user_id) || board?.owners.some(owner => owner === user.user_id)
        })
        const creatorsData = filteredUsers.map((creator) => ({
            value: creator.user_id,
            label: creator.email,
        }))

        useEffect(() => {
            if (!loadingBanks) {
                setFormValue(initialValues)
            }
        }, [loadingBanks])

        return (
            <RSuite.Modal
                size="sm"
                open={open}
                onClose={onExit}

            >
                <RSuite.Modal.Header>
                    Add new Bank
                </RSuite.Modal.Header>
                <RSuite.Modal.Body>
                    <Form
                        className={defaultCss.bankModalBody}
                        model={model}
                        onSubmit={onSubmitCallback}
                        formDefaultValue={initialValues}
                        formValue={formValue}
                        onChange={formValue => setFormValue(formValue as typeof initialValues)}
                    >
                        <Field>
                            <Label required>
                                Bank name
                            </Label>
                            <RSuite.Form.Control
                                name="name"
                                placeholder="ex. MyBank"
                            />
                        </Field>

                        <Field>
                            <Label required>
                                Cash amount
                            </Label>
                            <RSuite.Form.Control
                                name="cash"
                                type='number'
                                placeholder="ex. 100"
                            />
                        </Field>


                        <Field>
                            <Label required>
                                Creator
                            </Label>
                            <RSuite.Form.Control
                                placeholder="Creator"
                                data={creatorsData}
                                name='creator'
                                cleanable={true}
                                accepter={RSuite.SelectPicker}
                            />
                        </Field>

                        <ButtonToolbar>
                            <Button
                                disabled={loadingBanks}
                                appearance="primary"
                                type="submit"
                            >
                                {loadingBanks ? "Loading" : "Submit"}
                            </Button>
                        </ButtonToolbar>
                    </Form>
                </RSuite.Modal.Body>
            </RSuite.Modal>
        )
    }

export default AddBank

const { StringType, NumberType } = RSuite.Schema.Types;
const model = RSuite.Schema.Model({
    name: StringType().isRequired('This field is required.'),
    cash: NumberType().isRequired('This field is required.'),
    creator: StringType().isRequired('This field is required.'),
});