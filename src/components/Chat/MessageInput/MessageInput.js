import React from 'react'
import Styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../reducers/chatRoom'

const { requestAddChatRecord } = actions

const MessageInputBox = Styled.div`
    display: flex;
    box-sizing: border-box;
    height: auto;
    width: 100%;
    background-color: #e6e7e6;
    padding: 2% 1.375rem 2% .875rem;
    /* position: relative; */
    justify-content: center;
    align-items: center;
    min-height: 60px;
    flex-grow: 0;
`

const InputBox = Styled.div`
    /* position: relative; */
    flex: 1 1 100%;
`

const Input = Styled.input`
    box-sizing: border-box;
    font-size: .875rem;
    line-height: 1.5;
    /* overflow: auto; */
    width: 100%;
    /* min-height: 2em;
    max-height: 7em; */
    padding: .25em .5em .25em .5em;
    white-space: pre-wrap;
    word-break: break-all;
    border: .0625rem solid #ececec;
    border-radius: .375rem;
    outline: 0;
    background-color: #fff;

    user-select: text!important;

    &::-webkit-scrollbar{
        display:none;
    }
`

const SendButtonBox = Styled.div`
    margin-left: .75rem;
    flex: 0 0 auto;
`

const SendButton = Styled.button`
    font-size: .75rem;
    line-height: 1;
    width: 6em;
    height: 2.5em;
    color: #fff;
    border-radius: .375rem;
    background-color: #00b3ff;
    ${props => (!props.canClick ? 'opacity: 0.5' : undefined)};
    cursor: ${props => (props.canClick ? 'pointer' : 'not-allowed')};
    border: none;
    outline: 0;
`

class MessageInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }

    this.onSend = this.onSend.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  onSend() {
    const message = this.state.message
    if (message.trim() !== '') {
      this.setState({ message: '' })
      this.props.requestAddChatRecord(message)
    }
  }

  onChange(e) {
    this.setState({ message: e.target.value })
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSend()
    }
  }

  render() {
    return (
      <MessageInputBox>
        <InputBox>
          <Input
            onKeyPress={this.onKeyPress}
            onChange={this.onChange}
            value={this.state.message}
          />
        </InputBox>
        <SendButtonBox>
          <SendButton
            onClick={this.onSend}
            canClick={this.state.message.trim() !== '' ? true : false}
          >
            发送
          </SendButton>
        </SendButtonBox>
      </MessageInputBox>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestAddChatRecord
    },
    dispatch
  )

export default connect(null, mapDispatchToProps)(MessageInput)
