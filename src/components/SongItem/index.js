import React from 'react'
import { connect } from 'dva'
import styles from './style.less'

const SongItem = props => {
  const {
    dispatch,
    songDetail = {},
    tab,
    playList,
    num,
  } = props

  const handleGoPlayer = () => {
    dispatch({
      type: 'player/changeShowMiniState',
    })
    switch (tab) {
      case 'NETEASE':
        dispatch({
          type: 'player/chageCurrentIndex',
          payLoad: {
            currentIndex: num - 1
          }
        })
        dispatch({
          type: 'player/changePlayList',
          payLoad: {
            playList: playList
          }
        })
        dispatch({
          type: 'player/changeSequenceList',
          payLoad: {
            sequenceList: playList
          }
        })
        break
      case 'TENCENT':
        // getTencentData()
        break
      case 'XIAMI':
        break
      default:
        return null
    }
  }

  return (
    <div className={styles.songItem} onClick={() => { handleGoPlayer() }}>
      <div className={styles.num}>{num}</div>
      <div className={styles.textWrapper}>
        <div className={styles.title}>{songDetail.title}</div>
        <div className={styles.singer}>{songDetail.singer}
          {songDetail.description ? <span>&nbsp;-&nbsp;{songDetail.description}&nbsp;</span> : null}
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