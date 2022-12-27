import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { banksSlice } from './banks/banks';
import { boardsSlice } from './boards/boards';
import { expensesSlice } from './expenses/expenses';
import { recentlyViewedSlice } from './recentlyVisited/recentlyVisited';
import { tagsSlice } from './tags/tags';
import { usersSlice } from './users/users';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersSlice.reducer,
    boards: boardsSlice.reducer,
    banks: banksSlice.reducer,
    expenses: expensesSlice.reducer,
    tags: tagsSlice.reducer,
    recentlyViewed: recentlyViewedSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
