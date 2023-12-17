import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import questionReducer from './features/question/questionSlice'
import quizReducer from './features/quiz/quizSlice'
import quizTakerReducer from './features/quizTaker/quizTakerSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    quiz: quizReducer,
    question: questionReducer,
    quizTaker: quizTakerReducer,
  },
})