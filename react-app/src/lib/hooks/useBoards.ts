import { cancelDeletionBoardAsync, createBoardAsync, deleteBoardAsync, editBoardAsync, getBoardAsync, getBoardsAsync, selectBoards } from "reduxStorage/boards/boards";
import { useAppDispatch, useAppSelector } from "reduxStorage/hooks";
import { useCallback } from "react";
import BoardType from "types/Board";

function useBoards() {
    const dispatch = useAppDispatch();
    const { boards, board, status } = useAppSelector(selectBoards)
    const loading = status === 'loading';

    const fetchBoards = useCallback(() => {
        dispatch(getBoardsAsync())
    }, [dispatch]);

    const fetchBoard = useCallback((boardId: string) => {
        dispatch(getBoardAsync(boardId))
    }, [dispatch]);

    const createBoard = useCallback((values: Omit<BoardType, "_id">) => {
        dispatch(createBoardAsync(values));
    }, [dispatch]);

    const editBoard = useCallback((values: BoardType) => {
        dispatch(editBoardAsync(values));
    }, [dispatch]);

    const removeBoard = useCallback((id: string) => {
        dispatch(deleteBoardAsync(id));
    }, [dispatch]);

    const cancelRemoveBoard = useCallback((id: string) => {
        dispatch(cancelDeletionBoardAsync(id));
    }, [dispatch]);

    return {
        board,
        boards,
        fetchBoards,
        fetchBoard,
        createBoard,
        removeBoard,
        editBoard,
        cancelRemoveBoard,
        loading,
        status
    }
}

export default useBoards;