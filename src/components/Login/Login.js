import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import chatLogo from '../../assets/chat_logo.png'
import Styled from 'styled-components'
import { actions } from '../../reducers/user'

const StyledLoginBox = Styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 300px;
    height: 280px;
    padding: 5px;
    background-color: #fff;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    box-shadow: 0 2px 10px #999;
    -moz-box-shadow: #999 0 2px 10px;
    -webkit-box-shadow: #999 0 2px 10px;
    text-align: center;
`

const StyledBrandBox = Styled.div`
    padding-top: 10px;
    & img {
        width: 50px;
        height: 50px;
        vertical-align: middle;
        margin-right: 5px;
    }
    & span {
        vertical-align: middle;
        font-family: 'IBM Plex Sans Condensed', sans-serif;
        font-weight: 500;
        font-size: 27px;
        color: #858594;
    }
`

const StyledPointOut = Styled.h1`
    font-size: 24px;
    font-weight: 400;
    margin-top: 25px;
    color: #585050;
`

const StyledInput = Styled.input`
    margin-top: 20px;
    max-width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    border-bottom: solid 2px #b3b2ca;
    border-radius: 0;
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    -webkit-transition: all .23s ease-in;
    -o-transition: all .23s ease-in;
    transition: all .23s ease-in;
    text-align:center;

    &:focus {
        border-bottom: solid 2px #5d5d8a;
        outline: none;
    }
`

const StyledMessageBox = Styled.div`
    height: 14px;
    margin-top: 10px;

    & span {
        font-size: 14px;
        height: 14px;
        color: #be0000;
    }
`

const StyledJoinButton = Styled.button`
    margin-top: 15px;
    width: 160px;
    line-height: 35px;
    background-color: #8c9eff;
    border-radius: 4px;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    border: none;
    color: #fff;
    text-align: center;
    text-decoration: none;
    outline: none;

    &:focus {
        opacity: 0.8;
    }

    &:hover {
        opacity: 0.7;
    }

    &:active {
        opacity: 0.6;
    }
`

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: ''
    }

    this.onChange = this.onChange.bind(this)
    this.onJoin = this.onJoin.bind(this)
    this.onKeyPress = this.onKeyPress.bind(this)
  }

  onChange(e) {
    this.setState({ name: e.target.value })
  }

  onJoin() {
    this.props.requestJoinChat(this.state.name)
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.requestJoinChat(this.state.name)
    }
  }

  componentDidMount() {
    this.props.mapEventsToActions()
  }
  render() {
    const { status, errorMessage } = this.props
    return (
      <StyledLoginBox>
        <StyledBrandBox>
          <img src={chatLogo} alt="chat_logo" />
          <span>HelloChat</span>
        </StyledBrandBox>
        <StyledPointOut>请输入用户名</StyledPointOut>
        <div>
          <StyledInput
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
            value={this.state.name}
          />
        </div>
        <StyledMessageBox>
          {status === 'failure' ? <span>{errorMessage}</span> : undefined}
        </StyledMessageBox>
        <StyledJoinButton
          onClick={this.onJoin}
          disabled={status === 'pending' ? true : false}
        >
          {status === 'pending' ? '加入中...' : '加入'}
        </StyledJoinButton>
      </StyledLoginBox>
    )
  }
}

const mapStateToProps = state => ({
  status: state.user.status,
  errorMessage: state.user.errorMessage
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

Login.propTypes = {
  status: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  mapEventsToActions: PropTypes.func.isRequired,
  requestJoinChat: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
