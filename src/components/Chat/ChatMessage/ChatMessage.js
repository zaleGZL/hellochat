import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Styled from 'styled-components'
import SystemMessage from './SystemMessage'
import MessageBubble from './MessageBubble'

const MessageBox = Styled.div`
    background-image: url(http://p3ek8rd7p.bkt.clouddn.com/wallpaper.png);
    background-color: #d3dce5;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    height: 0;
    width: 100%;
    border-top: 1px solid #c7c0c0;
    border-bottom: 1px solid #c7c0c0;
    flex-grow: 1;
`

class ChatMessage extends React.Component {
  constructor(props) {
    super(props)

    this.scrollToBottom = this.scrollToBottom.bind(this)
  }

  scrollToBottom() {
    this.messageBox.scrollTop = this.messageBox.scrollHeight
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  render() {
    const { records, userName } = this.props

    return (
      <MessageBox innerRef={messageBox => (this.messageBox = messageBox)}>
        {records.map((record, index) => {
          if (record.type === 'system') {
            return (
              <SystemMessage
                key={index}
                userName={record.userName}
                inOrOut={record.inOrOut}
              />
            )
          } else if (record.type === 'chat') {
            return (
              <MessageBubble
                key={index}
                userName={record.userName}
                me={userName === record.userName ? true : false}
                content={record.content}
              />
            )
          } else {
            return undefined
          }
        })}
      </MessageBox>
    )
  }
}

const mapStateToProps = state => ({
  records: state.chatRoom.records,
  userName: state.user.name
})

ChatMessage.propTypes = {
  records: PropTypes.array.isRequired,
  userName: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(ChatMessage)
