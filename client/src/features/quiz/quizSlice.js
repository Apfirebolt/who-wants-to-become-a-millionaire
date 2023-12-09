import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "./quizService";

const initialState = {
  quizes: [],
  quiz: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new quiz
export const createQuiz = createAsyncThunk(
  "quizes/create",
  async (quizData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await quizService.createQuiz(quizData, token);
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
export const getQuizes = createAsyncThunk(
  "quizs/getquiz",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await quizService.getQuizes(token);
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
export const getQuiz = createAsyncThunk(
  'quizes/get',
  async (quizId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await quizService.getQuiz(quizId, token)
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

// Update single quiz
export const updateQuiz = createAsyncThunk(
  "quizs/update",
  async (quizData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await quizService.updateQuiz(quizData, token);
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

// Delete quiz
export const deleteQuiz = createAsyncThunk(
  "quizes/delete",
  async (quizId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await quizService.deleteQuiz(quizId, token);
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

export const quizSlice = createSlice({
  name: "quiz",
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
      .addCase(createQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuiz.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuizes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quizes = action.payload;
      })
      .addCase(getQuizes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.quiz = action.payload;
      })
      .addCase(getQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quiz = action.payload;
      })
      .addCase(updateQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuiz.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        getQuizes()
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = quizSlice.actions;
export default quizSlice.reducer;