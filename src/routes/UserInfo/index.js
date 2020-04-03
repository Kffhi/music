import React, { useState } from 'react'
import Header from '../../components/Header'
import styles from './style.less'

const UserInfo = props => {
  const { history } = props

  return (
    <div>
      <Header history={history} title={'个人中心'} />
    </div>
  )
}
export default UserInfo