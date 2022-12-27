import Button from "atomic/atoms/Button";
import useBoards from "lib/hooks/useBoards";
import useOtherUsersAndMe from "lib/tools/useOtherUsersAndMe";
import { FC, ReactNode, useCallback } from "react";
import BoardType from "types/Board";
import defaultCss from './DeletionManager.module.css';
import * as RSuite from 'rsuite';
import useUsers from "lib/hooks/useUsers";
import UsersList from "atomic/atoms/UsersList";

const DeletionManager: FC<{
    board: BoardType;
    opened: boolean;
    onClose: () => void
}> = ({
    board,
    onClose,
    opened
}) => {

        const {
            removeBoard,
            cancelRemoveBoard,
            loading
        } = useBoards();

        const { users } = useUsers();

        const usersWhoWantDeletionList = board.deleteRequests?.map(userId => {
            const userDetail = users.find(u => u.user_id === userId);
            return {
                ...userDetail!,
                pulse: true,
                bgColor: 'color-red-alert',
                pulseColor: 'color-red-alert'
            }
        });

        const onDeleteBoard: React.MouseEventHandler<HTMLButtonElement> = useCallback(async (e) => {
            e.stopPropagation();
            if (board._id && !loading) {
                removeBoard(board._id);
            }
        }, [removeBoard, loading, board])

        const onCancelDeleteBoard: React.MouseEventHandler<HTMLButtonElement> = useCallback(async (e) => {
            e.stopPropagation();
            if (board._id && !loading) {
                cancelRemoveBoard(board._id);
            }
        }, [cancelRemoveBoard, loading, board])

        const { me } = useOtherUsersAndMe()
        const isOwner = board.owners.some(userId => userId === me.sub);
        const meRequestedAlready = !!board.deleteRequests?.some(userId => userId === me.sub);
        const isDeletionNotJustRequest = !meRequestedAlready && (board.deleteRequests?.length || 0) === board.owners.length - 1;

        let modalContent: ReactNode = (
            <div>
                You don't have permission to delete this board. Contact owners.
            </div>
        );

        if (isOwner) {

            const label = isDeletionNotJustRequest
                ? "This action removes board immediately."
                : meRequestedAlready
                    ? "You already requested for board deletion."
                    : "Send request for board deletion."

            const button = (
                <Button
                    disabled={loading}
                    title={loading
                        ? "Processing..."
                        : meRequestedAlready
                            ? 'Cancel request'
                            : 'Send request'}
                    onClick={meRequestedAlready ? onCancelDeleteBoard : onDeleteBoard}
                    className={meRequestedAlready ? defaultCss.cancelationButton : defaultCss.deletionButton}
                />
            )

            modalContent = (
                <div className={defaultCss.root}>
                    <div>
                        {label}
                    </div>
                    <div>
                        {button}
                    </div>
                </div>
            )
        }

        return (
            <RSuite.Modal size="sm" open={opened} onClose={onClose}>
                <RSuite.Modal.Header>
                    Deletion manager
                </RSuite.Modal.Header>
                <RSuite.Modal.Body>
                    {modalContent}
                    {!!(usersWhoWantDeletionList && usersWhoWantDeletionList.length) && (
                        <div className={defaultCss.listSection}>
                            <UsersList
                                listTitle="deletion requests:"
                                users={usersWhoWantDeletionList}
                            />
                        </div>
                    )}
                </RSuite.Modal.Body>
            </RSuite.Modal>
        )
    }

export default DeletionManager;