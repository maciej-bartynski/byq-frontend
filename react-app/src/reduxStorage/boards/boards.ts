import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'reduxStorage/store';
import cancelDeleteBoard from 'lib/services/fetchByQ/boards/cancelDeleteBoard';
import createBoard from 'lib/services/fetchByQ/boards/createBoard';
import deleteBoard from 'lib/services/fetchByQ/boards/deleteBoard';
import editBoard from 'lib/services/fetchByQ/boards/editBoard';
import getBoard from 'lib/services/fetchByQ/boards/getBoard';
import getBoards from 'lib/services/fetchByQ/boards/getBoards';
import BoardType from 'types/Board';

export interface BoardsStore {
  boards: BoardType[];
  board?: BoardType;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BoardsStore = {
  boards: [],
  board: undefined,
  status: 'idle',
};

export const getBoardsAsync = createAsyncThunk(
  'boards/getBoardsAsync',
  async () => {
    const response = await getBoards();
    return response
  }
);

export const getBoardAsync = createAsyncThunk(
  'boards/getBoardAsync',
  async (boardId: string) => {
    const response = await getBoard(boardId);
    return response
  }
);

export const createBoardAsync = createAsyncThunk(
  'boards/createBoardAsync',
  async (values: Omit<BoardType, "_id">) => {
    await createBoard({
      content: {
        name: values.content.name,
        desc: values.content.desc
      },
      owners: values.owners,
      contributors: values.contributors,
    })
    const response = await getBoards();
    return response
  }
);

export const editBoardAsync = createAsyncThunk(
  'boards/editBoardAsync',
  async (values: BoardType) => {
    await editBoard({
      content: {
        name: values.content.name,
        desc: values.content.desc
      },
      owners: values.owners,
      contributors: values.contributors,
    }, values._id)
    const response = await getBoard(values._id);
    return response
  }
);

export const deleteBoardAsync = createAsyncThunk(
  'boards/deleteBoardAsync',
  async (boardId: BoardType["_id"]) => {
    await deleteBoard(boardId)
    const response = await getBoards();
    return response
  }
);

export const cancelDeletionBoardAsync = createAsyncThunk(
  'boards/cancelDeletionBoardAsync',
  async (boardId: BoardType["_id"]) => {
    await cancelDeleteBoard(boardId)
    const response = await getBoards();
    return response
  }
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getBoardsAsync
      .addCase(getBoardsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.boards = action.payload || [];
      })
      .addCase(getBoardsAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // getBoardAsync
      .addCase(getBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.board = action.payload;
      })
      .addCase(getBoardAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // createBoardsAsync
      .addCase(createBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBoardAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.boards = action.payload;
      })
      .addCase(createBoardAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // editBoardsAsync
      .addCase(editBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editBoardAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.board = action.payload;
      })
      .addCase(editBoardAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // deleteBoardAsync
      .addCase(deleteBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBoardAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.boards = action.payload;
        state.board = action.payload.find(item => item._id === state.board?._id)
      })
      .addCase(deleteBoardAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // cancelDeletionBoardAsync
      .addCase(cancelDeletionBoardAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelDeletionBoardAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.boards = action.payload;
        state.board = action.payload.find(item => item._id === state.board?._id)
      })
      .addCase(cancelDeletionBoardAsync.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const selectBoards = (state: RootState) => state.boards;
export default boardsSlice.reducer;
