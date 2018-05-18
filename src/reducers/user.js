import { Events } from '../constant'

export const types = {
  START_JOIN_CHAT_ROOM: 'user/START_JOIN_CHAT_ROOM',
  SUCCESS_JOIN_CHAT_ROOM: 'user/SUCCESS_JOIN_CHAT_ROOM',
  FAILURE_JOIN_CHAT_ROOM: 'user/FAILURE_JOIN_CHAT_ROOM'
}

const initState = {
  name: '',
  status: '',
  errorMessage: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.START_JOIN_CHAT_ROOM:
      return {
        ...state,
        status: 'pending'
      }
    case types.SUCCESS_JOIN_CHAT_ROOM:
      return {
        ...state,
        name: action.payload.name,
        status: 'success'
      }
    case types.FAILURE_JOIN_CHAT_ROOM:
      return {
        ...state,
        status: 'failure',
        errorMessage: action.payload.errorMessage
      }
    default:
      return state
  }
}

const startJoinChatRoom = () => ({
  type: types.START_JOIN_CHAT_ROOM
})

const successJoinChatRoom = name => ({
  type: types.SUCCESS_JOIN_CHAT_ROOM,
  payload: {
    name
  }
})

const failureJoinChatRoom = errorMessage => ({
  type: types.FAILURE_JOIN_CHAT_ROOM,
  payload: {
    errorMessage
  }
})

// 在 socket 上绑定相关事件 (events ==map==> dispatch(action))

const mapEventsToActions = () => (dispatch, getState) => {
  const socket = getState().socket.instance

  socket.on(Events.SUCCESS_JOIN_CHAT_ROOM, name => {
    dispatch(successJoinChatRoom(name))
  })

  socket.on(Events.FAILURE_JOIN_CHAT_ROOM, errorMessage => {
    dispatch(failureJoinChatRoom(errorMessage))
  })
}

const requestJoinChat = name => (dispatch, getState) => {
  if (name.trim() === '') {
    return dispatch(failureJoinChatRoom('用户名不能全是空格或空'))
  }

  if (name.trim().length > 6) {
    return dispatch(failureJoinChatRoom('用户名的长度上限为6'))
  }

  const socket = getState().socket.instance

  socket.emit(Events.START_JOIN_CHAT_ROOM, name)
  dispatch(startJoinChatRoom())
}

export const actions = {
  mapEventsToActions,
  requestJoinChat
}
