import { FC } from "react";
import defaultCss from './Navbar.module.css';
import usePaths from "lib/services/usePaths";
import { useAppSelector } from "reduxStorage/hooks";
import { selectRecentlyViewed } from "reduxStorage/recentlyVisited/recentlyVisited";
import useBoards from "lib/hooks/useBoards";
import ButtonSecondary from "../../atomic/atoms/Buttons/ButtonSecondary";
import ButtonSquare from "../../atomic/atoms/Buttons/ButtonSquare";
import Profile from "features/Profile";
import Layout from "atomic/atoms/Layout";
import { LayoutElementNamesApp } from "lib/layout/layoutElementNames";

const Navbar: FC = () => {
    const { navigateHome, navigateWorkspace } = usePaths();
    const recentlyViewed = useAppSelector(selectRecentlyViewed);
    const { boards } = useBoards();

    return (
        <Layout.Header
            as='nav'
            layoutElementName={LayoutElementNamesApp.AppNavbar}
        >
            <div className={defaultCss.floater}>
                <ButtonSquare
                    onClick={navigateHome}
                    children={<i className="fa-solid fa-home" />}
                    variant='secondary'
                />
                {recentlyViewed.map(boardId => {
                    const board = boards.find(board => board._id === boardId);
                    return board && (
                        <ButtonSecondary
                            key={board._id}
                            onClick={() => navigateWorkspace(board._id)}
                            children={board.content.name || ""}
                            className={defaultCss.recentlyVisitedButton}
                            title={board.content.name}
                        />
                    )
                })}
                <div className={defaultCss.profile}>
                    <Profile />
                </div>
            </div>
        </Layout.Header>
    )
}

export default Navbar;