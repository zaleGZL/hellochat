import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

const MessageBox = Styled.div`
    overflow: hidden;
    margin: 15px 32px;
    text-align: center;
`

const Message = Styled.p`
    font-size: .75rem;
    display: inline-block;
    margin: 0;
    padding: .2em 2.3em;
    vertical-align: bottom;
    color: #fff;
    border-radius: .5rem;
    background-color: hsla(0,0%,62%,.7);
`

class SystemMessage extends React.PureComponent {
  render() {
    const { userName, inOrOut } = this.props
    return (
      <MessageBox>
        <Message>{`${userName} 已${inOrOut === 'in' ? '上' : '下'}线`}</Message>
      </MessageBox>
    )
  }
}

SystemMessage.propTypes = {
  userName: PropTypes.string.isRequired,
  inOrOut: PropTypes.string.isRequired
}

export default SystemMessage
