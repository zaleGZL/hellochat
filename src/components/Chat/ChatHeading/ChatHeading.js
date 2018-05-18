import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Styled from 'styled-components'

const Heading = Styled.div`
    position: relative;
    display: flex;
    height: 50px;
    width: 100%;
    flex-grow: 0;
    justify-content: center;
    background-color: #e6e7e6;
`

const OnlineUsersNumber = Styled.div`
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 15px;
    line-height: 50px;
    color: #00b3ff;
    font-size: .875rem;
`

const ChatWindowName = Styled.div`
    /* font-family: 'IBM Plex Sans Condensed', sans-serif; */
    font-family: 'Muli', sans-serif;
    font-weight: 600;
    font-style: normal;
    font-size: 1.35rem;
    color: #535353;
    line-height: 50px;
`

// const AvatarContainer = Styled.div`
//     display: flex;
//     position: absolute;
//     top: 0;
//     right: 0;
//     height: 100%;
//     margin-right: 15px;
// `

// const AvatarBox = Styled.div`
//     margin-left: 16px;
//     margin-top: auto;
//     margin-bottom: auto;
// `

// const Avatar = Styled.span`
//     /* font-size: 1.125rem; */
//     font-size: .875rem;
//     line-height: 2em;
//     display: block;
//     /* width: 2em; */
//     /* height: 2em; */
//     text-align: center;
//     color: #00b3ff;
//     /* border-radius: 50%; */
// `

class ChatHeading extends React.Component {
  render() {
    const { onlineNumber, userName } = this.props
    return (
      <Heading>
        <OnlineUsersNumber>
          在线人数: {onlineNumber === 0 ? '-' : onlineNumber}
        </OnlineUsersNumber>
        <ChatWindowName>HelloChat</ChatWindowName>

      </Heading>
    )
  }
}

ChatHeading.propTypes = {
  userName: PropTypes.string.isRequired,
  onlineNumber: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  userName: state.user.name,
  onlineNumber: state.chatRoom.onlineNumber
})

export default connect(mapStateToProps)(ChatHeading)

// const a =  <AvatarContainer>
// <AvatarBox>
//   <Avatar>{userName}</Avatar>
// </AvatarBox>
// </AvatarContainer>