import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchContests = createAsyncThunk('contests/fetchContests', async () => {
  const response = await axios.get('https://atme-quiz.onrender.com/api/contests');
  return response.data;
});

export const addContest = createAsyncThunk('contests/addContest', async (formData) => {
  const response = await axios.post('https://atme-quiz.onrender.com/api/contests', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

export const updateContest = createAsyncThunk('contests/updateContest', async ({ id, formData }) => {
  const response = await axios.put(`https://atme-quiz.onrender.com/api/contests/${id}`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
});

const contestSlice = createSlice({
  name: 'contests',
  initialState: {
    contests: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContests.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contests = action.payload;
      })
      .addCase(fetchContests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contests.push(action.payload);
      })
      .addCase(updateContest.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contests = state.contests.map((contest) =>
          contest.id === action.payload.id ? action.payload : contest
        );
        // console.log("contestttt",action.payload)
      });
  },
});

export default contestSlice.reducer;
