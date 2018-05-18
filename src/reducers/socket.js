import io from 'socket.io-client'
import { Events } from '../constant'

export const types = {
  START_CONNECT_SOCKET: 'socket/START_CONNECT_SOCKET',
  SUCCESS_CONNECT_SOCKET: 'socket/SUCCESS_CONNECT_SOCKET',
  FAILURE_CONNECT_SOCKET: 'socket/FAILURE_CONNECT_SOCKET'
}

const initState = {
  instance: null,
  status: 'pending'
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.START_CONNECT_SOCKET:
      return {
        ...state,
        status: 'pending'
      }
    case types.SUCCESS_CONNECT_SOCKET:
      return {
        instance: action.payload.socket,
        status: 'success'
      }
    case types.FAILURE_CONNECT_SOCKET:
      return {
        ...state,
        status: 'failure'
      }
    default:
      return state
  }
}

const startConnectSocket = () => ({
  type: types.START_CONNECT_SOCKET
})

const successConnectSocket = socket => ({
  type: types.SUCCESS_CONNECT_SOCKET,
  payload: {
    socket
  }
})

const failureConnectSocket = () => ({
  type: types.FAILURE_CONNECT_SOCKET
})

const requestConnectSocket = () => dispatch => {
  dispatch(startConnectSocket())

  // 建立 websocket 连接
  const socket = (function() {
    const { protocol, hostname, origin } = window.location
    if (process.env.NODE_ENV === 'development') {
      return io(`${protocol}//${hostname}:5000`)
    } else {
      return io(origin)
    }
  })()

  socket.on('connect', () => {
    // 延迟加载
    setTimeout(() => {
      dispatch(successConnectSocket(socket))
    }, 700)
    // test
    console.log('socket success connect')
  })

  socket.on('reconnect', () => {
    // test
    console.log('socket reconnect')

    dispatch(requestReconnectSocket())
  })

  socket.on('connect_error', () => {
    dispatch(failureConnectSocket())
    // test
    console.log('socket failure connect')
  })

  socket.on('disconnect', () => {
    // test
    console.log('socket disconnect')
  })
}

const requestReconnectSocket = () => (dispatch, getState) => {
  const state = getState()
  const socket = state.socket.instance
  const { name, status } = state.user

  if (status !== 'success') {
    return
  }

  socket.emit(Events.RECONNECT_CHAT_ROOM, name)
}

export const actions = {
  requestConnectSocket
}
