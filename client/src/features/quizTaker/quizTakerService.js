import axios from 'axios'
import { toast } from 'react-toastify'
const API_URL = 'http://localhost:8000/api/take-quiz'
import authService from '../auth/authService'

// Create new quiz taker
const addQuizTaker = async (quizData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(API_URL + '/create', quizData, config)
    if (response.status === 201) {
      toast.success('Quiz submitted successfully')
    }
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
  }
}

// Get user quizes
const getQuizTakers = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.get(API_URL, config)
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
      authService.logout()
    }
    toast.error(errorMessage)
  }
}

// Get single quiz taker
const getQuizTaker = async (quizId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + quizId, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
  }
}

// Delete a single quiz taker 
const deleteQuizTaker = async (quizId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + '/' + quizId, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
  }
}

const quizTakerService = {
  addQuizTaker,
  getQuizTaker,
  getQuizTakers,
  deleteQuizTaker
}

export default quizTakerService