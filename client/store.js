import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import axios from 'axios';

const initialState = {
  messages: [],
  msgEntry: ''
};

//Action types
const LOAD_MESSAGES = 'LOAD_MESSAGES';
const WRITE_MSG = 'WRITE_MSG'
const ADD_MSG = 'ADD_MSG'
const DELETE_MSG = 'DELETE_MSG'

//Action creators 
export const loadMessages = messages => ({ 
  type: LOAD_MESSAGES, 
  messages 
});

export const writeMsg = content => ({ 
  type: WRITE_MSG, 
  content 
})

export const addMsg = msg => ({
  type: ADD_MSG,
  msg
})

export const deleteMsg = msg => ({
  type: DELETE_MSG,
  msg
})

//thunk creators
export const _loadMessages = () => dispatch => {
  axios.get('/api/messages')
    .then(response => response.data)
    .then(messages => {
      const action = loadMessages(messages);
      dispatch(action);
    })
    .catch(err => {
      console.log('whoops', err)
    })
}

export const _submitMsg = (msg) => async dispatch => {
  const response = await axios.post('/api/messages', msg)
  const newMsg = response.data
  const action = addMsg(newMsg)
  dispatch(action)
}

export const _deleteMsg = (msg) => async dispatch => {
  const response = await axios.delete(`/api/messages/${msg.id}`)
  const action = deleteMsg(msg)
  dispatch(action)
}


//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MESSAGES:
      return { 
        ...state, 
        messages: action.messages }

    case WRITE_MSG:
      return {
        ...state,
        msgEntry: action.content
      }

    case ADD_MSG:
      return {
        ...state,
        messages: [...state.messages, action.msg],
        msgEntry: ''
      }

    case DELETE_MSG:
    const msgs = state.messages.filter(message => message.id !== action.msg.id)
      return {
        ...state,
        messages: msgs
      }

    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(thunk, logger))
export default store;