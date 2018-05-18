import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

const LoadingContainer = Styled.div`
    width: 100%;
    height: 100%;
    background-color: #8c9eff;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoadingBox = Styled.div`
    text-align: center;
`

const LoadingSVG = Styled.img`
    width: 40px;
    vertical-align: middle;
`
const Message = Styled.div`
    margin-top: 8px;
    font-size: 15px;
    color: #d7d7d7;
`

const Loading = ({ message }) => (
  <LoadingContainer>
    <LoadingBox>
      <LoadingSVG
        src="http://p3ek8rd7p.bkt.clouddn.com/bars.svg"
        alt="loading_img"
      />
      {message ? <Message>{message}</Message> : undefined}
    </LoadingBox>
  </LoadingContainer>
)

Loading.propTypes = {
  message: PropTypes.string
}

export default Loading
