import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import deleteExpense from 'lib/services/fetchByQ/expenses/deleteExpenses';
import getExpenses from 'lib/services/fetchByQ/expenses/getExpenses';
import postExpense from 'lib/services/fetchByQ/expenses/postExpenses';
import putExpense from 'lib/services/fetchByQ/expenses/putExpenses';
import { RootState } from 'reduxStorage/store';
import { Expense } from 'types/Expense';

export interface ExpensesStore {
  expenses: Expense[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ExpensesStore = {
  expenses: [],
  status: 'idle',
};

export const getExpensesAsync = createAsyncThunk(
  'boards/getExpensesAsync',
  async (workspaceId: string) => {
    const response = await getExpenses(workspaceId);
    return response
  }
);

export const createExpenseAsync = createAsyncThunk(
  'boards/createExpenseAsync',
  async (values: {
    workspaceId: string;
    expenseFields: Omit<Expense, "_id" | 'charged'>
  }) => {
    await postExpense(values)
    const response = await getExpenses(values.workspaceId);
    return response
  }
);

export const editExpenseAsync = createAsyncThunk(
  'boards/editExpenseAsync',
  async (values: {
    workspaceId: string;
    expenseFields: Expense
  }) => {
    await putExpense(values)
    const response = await getExpenses(values.workspaceId);
    return response
  }
);

export const deleteExpenseAsync = createAsyncThunk(
  'boards/deleteExpenseAsync',
  async (values: {
    expenseId: Expense["_id"],
    workspaceId: string
  }) => {
    await deleteExpense(values)
    const response = await getExpenses(values.workspaceId);
    return response
  }
);

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearExpenses: (state) => {
      state.expenses = []
    }
  },
  extraReducers: (builder) => {
    builder
      // getExpensesAsync
      .addCase(getExpensesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getExpensesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.expenses = action.payload;
      })
      .addCase(getExpensesAsync.rejected, (state) => {
        state.status = 'failed';
      })

      // createBoardsAsync
      .addCase(createExpenseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createExpenseAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.expenses = action.payload;
      })
      .addCase(createExpenseAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // editBoardsAsync
      .addCase(editExpenseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editExpenseAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.expenses = action.payload;
      })
      .addCase(editExpenseAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // deleteBoardAsync
      .addCase(deleteExpenseAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.expenses = action.payload;
      })
      .addCase(deleteExpenseAsync.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const { clearExpenses } = expensesSlice.actions
export const selectExpenses = (state: RootState) => state.expenses;
export default expensesSlice.reducer;
