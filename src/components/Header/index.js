import React, { Fragment } from 'react'
import { connect } from 'dva'
import styles from './style.less'

const Header = props => {

  const { history, title, tab = 'NETEASE', dispatch } = props

  const goBack = () => {
    history.push('/home')
    dispatch({
      type: 'player/changePlatform',
      payLoad: {
        platform: 'NETEASE'
      }
    })
  }

  return (
    <Fragment>
      <div className={styles.header}>
        <div className={styles.goBack} onClick={() => { history.goBack(-1) }}>
          <i className="iconfont icon-app_back" />
        </div>
        <div className={styles.title} onClick={() => { goBack() }}>{title}</div>
        <div className={styles.search} onClick={() => { history.push(`/search/${tab}`) }}>
          <i className="iconfont icon-search" style={{ 'fontSize': '2.2rem' }} />
        </div>
      </div>
      <div style={{ "width": "100%", "height": "4.8rem" }}></div>
    </Fragment>
  )
}
export default connect(({ player }) => ({
  player
}))(Header)