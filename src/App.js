import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Login from './components/Login'
import Chat from './components/Chat'
import Loading from './components/Loading'
import { actions } from './reducers/socket'

class App extends React.Component {
  componentDidMount() {
    this.props.requestConnectSocket()
  }

  render() {
    const { socketStatus, userStatus } = this.props

    // websocket 正在连接或连接失败
    if (socketStatus !== 'success') {
      return socketStatus === 'failure' ? (
        <Loading message="连接失败，请刷新重试" />
      ) : (
        <Loading />
      )
    }

    if (socketStatus === 'success' && userStatus !== 'success') {
      return <Login />
    }

    if (socketStatus === 'success' && userStatus === 'success') {
      return <Chat />
    }
  }
}

const mapStateToProps = state => ({
  socketStatus: state.socket.status,
  userStatus: state.user.status
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

App.propTypes = {
  socketStatus: PropTypes.string.isRequired,
  userStatus: PropTypes.string.isRequired,
  requestConnectSocket: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
