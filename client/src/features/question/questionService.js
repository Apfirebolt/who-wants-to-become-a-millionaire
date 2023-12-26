import axios from 'axios'
import { toast } from 'react-toastify'
import authService from '../auth/authService'
const API_URL = 'http://localhost:8000/api/questions'

// Create new question
const createQuestion = async (questionData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await axios.post(API_URL + '/create', questionData, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
      authService.logout()
    }
    if (err.response.status === 400) {
      errorMessage = ''
      err.response.data.non_field_errors.map((error) => {
        errorMessage += error + '\n'
      })
    }
    toast.error(errorMessage)
  }
}

// Get user questiones
const getQuestions = async (token) => {
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

// Get single question
const getQuestion = async (questionId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + questionId, config)
  
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

// Update question
const updateQuestion = async (data, token) => {
 try {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // Extract the ID from the data payload
  const response = await axios.patch(API_URL + data.id, data, config)

  return response.data
 } catch (err) {
  let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
    }
    toast.error(errorMessage)
 }
}

// Delete single question
const deleteQuestion = async (questionId, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.delete(API_URL + '/' + questionId, config)
  
    return response.data
  } catch (err) {
    let errorMessage = 'Something went wrong'
    if (err.response.status === 401) {
      errorMessage = 'Unauthorized access, please login again.'
      // logout

    }
    toast.error(errorMessage)
  }
}

const questionService = {
  createQuestion,
  getQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
}

export default questionService