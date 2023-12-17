import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizTakerService from "./quizTakerService";

const initialState = {
  quizTakers: [],
  quizTaker: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new quiz
export const addQuizTaker = createAsyncThunk(
  "quiz-takers/create",
  async (quizData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access;
      return await quizTakerService.addQuizTaker(quizData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Multiple quizs
export const getQuizTakers= createAsyncThunk(
  "quiz-takers/getQuizTakers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access;
      return await quizTakerService.getQuizTakers(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);


// Get single quiz
export const getQuizTaker = createAsyncThunk(
  'quizes/get',
  async (quizId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access
      return await quizTakerService.getQuizTaker(quizId, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()

      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const quizTakerSlice = createSlice({
  name: "quizTaker",
  initialState,
  reducers: {
    reset: () => initialState,
    resetVariables: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addQuizTaker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addQuizTaker.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addQuizTaker.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuizTakers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizTakers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizTakers = action.payload;
      })
      .addCase(getQuizTakers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuizTaker.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizTaker.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizTaker = action.payload;
      })
      .addCase(getQuizTaker.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset, resetVariables } = quizTakerSlice.actions;
export default quizTakerSlice.reducer;
