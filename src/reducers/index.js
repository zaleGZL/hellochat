import { combineReducers } from 'redux'
import socket from './socket'
import user from './user'
import chatRoom from './chatRoom'

export default combineReducers({
  socket,
  user,
  chatRoom
})