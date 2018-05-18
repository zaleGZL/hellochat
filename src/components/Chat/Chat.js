import React from 'react'
import Styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChatHeading from './ChatHeading'
import ChatMessage from './ChatMessage'
import MessageInput from './MessageInput'
import { actions } from '../../reducers/chatRoom'
const { mapEventsToActions, requestUpdateUserOnlineNumber } = actions

const ChatBoxContainer = Styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`

const ChatBox = Styled.div`
    display: flex;
    overflow: hidden;
    width: 700px;
    background-color: #fff;
    box-shadow: 0 0.0625rem 0.0625rem rgba(0,0,0,.2);
    flex-flow: column wrap;

    @media only screen and (min-height: 1px) {
        height: 100vh;
    }

    @media only screen and (min-height: 701px) {
        height: 700px;
    }
`

class Chat extends React.Component {
  componentDidMount() {
    this.props.mapEventsToActions()
    this.props.requestUpdateUserOnlineNumber()
  }

  render() {
    return (
      <ChatBoxContainer>
        <ChatBox>
          <ChatHeading />
          <ChatMessage />
          <MessageInput />
        </ChatBox>
      </ChatBoxContainer>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { mapEventsToActions, requestUpdateUserOnlineNumber },
    dispatch
  )

Chat.propTypes = {
  mapEventsToActions: PropTypes.func.isRequired,
  requestUpdateUserOnlineNumber: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(Chat)
