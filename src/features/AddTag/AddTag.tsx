import { FC, useCallback, useEffect, useState } from "react";
import * as RSuite from 'rsuite';
import { Button, ButtonToolbar, Form } from "rsuite";
import defaultCss from "./AddTag.module.css";
import Field from "atomic/atoms/Field";
import Label from "atomic/atoms/Label";
import useTags from "lib/hooks/useTags";
import TagsApi from "lib/services/apiServices/TagsApi";
import ButtonRound from "atomic/atoms/Buttons/ButtonRound";
import FieldLabel from "atomic/atoms/FieldLabel";

const initialValues = {
    name: "",
    theme: "",
}

const AddTag: FC<{
    open: boolean;
    onClose: () => void;
    workspaceId: string;
    onReload: () => void;
}> = ({
    open,
    onClose,
    workspaceId,
    onReload
}) => {

        const {
            loading: loadingTags,
            tags
        } = useTags();

        const [formValue, setFormValue] = useState<typeof initialValues>(initialValues);

        const onClear = useCallback(() => {
            setFormValue(initialValues)
        }, [setFormValue])

        const onExit = useCallback(() => {
            onClose();
            onClear();
        }, [onClose, onClear])

        const onSubmitCallback = useCallback((status: boolean) => {
            if (status && !loadingTags) {
                TagsApi.createTag(formValue);
            }
        }, [loadingTags, formValue])

        useEffect(() => {
            if (!loadingTags) {
                setFormValue(initialValues)
            }
        }, [loadingTags]);

        useEffect(() => {
            TagsApi.fetchTags()
        }, [])

        const deleteTag = useCallback((tagId: string) => {
            TagsApi.deleteTag(tagId)
        }, [])

        return (
            <RSuite.Modal
                size="sm"
                open={open}
                onClose={onExit}

            >
                <RSuite.Modal.Header>
                    <FieldLabel style={{ textAlign: 'center', display: 'block' }}>
                        Tags management
                    </FieldLabel>
                </RSuite.Modal.Header>
                <RSuite.Modal.Body>
                    <div className={defaultCss.columns}>
                        <Form
                            className={defaultCss.column}
                            model={model}
                            onSubmit={onSubmitCallback}
                            formDefaultValue={initialValues}
                            formValue={formValue}
                            onChange={formValue => setFormValue(formValue as typeof initialValues)}
                        >
                            <FieldLabel>
                                Create new tag:
                            </FieldLabel>
                            <Field>
                                <Label required>
                                    Tag name
                                </Label>
                                <RSuite.Form.Control
                                    style={{ width: '100%' }}
                                    name="name"
                                    placeholder="ex. MyTag"
                                />
                            </Field>

                            <Field>
                                <Label required>
                                    Theme
                                </Label>
                                <RSuite.Form.Control
                                    placeholder="Theme"
                                    data={themes.map(value => ({ label: value, value }))}
                                    name='theme'
                                    cleanable={true}
                                    accepter={RSuite.SelectPicker}
                                    style={{ width: '100%' }}
                                />
                            </Field>

                            <ButtonToolbar>
                                <Button
                                    disabled={loadingTags}
                                    appearance="primary"
                                    type="submit"
                                >
                                    {loadingTags ? "Loading" : "Submit"}
                                </Button>
                            </ButtonToolbar>
                        </Form>
                        <ul className={`${defaultCss.column} ${defaultCss.tagList}`}>
                            <li>
                                <FieldLabel>
                                    {loadingTags ? 'Tags are loading...' : 'Existing tags:'}
                                </FieldLabel>
                            </li>
                            {tags.map(tag => {
                                return (
                                    <li key={tag._id} style={{ borderColor: tag.theme }} className={defaultCss.tag}>
                                        <span>
                                            {tag.name}
                                        </span>
                                        <ButtonRound 
                                            variant='secondary'
                                            onClick={() => deleteTag(tag._id)}
                                        >
                                            <i className="fa fa-trash" />
                                        </ButtonRound>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </RSuite.Modal.Body>
            </RSuite.Modal>
        )
    }

export default AddTag

const { StringType } = RSuite.Schema.Types;
const model = RSuite.Schema.Model({
    name: StringType().isRequired('This field is required.'),
    theme: StringType().isRequired('This field is required.'),
});

const themes = [
    'black', 'green', 'red', 'yellow', 'blue', 'purple', 'gray', 'orange', 'brown'
] as const