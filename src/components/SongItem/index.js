import React from 'react'
import { connect } from 'dva'
import styles from './style.less'

const SongItem = props => {
  const {
    dispatch,
    songListDetail = {},
    history,
    num
  } = props

  const handleGoPlayer = () => {
    dispatch({
      type: 'player/changeShowMiniState',
    })
  }

  return (
    <div className={styles.songItem} onClick={() => { handleGoPlayer() }}>
      <div className={styles.num}>{num}</div>
      <div className={styles.textWrapper}>
        <div className={styles.title}>{songListDetail.title}</div>
        <div className={styles.singer}>{songListDetail.singer}
          {songListDetail.description ? <span>&nbsp;-&nbsp;{songListDetail.description}&nbsp;</span> : null}
        </div>
      </div>
      <div className={styles.iconWrapper}>
        <i className="iconfont icon-more" />
      </div>
    </div>
  )
}
export default connect(({ player }) => ({
  player
}))(SongItem)