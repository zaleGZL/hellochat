import { Events } from '../constant'

export const types = {
  UPDATE_USER_ONLINE_NUMBER: 'chatRoom/UPDATE_USER_ONLINE_NUMBER',
  ADD_RECORD: 'chatRoom/ADD_RECORD'
}

const initState = {
  onlineNumber: 0,
  records: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.UPDATE_USER_ONLINE_NUMBER:
      return {
        ...state,
        onlineNumber: action.payload.onlineNumber
      }
    case types.ADD_RECORD:
      return {
        ...state,
        records: [
          ...state.records,
          {
            ...action.payload.record
          }
        ]
      }
    default:
      return state
  }
}

const updateUserOnlineNumber = onlineNumber => ({
  type: types.UPDATE_USER_ONLINE_NUMBER,
  payload: {
    onlineNumber
  }
})

const addRecord = record => ({
  type: types.ADD_RECORD,
  payload: {
    record
  }
})

// 在 socket 上绑定相关事件 (events ==map==> dispatch(action))

const mapEventsToActions = () => (dispatch, getState) => {
  const socket = getState().socket.instance

  socket.on(Events.UPDATE_USER_ONLINE_NUMBER, number => {
    dispatch(updateUserOnlineNumber(number))
  })

  socket.on(Events.ADD_SYSTEM_RECORD, (userName, inOrOut) => {
    dispatch(addRecord({ type: 'system', userName, inOrOut }))
  })

  socket.on(Events.ADD_CHAT_RECORD, (userName, content) => {
    dispatch(addRecord({ type: 'chat', userName, content }))
  })
}

const requestUpdateUserOnlineNumber = () => (dispatch, getState) => {
  const socket = getState().socket.instance

  socket.emit(Events.UPDATE_USER_ONLINE_NUMBER)
}

const requestAddChatRecord = content => (dispatch, getState) => {
  const socket = getState().socket.instance
  const userName = getState().user.name

  socket.emit(Events.ADD_CHAT_RECORD, userName, content)
  dispatch(addRecord({ type: 'chat', userName, content }))
}

export const actions = {
  mapEventsToActions,
  requestUpdateUserOnlineNumber,
  requestAddChatRecord
}
