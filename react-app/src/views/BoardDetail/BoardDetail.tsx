// import Tile from "atomic/atoms/Tile";
import BoardSummary from "features/BoardSummary";
import useBoards from "lib/hooks/useBoards";
import useUsers from "lib/hooks/useUsers";
import useOtherUsersAndMe from "lib/tools/useOtherUsersAndMe";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import defaultCss from './BoardDetail.module.css';
import { useAppDispatch } from "reduxStorage/hooks";
import { addRecentlyVisited } from "reduxStorage/recentlyVisited/recentlyVisited";
// import UsersList from "atomic/atoms/UsersList";
import OtherUser from "types/OtherUser";
import Banks from "features/Banks";
import WorkspaceSummary from "features/WorkspaceSummary";
import Expenses from "features/Expenses";
import Layout from "atomic/atoms/Layout";
import ButtonRound from "atomic/atoms/Buttons/ButtonRound";
import SelectableButtons from "components/SelectableButtons";
import InputSearch from "atomic/atoms/InputSearch";
import stringCompareSimilar from "lib/tools/stringSoftCompare";
import BankApi from "lib/services/apiServices/BankApi";
import ExpensesApi from "lib/services/apiServices/ExpensesApi";
import AddTag from "features/AddTag";
import Button from "atomic/atoms/Button";
import { LayoutElementNamesBoardDetail } from "lib/layout/layoutElementNames";

const BoardDetail: FC = () => {
    const { workspaceId } = useParams<'workspaceId'>();
    const { users } = useUsers();
    const { me } = useOtherUsersAndMe();
    const { board, fetchBoard, loading } = useBoards();
    const dispatch = useAppDispatch();
    const [searchTerms, setSearchTerms] = useState<string[]>([]);

    const [addTagModalOpened, setAddTagModalOpened] = useState(false);
    const closeAddTagModal = useCallback(() => {
        setAddTagModalOpened(false)
    }, [setAddTagModalOpened]);

    const openAddTagModal = useCallback(() => {
        setAddTagModalOpened(true)
    }, [setAddTagModalOpened]);

    const setSingleSearchTerm = useCallback((term: string) => {
        setSearchTerms([term])
    }, [])

    const onReloadView = useCallback(() => {
        if (workspaceId) {
            fetchBoard(workspaceId);
            BankApi.fetchBanks();
            ExpensesApi.fetchExpenses();
        }
    }, [workspaceId, fetchBoard])

    useEffect(() => {
        if (workspaceId) {
            fetchBoard(workspaceId);
            dispatch(addRecentlyVisited(workspaceId))
        }
    }, [fetchBoard, workspaceId, dispatch]);

    const allMembers = useMemo(() => {
        if (!board || !users) return [];
        const userIds = [...board.owners, ...board.contributors];
        const members = userIds.map(userId => {
            const userData = users.find(u => u.user_id === userId);
            const isOwner = board.owners.some(ownerId => ownerId === userId);

            const isFilteredOut = searchTerms.length
                ? searchTerms.some(term => {
                    const isFilteredOut = (!!userData?.email && stringCompareSimilar(term, userData?.email))
                        || (!!userData?.name && stringCompareSimilar(term, userData?.name))
                        || (!!userData?.nickname && stringCompareSimilar(term, userData?.nickname));
                    return isFilteredOut
                })
                : true

            return isFilteredOut
                ? {
                    ...userData,
                    bgColor: isOwner ? 'color-controlers' : 'color-secondary',
                    message: isOwner ? 'owner' : 'contributor'
                } : null;
        }).filter(item => !!item);

        return members as OtherUser[]
    }, [users, board, searchTerms])

    const buttonFiltersOptions: { label: string, value: string }[] = useMemo(() => {
        if (!board || !users) return [];
        const userIds = [...board.owners, ...board.contributors];
        return userIds.map(userId => {
            const userData = users.find(u => u.user_id === userId);
            return userData
                ? {
                    label: userData?.email.slice(0, 2),
                    value: userData?.email
                }
                : null
        }).filter(item => !!item) as { label: string, value: string }[]
    }, [users, board])

    return (
        <Layout.Route>
            <Layout.Header 
                className={defaultCss.header}
                layoutElementName={LayoutElementNamesBoardDetail.BoardDetailToolbar}
            >
                {loading && 'Loading...'}
                {board && (
                    <BoardSummary
                        board={board}
                        users={users}
                        userId={me?.sub!}
                        variant='board-as-header'
                    />
                )}
                <ButtonRound
                    variant='secondary'
                    onClick={onReloadView}
                    disabled={loading}
                    className={loading ? defaultCss.rotatable : undefined}
                >
                    <i className="fa fa-refresh" />
                </ButtonRound>
                <SelectableButtons.ButtonsList<string>
                    options={buttonFiltersOptions}
                    onSelect={setSearchTerms}
                />
                <InputSearch
                    onSearch={setSingleSearchTerm}
                    disabled={loading}
                    className={defaultCss.searcher}
                />
                <Button
                    title='Add tag'
                    onClick={openAddTagModal}
                />
            </Layout.Header>
            <Layout.RouteBody className={defaultCss.sections}>
                <section className={defaultCss.section__banks}>
                    {workspaceId && <Banks workspaceId={workspaceId} />}
                </section>

                <section className={defaultCss.section__summary}>
                    <WorkspaceSummary />
                </section>
                {allMembers.map(member => {
                    return (
                        <section className={defaultCss.section__expenses} key={member.user_id}>
                            {workspaceId && <Expenses
                                workspaceId={workspaceId}
                                userId={member.user_id}
                            />}
                        </section>
                    )
                })}
            </Layout.RouteBody>
            {workspaceId && <AddTag
                open={addTagModalOpened}
                onClose={closeAddTagModal}
                workspaceId={workspaceId}
                onReload={onReloadView}
            />}
        </Layout.Route>
    )
}

export default BoardDetail