import BoardAsHeader from "atomic/organisms/BoardAsHeader";
import BoardTile from "atomic/organisms/BoardTile";
import BoardForm from "features/BoardForm";
import DeletionManager from "features/DeletionManager";
import useBoards from "lib/hooks/useBoards";
import useOtherUsersAndMe from "lib/tools/useOtherUsersAndMe";
import { FC, useCallback, useMemo, useState } from "react";
import BoardType from "types/Board";
import OtherUser from "types/OtherUser";

const BoardSummary: FC<{
    users?: OtherUser[],
    userId: string;
    variant?: 'board-as-header' | 'board-tile',
    board: BoardType
}> = ({
    users,
    userId,
    variant = 'board-tile',
    board
}) => {
        const { content, deleteRequests, owners, contributors, _id } = board;
        const { name, desc } = content;

        const { usersWithoutMe } = useOtherUsersAndMe();
        const { loading, editBoard, } = useBoards();
        const [editionOpened, setEditionOpened] = useState<boolean>(false);
        const [deletionOpened, setDeletionOpened] = useState<boolean>(false);
        const openEdition = useCallback(() => {
            setEditionOpened(true);
        }, [setEditionOpened]);
        const openDeletion = useCallback(() => {
            setDeletionOpened(true);
        }, [setDeletionOpened]);
        const closeModal = useCallback(() => {
            setEditionOpened(false);
            setDeletionOpened(false);
        }, [setEditionOpened]);

        const onFormSubmit = useCallback((values: Omit<BoardType, "_id">) => {
            if (_id) {
                editBoard({ ...values, _id: _id });
                closeModal();
            }
        }, [editBoard, closeModal, _id]);

        const meRequestedDeletion = deleteRequests?.some(userIdx => userIdx === userId);
        const deletionRequestMade = meRequestedDeletion
            ? !!deleteRequests?.length && (deleteRequests?.length > 1)
            : !!deleteRequests?.length
        const meOwner = owners.some(ownerId => ownerId === userId);

        const ownershipUsers = useMemo(() => {
            if (!users) return [];

            return owners.map(ownerId => {
                const isMe = ownerId === userId;
                const userData = users.find(item => item.user_id === ownerId);
                return userData && {
                    ...userData,
                    bgColor: 'color-controlers',
                    pulse: isMe,
                    pulseColor: 'color-controlers',
                    message: 'owner'
                }
            }).filter(item => !!item) as OtherUser[];

        }, [owners, users, userId]);

        const contributionUsers = useMemo(() => {
            if (!users) return [];

            return contributors.map(contributorId => {
                const isMe = contributorId === userId;
                const userData = users.find(item => item.user_id === contributorId);
                return userData && {
                    ...userData,
                    bgColor: 'color-secondary',
                    pulse: isMe,
                    pulseColor: 'color-secondary',
                    message: 'contributor'
                }
            }).filter(item => !!item) as OtherUser[];

        }, [users, userId, contributors]);

        return (
            <>{variant === 'board-tile'
                ? <BoardTile
                    contributionUsers={contributionUsers}
                    ownershipUsers={ownershipUsers}
                    meOwner={meOwner}
                    deletionRequestMade={deletionRequestMade}
                    meRequestedDeletion={!!meRequestedDeletion}
                    id={_id}
                    name={name}
                    desc={desc}
                />
                : <BoardAsHeader
                    contributionUsers={contributionUsers}
                    ownershipUsers={ownershipUsers}
                    meOwner={meOwner}
                    deletionRequestMade={deletionRequestMade}
                    meRequestedDeletion={!!meRequestedDeletion}
                    id={_id}
                    name={name}
                    desc={desc}
                    loading={loading}
                    openDeletion={openDeletion}
                    openEdition={openEdition}
                />}
                {board && <BoardForm
                    open={editionOpened && !loading}
                    onClose={closeModal}
                    onSubmit={onFormSubmit}
                    users={usersWithoutMe}
                    submitting={loading}
                    initialValues={board}
                    variant="edit"
                />}
                {board && <DeletionManager
                    board={board}
                    opened={deletionOpened}
                    onClose={closeModal}
                />}
            </>)
    }

export default BoardSummary;