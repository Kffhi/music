import React, { useState } from 'react'
import styles from './style.less'

const Header = props => {

  const { history, title } = props

  return (
    <div className={styles.header}>
      <div className={styles.goBack} onClick={() => { history.goBack(-1) }}>
        <i className="iconfont icon-app_back" />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.search} onClick={()=>{history.push('/search')}}>
          <i className="iconfont icon-search" style={{ 'fontSize': '2.2rem' }} />
        </div>
    </div>
  )
}
export default Header