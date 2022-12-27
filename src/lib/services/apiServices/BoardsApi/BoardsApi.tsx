import { store } from "reduxStorage/store";
import {
    cancelDeletionBoardAsync,
    createBoardAsync,
    deleteBoardAsync,
    editBoardAsync,
    getBoardAsync,
    getBoardsAsync
} from "reduxStorage/boards/boards";
import BoardType from "types/Board";

const BoardsApi = {

    fetchBoards() {
        store.dispatch(getBoardsAsync())
    },

    fetchBoard(boardId: string) {
        store.dispatch(getBoardAsync(boardId))
    },

    createBoard(values: Omit<BoardType, "_id">) {
        store.dispatch(createBoardAsync(values));
    },

    editBoard(values: BoardType) {
        store.dispatch(editBoardAsync(values));
    },

    removeBoard(id: string) {
        store.dispatch(deleteBoardAsync(id));
    },

    cancelRemoveBoard(id: string) {
        store.dispatch(cancelDeletionBoardAsync(id));
    },
}

export default BoardsApi