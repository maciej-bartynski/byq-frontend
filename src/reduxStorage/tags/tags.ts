import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import deleteTag from 'lib/services/fetchByQ/tags/deleteTag';
import getTags from 'lib/services/fetchByQ/tags/getTags';
import postTag from 'lib/services/fetchByQ/tags/postTag';
import putTag from 'lib/services/fetchByQ/tags/putTag';
import { getExpensesAsync } from 'reduxStorage/expenses/expenses';
import { RootState, store } from 'reduxStorage/store';
import { Tag } from 'types/Tag';

export interface TagsStore {
  tags: Tag[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TagsStore = {
  tags: [],
  status: 'idle',
};

export const getTagsAsync = createAsyncThunk(
  'boards/getTagsAsync',
  async (workspaceId: string) => {
    const response = await getTags(workspaceId);
    return response
  }
);

export const createTagAsync = createAsyncThunk(
  'boards/createTagAsync',
  async (values: {
    workspaceId: string;
    tagFields: Omit<Tag, "_id">
  }) => {
    await postTag(values)
    const response = await getTags(values.workspaceId);
    return response
  }
);

export const editTagAsync = createAsyncThunk(
  'boards/editTagAsync',
  async (values: {
    workspaceId: string;
    tagFields: Tag
  }) => {
    await putTag(values)
    const response = await getTags(values.workspaceId);
    return response
  }
);

export const deleteTagAsync = createAsyncThunk(
  'boards/deleteTagAsync',
  async (values: {
    tagId: Tag["_id"],
    workspaceId: string
  }) => {
    await deleteTag(values)
    const response = await getTags(values.workspaceId);
    store.dispatch(getExpensesAsync(values.workspaceId))
    return response
  }
);

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    clearTags: (state) => {
      state.tags = []
    }
  },
  extraReducers: (builder) => {
    builder
      // getTagsAsync
      .addCase(getTagsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTagsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tags = action.payload;
      })
      .addCase(getTagsAsync.rejected, (state) => {
        state.status = 'failed';
      })

      // createBoardsAsync
      .addCase(createTagAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTagAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tags = action.payload;
      })
      .addCase(createTagAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // editBoardsAsync
      .addCase(editTagAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editTagAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tags = action.payload;
      })
      .addCase(editTagAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // deleteBoardAsync
      .addCase(deleteTagAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTagAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tags = action.payload;
      })
      .addCase(deleteTagAsync.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const { clearTags } = tagsSlice.actions
export const selectTags = (state: RootState) => state.tags;
export default tagsSlice.reducer;
