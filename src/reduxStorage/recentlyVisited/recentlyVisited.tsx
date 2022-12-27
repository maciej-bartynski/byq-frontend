import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'reduxStorage/store';
import recentlyVisited from 'lib/services/recentlyVisited';

const initialRecentlyVisited = recentlyVisited.read();
export type RecentlyVisitedState = { data: string [] }
const initialState:RecentlyVisitedState = { data: initialRecentlyVisited};

export const recentlyViewedSlice = createSlice({
    name: 'recentlyVisited',
    initialState,
    reducers: {
        addRecentlyVisited: function (state:RecentlyVisitedState, action: PayloadAction<string>) {
            const allRecentlyVisited = recentlyVisited.save(action.payload);
            state.data = allRecentlyVisited;
        }
    },
});

export const { addRecentlyVisited } = recentlyViewedSlice.actions;
export const selectRecentlyViewed = (state: RootState) => state.recentlyViewed.data;
export default recentlyViewedSlice.reducer;