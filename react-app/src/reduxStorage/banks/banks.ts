import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'reduxStorage/store';
import { BankType } from 'types/Bank';
import getBanks from 'lib/services/fetchByQ/boards/getBanks';
import createBank from 'lib/services/fetchByQ/boards/createBank';
import deleteBank from 'lib/services/fetchByQ/boards/deleteBank';
import editBanks from 'lib/services/fetchByQ/boards/editBank';
import markBankAsPocket from 'lib/services/fetchByQ/boards/markBankAsPocket';
import unmarkBankAsPocket from 'lib/services/fetchByQ/boards/unmarkBankAsPocket';

export interface BanksStore {
  banks: BankType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BanksStore = {
  banks: [],
  status: 'idle',
};

export const getBanksAsync = createAsyncThunk(
  'boards/getBanksAsync',
  async (workspaceId: string) => {
    const response = await getBanks(workspaceId);
    return response
  }
);

export const createBankAsync = createAsyncThunk(
  'boards/createBankAsync',
  async (values: {
    workspaceId: string;
    bankFields: Omit<BankType, "_id">
  }) => {
    await createBank(values)
    const response = await getBanks(values.workspaceId);
    return response
  }
);

export const editBankAsync = createAsyncThunk(
  'boards/editBankAsync',
  async (values: {
    workspaceId: string;
    bankFields: BankType
  }) => {
    await editBanks(values)
    const response = await getBanks(values.workspaceId);
    return response
  }
);

export const pocketBankAsync = createAsyncThunk(
  'boards/pocketBankAsync',
  async (values: {
    workspaceId: string;
    bankId: BankType['_id']
  }) => {
    await markBankAsPocket(values);
    const response = await getBanks(values.workspaceId);
    return response
  }
);

export const unpocketBankAsync = createAsyncThunk(
  'boards/unpocketBankAsync',
  async (values: {
    workspaceId: string;
    bankId: BankType['_id']
  }) => {
    await unmarkBankAsPocket(values);
    const response = await getBanks(values.workspaceId);
    return response
  }
);

export const deleteBankAsync = createAsyncThunk(
  'boards/deleteBankAsync',
  async (values: {
    bankId: BankType["_id"],
    workspaceId: string
  }) => {
    await deleteBank(values)
    const response = await getBanks(values.workspaceId);
    return response
  }
);

export const banksSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    clearBanks: (state) => {
      state.banks = []
    }
  },
  extraReducers: (builder) => {
    builder
      // getBanksAsync
      .addCase(getBanksAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBanksAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.banks = action.payload;
      })
      .addCase(getBanksAsync.rejected, (state) => {
        state.status = 'failed';
      })

      // createBoardsAsync
      .addCase(createBankAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBankAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.banks = action.payload;
      })
      .addCase(createBankAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // editBoardsAsync
      .addCase(editBankAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editBankAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.banks = action.payload;
      })
      .addCase(editBankAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // deleteBoardAsync
      .addCase(deleteBankAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBankAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.banks = action.payload;
      })
      .addCase(deleteBankAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // pocketBankAsync
      .addCase(pocketBankAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(pocketBankAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.banks = action.payload;
      })
      .addCase(pocketBankAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // unpocketBankAsync
      .addCase(unpocketBankAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(unpocketBankAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.banks = action.payload;
      })
      .addCase(unpocketBankAsync.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const { clearBanks } = banksSlice.actions
export const selectBanks = (state: RootState) => state.banks;
export default banksSlice.reducer;
