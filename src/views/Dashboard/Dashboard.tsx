import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import defaultCss from './Dashboard.module.css';
import useBoards from "lib/hooks/useBoards";
import BoardForm from "features/BoardForm";
import BoardType from "types/Board";
import BoardSummary from "features/BoardSummary";
import useOtherUsersAndMe from "lib/tools/useOtherUsersAndMe";
import stringCompareSimilar from "lib/tools/stringSoftCompare";
import BoardsApi from "lib/services/apiServices/BoardsApi";
import usePaths from "lib/services/usePaths";
import SelectableButtons from "components/SelectableButtons";
import MarkerWithLabel from "atomic/atoms/MarkerWithLabel";
import InputSearch from "atomic/atoms/InputSearch";
import ButtonRound from "atomic/atoms/Buttons/ButtonRound";
import useUsers from "lib/hooks/useUsers";
import Layout from "atomic/atoms/Layout";
import { LayoutElementNamesDashboard } from "lib/layout/layoutElementNames";

const Dashboard: FC = () => {
    const { navigateWorkspace } = usePaths();
    const { boards, loading } = useBoards();
    const { me } = useOtherUsersAndMe();
    const { users } = useUsers();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const setModalOpened = useCallback(() => setOpenModal(true), [])
    const setModalClosed = useCallback(() => setOpenModal(false), [])
    const [searchTerm, setBoardsSearchTerm] = useState("");
    const [ownershipFilterValue, setOwnershipFilterValue] = useState<("owner" | "contributor")[]>([])

    const onTilePress = useCallback((workspaceId: string) => {
        navigateWorkspace(workspaceId)
    }, [navigateWorkspace]);

    const onFormSubmit = useCallback((values: Omit<BoardType, "_id">) => BoardsApi.createBoard(values), []);

    useEffect(() => {
        if (!loading) {
            setModalClosed()
        }
    }, [loading, setModalClosed])

    const onListReload = useCallback(() => BoardsApi.fetchBoards(), []);

    const filteredBoards = useMemo(() => {
        const boardsFilteredBySearchterm = boards.filter(board => {
            const nameFilterPassed = stringCompareSimilar(searchTerm, board.content.name || "");
            const descFilterPassed = stringCompareSimilar(searchTerm, board.content.desc || "");
            return nameFilterPassed || descFilterPassed;
        });
        const boardsFilteresByOwnership = boardsFilteredBySearchterm.filter(board => {
            const ownerClicked = ownershipFilterValue.includes("owner");
            const contributorClicked = ownershipFilterValue.includes("contributor");
            let meOwn = false;
            let meContribute = false;

            if (contributorClicked) {
                meContribute = board.contributors.some(contributor => contributor === me.sub);
            }

            if (ownerClicked) {
                meOwn = board.owners.some(owner => owner === me.sub);
            }

            if (!ownerClicked && !contributorClicked) {
                meOwn = true;
                meContribute = true;
            }

            return meOwn || meContribute
        })
        return boardsFilteresByOwnership
    }, [boards, searchTerm, me, ownershipFilterValue])

    const onListSearch = useCallback((searchTerm: string) => setBoardsSearchTerm(searchTerm), [])

    return (
        <Layout.Route>
            <Layout.Header 
                className={defaultCss.toolbar}
                layoutElementName={LayoutElementNamesDashboard.DashboardToolbar}
            >
                <ButtonRound
                    variant='primary'
                    onClick={setModalOpened}
                    disabled={loading}
                >
                    <i className="fa-solid fa-plus" />
                </ButtonRound>
                <ButtonRound
                    variant='secondary'
                    onClick={onListReload}
                    disabled={loading}
                    className={loading ? defaultCss.rotatable : undefined}
                >
                    <i className="fa fa-refresh" />
                </ButtonRound>
                <SelectableButtons.ButtonsList<("owner" | "contributor") >
                    options={buttonFiltersOptions}
                    onSelect={setOwnershipFilterValue}
                />
                <InputSearch
                    onSearch={onListSearch}
                    disabled={loading}
                    className={defaultCss.searcher}
                />
            </Layout.Header>
            <ul className={defaultCss.list}>
                {filteredBoards.map((board) => (
                    <li
                        className={defaultCss.list__item}
                        key={board._id}
                        onClick={() => onTilePress(board._id)}
                        onKeyDown={() => onTilePress(board._id)}
                        tabIndex={0}
                    >
                        <BoardSummary
                            users={users}
                            userId={me?.sub!}
                            board={board}
                        />
                    </li>
                ))}
            </ul>

            <BoardForm
                open={openModal}
                onClose={setModalClosed}
                onSubmit={onFormSubmit}
                users={users}
                submitting={loading}
                variant="create"
                me={me}
            />
        </Layout.Route>
    )
}

export default Dashboard;

const buttonFiltersOptions: {
    value: ("owner" | "contributor"),
    label: ReactNode
}[] = [
        {
            label: (
                <MarkerWithLabel
                    bgColor="color-controlers"
                    pulse
                    pulseColor="color-controlers"
                >
                    Boards you own
                </MarkerWithLabel>
            ),
            value: 'owner'
        },
        {
            label: (
                <MarkerWithLabel
                    bgColor="color-secondary"
                    pulse
                    pulseColor="color-secondary"
                >
                    Boards you contribute to
                </MarkerWithLabel>
            ),
            value: 'contributor'
        }
    ]