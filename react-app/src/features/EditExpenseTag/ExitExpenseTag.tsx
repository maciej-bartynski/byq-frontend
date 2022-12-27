import { FC, useCallback, useEffect } from "react";
import * as RSuite from 'rsuite';
import defaultCss from "./EditExpenseTag.module.css";
import useTags from "lib/hooks/useTags";
import TagsApi from "lib/services/apiServices/TagsApi";
import ButtonRound from "atomic/atoms/Buttons/ButtonRound";
import FieldLabel from "atomic/atoms/FieldLabel";


const EditExpenseTag: FC<{
    open: boolean;
    onClose: () => void;
    editTagId: (tagId: string) => void;
}> = ({
    open,
    onClose,
    editTagId
}) => {

        const {
            loading: loadingTags,
            tags
        } = useTags();

        const onSubmitCallback = useCallback((tagId: string) => {
            editTagId(tagId)
        }, [editTagId])

        useEffect(() => {
            TagsApi.fetchTags()
        }, [])

        return (
            <RSuite.Modal
                size="sm"
                open={open}
                onClose={onClose}

            >
                <RSuite.Modal.Header>
                    <FieldLabel style={{ textAlign: 'center', display: 'block' }}>
                        Change expense tag
                    </FieldLabel>
                </RSuite.Modal.Header>
                <RSuite.Modal.Body>
                    <div className={defaultCss.columns}>
                        <ul className={`${defaultCss.column} ${defaultCss.tagList}`}>
                            <li>
                                <FieldLabel>
                                    {loadingTags ? 'Tags are loading...' : 'Choose from existing tags:'}
                                </FieldLabel>
                            </li>
                            <li className={defaultCss.clearTag}>
                                <span>
                                    clear tag
                                </span>
                                <ButtonRound
                                    variant='secondary'
                                    onClick={() => onSubmitCallback("")}
                                >
                                    <i className="fa fa-check" />
                                </ButtonRound>
                            </li>
                            {tags.map(tag => {
                                return (
                                    <li style={{ borderColor: tag.theme }} className={defaultCss.tag}>
                                        <span>
                                            {tag.name}
                                        </span>
                                        <ButtonRound
                                            variant='secondary'
                                            onClick={() => onSubmitCallback(tag._id)}
                                        >
                                            <i className="fa fa-check" />
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

export default EditExpenseTag
