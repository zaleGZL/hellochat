import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

const MessageBubbleContainer = Styled.div`
    display: flex;
    overflow: hidden;
    align-items: center;
    margin: .625rem .625rem .625rem .625rem;
    ${props => (props.me ? 'margin-left: 60px' : 'margin-right: 60px')};
    flex-direction: ${props => (props.me ? 'row-reverse' : 'row')};
`

const Avatar = Styled.span`
    font-size: 1.125rem;
    line-height: 2em;
    display: block;
    width: 2em;
    height: 2em;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    background: ${props => (props.me ? '#8C9EFF' : '#fba726')};
    flex: 0 0 auto;
`

const MessageBubbleBox = Styled.div`
    display: flex;
    flex-direction: column;
    ${props => (props.me ? 'margin-right: .625rem' : 'margin-left: .625rem')};
    align-items: flex-start;
`
const MessageBubbleText = Styled.div`
    position: relative;
    box-sizing: content-box;
    max-width: 34em;
    width: auto;
    padding: .35rem .5rem;
    /* border: .0625rem solid #c1c9d0;
    background-color: #fff; */
    border: ${props =>
      props.me ? '.0625rem solid #a7b5ff' : '.0625rem solid #c1c9d0'};
    background-color: ${props => (props.me ? '#b7c2ff' : '#fff')};
    border-radius: .375rem;
`
const MessageBubbleName = Styled.div`
    color: ${props => (props.me ? '#8C9EFF' : '#fba726')};
    margin-bottom: .15rem;
    font-size: .75rem;
    line-height: 1;
    display: block;
    user-select: text;
`

const MessageBubbleContent = Styled.div`
    font-size: .875rem;
    line-height: 1.5;
    display: inline;
    user-select: text;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
    color: #313232;
`

const MessageBubbleStatusBox = Styled.div`
    vertical-align: bottom;
    vertical-align: -webkit-baseline-middle;
    font-size: .75rem;
    line-height: 1.5;
    display: inline-block;
    min-width: 3.5rem;
    float: right;
    height: 1.5em;
    margin-top: 0;
    margin-left: 1em;
    margin-right: 0.7em;
    text-align: right;
`

const MessageBubbleStatus = Styled.span`
    user-select: text;
    vertical-align: bottom;
    vertical-align: -webkit-baseline-middle;
    font-size: .75rem;
    font-style: italic;
    display: inline-block;
    color: #939393;
    line-height: 1;
`

class MessageBubble extends React.PureComponent {
  render() {
    const { userName, content, me } = this.props
    const time = new Date()
    return (
      <MessageBubbleContainer me={me}>
        <Avatar me={me}>{userName[0]}</Avatar>
        <MessageBubbleBox me={me}>
          <MessageBubbleText me={me}>
            {me === false ? (
              <MessageBubbleName me={me}>{userName}</MessageBubbleName>
            ) : (
              undefined
            )}
            <MessageBubbleContent>{content}</MessageBubbleContent>
            <MessageBubbleStatusBox>
              <MessageBubbleStatus
              >{`${time.getHours()}:${time.getMinutes()}`}</MessageBubbleStatus>
            </MessageBubbleStatusBox>
          </MessageBubbleText>
        </MessageBubbleBox>
      </MessageBubbleContainer>
    )
  }
}

MessageBubble.propTypes = {
  userName: PropTypes.string,
  content: PropTypes.string.isRequired,
  me: PropTypes.bool.isRequired
}

export default MessageBubble
