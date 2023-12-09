import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionService from "./questionService";

const initialState = {
  questions: [],
  question: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new question
export const createquestion = createAsyncThunk(
  "questions/create",
  async (questionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await questionService.createQuestion(questionData, token);
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

// Get Multiple questions
export const getquestions = createAsyncThunk(
  "questions/getQuestion",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await questionService.getQuestions(token);
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


// Get single question
export const getQuestion = createAsyncThunk(
  'questions/get',
  async (questionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token
      return await questionService.getQuestion(questionId, token)
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

// Update single question
export const updateQuestion = createAsyncThunk(
  "questions/update",
  async (questionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await questionService.updateQuestion(questionData, token);
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

// Delete question
export const deleteQuestion = createAsyncThunk(
  "questions/delete",
  async (questionId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.access_token;
      return await questionService.deletequestion(questionId, token);
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

export const questionSlice = createSlice({
  name: "question",
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
      .addCase(createquestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createquestion.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createquestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getquestions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getquestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
      })
      .addCase(getquestions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.question = action.payload;
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.question = action.payload;
      })
      .addCase(updateQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        getquestions()
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = questionSlice.actions;
export default questionSlice.reducer;