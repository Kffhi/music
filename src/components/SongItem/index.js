import React from 'react'
import styles from './style.less'

const SongItem = props => {
  const {
    songListDetail,
    history,
    num
  } = props
  return (
    <div className={styles.songItem} onClick={() => { history.push('/player') }}>
      <div className={styles.num}>{num}</div>
      <div className={styles.textWrapper}>
        <div className={styles.title}>{songListDetail.title}</div>
        <div className={styles.singer}>{songListDetail.singer}</div>
      </div>
      <div className={styles.iconWrapper}>
        <i className="iconfont icon-more" />
      </div>
    </div>
  )
}
export default SongItem;