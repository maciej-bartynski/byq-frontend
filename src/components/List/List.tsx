import Button from "atomic/atoms/Button";
import InputSearch from "atomic/atoms/InputSearch";
import Label from "atomic/atoms/Label";
import LayoutElement from "components/LayoutElement";
import LayoutData from "lib/layout/LayoutData";
import { LayoutElementNamesApp, LayoutElementNamesBoardDetail } from "lib/layout/layoutElementNames";
import { FC, ReactNode, useEffect, useRef } from "react";
import { Tag } from "types/Tag";
import defaultCss from './List.module.css';

function List<ItemType extends {}>({
    items,
    className,
    keyResolver,
    groupResolver,
    ItemRenderer,
    onSearch,
    onReload,
    loading,
    title,
    onAddItem,
    groupNameResolver,
    listUniqueKey
}: {
    className?: string,
    items: ItemType[],
    keyResolver: (item: ItemType) => string,
    groupResolver?: (item: ItemType) => string,
    ItemRenderer: FC<ItemType>,
    onSearch?: (term: string) => void,
    onReload?: () => void,
    loading?: boolean,
    title?: ReactNode,
    onAddItem?: () => void,
    groupNameResolver?: (id: string) => Tag,
    listUniqueKey?: string
}) {

    const titleClassName = title ? defaultCss.root_withTitle : "";
    const footerClassName = onAddItem ? defaultCss.root_withFooter : "";
    const titleAndFooterClassName = title && onAddItem
        ? defaultCss.root_withTitleAndFooter
        : `${titleClassName} ${footerClassName}`;
    const resolvedClassName = `${defaultCss.root} ${className || ""} ${titleAndFooterClassName}`;

    const itemGroupsMap = new Map<string, ItemType[]>();
    items.forEach((item) => {
        const groupName = groupResolver ? groupResolver(item) : DEFAULT_GROUP;
        const groupItems = itemGroupsMap.get(groupName);
        if (groupItems instanceof Array) {
            itemGroupsMap.set(groupName, [...groupItems, item]);
        }
        else {
            itemGroupsMap.set(groupName, [item]);
        }
    });

    const listRef = useRef<HTMLUListElement>(null)

    useEffect(() => {
        setTimeout(() => {
            if (listRef.current) {
                listRef.current.style.maxHeight = `${calculateLayoutElementsTotalHeight({ listUniqueKey })}px`
            }
        }, 1000 / 60)
    })
    return (
        <div className={resolvedClassName}>
            <LayoutElement
                layoutElementName={LayoutElementNamesBoardDetail.BoardDetailListSection}
                layoutElementKey={`title${listUniqueKey}`}
                as='div'
                className={defaultCss.title}
            >
                <Label>
                    {title}
                </Label>
            </LayoutElement>

            <LayoutElement
                layoutElementName={LayoutElementNamesBoardDetail.BoardDetailListSection}
                layoutElementKey={`actions${listUniqueKey}`}
                className={defaultCss.actions}
                as='div'
            >
                {onReload && <button
                    className={`${defaultCss.actions__refresh} ${loading ? defaultCss.actions__refreshLoading : ""}`}
                    onClick={onReload}
                    type="button"
                    disabled={loading}
                >
                    <i className="fa fa-refresh" />
                </button>}
                {onSearch && (
                    <>
                        <InputSearch
                            onSearch={onSearch}
                            disabled={loading}
                            className={defaultCss.searcher}
                        />
                    </>
                )}
            </LayoutElement>

            <div className={defaultCss.lists}>
                {Array.from(itemGroupsMap).map(([listName, listItems], idx) => {
                    return (
                        <div
                            key={listName || idx}
                            className={defaultCss.listWrapper}
                        >
                            {!!(groupNameResolver && listName)
                                ? (
                                    <LayoutElement
                                        as='div'
                                        layoutElementName={LayoutElementNamesBoardDetail.BoardDetailListSection}
                                        layoutElementKey={`tag${listUniqueKey}`}
                                        className={defaultCss.groupTitle}
                                        style={{
                                            color: groupNameResolver(listName).theme
                                        }}>
                                        {groupNameResolver(listName).name}
                                    </LayoutElement>
                                )
                                : (
                                    <LayoutElement
                                        as='div'
                                        layoutElementName={LayoutElementNamesBoardDetail.BoardDetailListSection}
                                        layoutElementKey={`tag${listUniqueKey}`}
                                        className={defaultCss.groupNoTitle}
                                    >
                                        MISC
                                    </LayoutElement>
                                )}

                            <ul
                                ref={listRef}
                                className={defaultCss.list}
                                style={{ maxHeight: calculateLayoutElementsTotalHeight({ listUniqueKey }) }}
                            >
                                {listItems.map(item => (
                                    <li key={keyResolver(item)}>
                                        <ItemRenderer
                                            {...item}
                                        />
                                    </li>
                                ))}
                            </ul>

                            {loading && <div className={defaultCss.listWrapper__loading} />}
                        </div>
                    )
                })}
            </div>

            <LayoutElement
                as='div'
                layoutElementName={LayoutElementNamesBoardDetail.BoardDetailListSection}
                layoutElementKey={`footer${listUniqueKey}`}
                className={defaultCss.footer}
            >
                {onAddItem && <Button
                    onClick={onAddItem}
                    title="Add +"
                />}
            </LayoutElement>
        </div>
    )
}

export default List;

const DEFAULT_GROUP = ""

const calculateLayoutElementsTotalHeight = ({ listUniqueKey }: { listUniqueKey?: string }): number => {
    const listLayoutElementKeys = [
        `title${listUniqueKey}`,
        `actions${listUniqueKey}`,
        `tag${listUniqueKey}`,
        `footer${listUniqueKey}`,
    ];

    const boardDeatilLayoutElementNames = [
        { elementName: LayoutElementNamesApp.AppNavbar },
        { elementName: LayoutElementNamesBoardDetail.BoardDetailToolbar },
        ...listLayoutElementKeys.map(key => ({ elementName: LayoutElementNamesBoardDetail.BoardDetailListSection, key }))
    ]

    let totalHeightOfLayoutElements = 0;

    boardDeatilLayoutElementNames.forEach(elementNameData => {
        const element = LayoutData.getInstance().getElementRef(elementNameData)?.current;

        if (element) {
            const htmlElement = element as HTMLElement;
            const offsetHeight = htmlElement?.offsetHeight || 0;
            totalHeightOfLayoutElements += offsetHeight;
        }
    });

    const spaceAvailableForListElement = window.innerHeight - totalHeightOfLayoutElements;
    return spaceAvailableForListElement - 20;
}