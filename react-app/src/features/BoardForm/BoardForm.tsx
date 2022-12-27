import { FC, useCallback, useEffect, useMemo, useState } from "react";
import OtherUser from "types/OtherUser";
import BoardType from "types/Board";
import Label from "atomic/atoms/Label";
import * as RSuite from "rsuite";
import defaultCss from './BoardForm.module.css';
import Field from "atomic/atoms/Field";
import { User } from "@auth0/auth0-react";
import dedupeArr from "lib/tools/arrayDedupe";

const { StringType } = RSuite.Schema.Types;
const model = RSuite.Schema.Model({
    name: StringType().isRequired('This field is required.'),
    email: StringType()
});

type BoardFormValue = {
    name: string;
    desc: string;
    owners: string[];
    contributors: string[];
}

const BoardForm: FC<{
    onSubmit: (values: Omit<BoardType, "_id">) => void,
    users?: OtherUser[],
    submitting?: boolean,
    initialValues?: BoardType,
    open: boolean,
    onClose: () => void,
    variant: 'edit' | 'create',
    me?: User
}> = ({ onSubmit, users, submitting, initialValues, open, onClose, variant, me }) => {

    const usersOptions = useMemo(() => {
        try {
            return users!.map(user => ({
                label: user.email || user.name || user.nickname || (() => { throw new Error("Something is wrong") })(),
                value: user.user_id || (() => { throw new Error("Something is wrong") })(),
            }))
        } catch {
            return null;
        }
    }, [users]);

    const formDefaultValue: BoardFormValue = useMemo(() => ({
        name: initialValues?.content.name || "",
        desc: initialValues?.content.desc || '',
        owners: variant === 'create' && me?.sub
            ? dedupeArr(initialValues?.owners instanceof Array
                ? [me.sub].concat(initialValues.owners)
                : [me.sub])
            : (initialValues?.owners || []),
        contributors: initialValues?.contributors || [],
    }), [initialValues, me, variant])

    const [formValue, _setFormValue] = useState<BoardFormValue | undefined>(formDefaultValue);
    
    useEffect(() => {
        _setFormValue(formDefaultValue)
    }, [formDefaultValue])

    const setFormValue = useCallback((newValue: BoardFormValue) => {
        if (variant === 'create' && me?.sub) {
            const nextValue = {
                ...newValue,
                owners: dedupeArr(newValue.owners instanceof Array
                    ? [me.sub].concat(newValue.owners)
                    : [me.sub])
            }
            _setFormValue(nextValue);
        } else _setFormValue(newValue);
    }, [variant, me])

    const onSubmitCallback = useCallback((status: boolean) => {
        const { name, desc, owners, contributors } = formValue || {};
        if (status && !submitting && name) {
            onSubmit({
                content: {
                    name,
                    desc: desc || ""
                },
                owners: owners || [],
                contributors: contributors || [],
            })
        }
    }, [onSubmit, formValue, submitting]);

    return (
        <RSuite.Modal
            open={open}
            onClose={onClose}
            size="sm"
            backdrop={true}
        >
            <RSuite.Modal.Header>
                <h2 className={defaultCss.title}>
                    {variant === 'edit' ? "Edit Board" : "Create board"}
                </h2>
            </RSuite.Modal.Header>
            <RSuite.Modal.Body>
                <RSuite.Form
                    model={model}
                    onSubmit={onSubmitCallback}
                    formDefaultValue={formDefaultValue}
                    className={defaultCss.root}
                    onChange={setFormValue as (formValue: Record<string, any>) => void}
                    formValue={formValue}
                    
                >
                    <Field>
                        <Label required>
                            Board name
                        </Label>
                        <RSuite.Form.Control
                            name="name"
                            placeholder="ex. Budget"
                            style={{ width: '100%' }}
                        />
                    </Field>
                    <Field>
                        <Label>
                            Board description
                        </Label>
                        <RSuite.Form.Control
                            name="desc"
                            placeholder="Board description"
                            style={{ width: '100%' }}
                        />
                    </Field>
                    {usersOptions && (
                        <Field>
                            <Label>
                                Add contributors
                            </Label>
                            <RSuite.Form.Control
                                accepter={RSuite.TagPicker}
                                data={usersOptions}
                                name="contributors"
                                placeholder="Pick contributors"
                                style={{ width: '100%' }}
                            />
                        </Field>
                    )}
                    {usersOptions && (
                        <Field>
                            <Label>
                                Add owners
                            </Label>
                            <RSuite.Form.Control
                                accepter={RSuite.TagPicker}
                                data={usersOptions}
                                name="owners"
                                placeholder="Pick owners"
                                className={defaultCss.input}
                                style={{ width: '100%' }}
                            />
                        </Field>
                    )}
                    <RSuite.Modal.Footer>
                        <RSuite.ButtonToolbar>
                            <RSuite.Button
                                disabled={submitting}
                                appearance="primary"
                                type="submit"
                            >
                                {submitting ? "Loading" : "Submit"}
                            </RSuite.Button>
                        </RSuite.ButtonToolbar>
                    </RSuite.Modal.Footer>
                </RSuite.Form>
            </RSuite.Modal.Body>
        </RSuite.Modal>
    )
}

export default BoardForm;