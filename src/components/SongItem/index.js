import React from 'react'
import { connect } from 'dva'
import { getNetSongDetail } from '../../services/netease'
import styles from './style.less'

const SongItem = props => {
  const {
    dispatch,
    songDetail = {},
    tab,
    playList,
    num,
  } = props

  const handleGoPlayer = async () => {
    dispatch({
      type: 'player/changeShowMiniState',
    })
    switch (tab) {
      case 'NETEASE':
        const newPlayList = [...playList]
        await getNetSongDetail(songDetail.id).then(res => {
          newPlayList.forEach(item => {
            if (item.id === songDetail.id) {
              item.url = res.data[0].url
            }
          })
        })
        dispatch({
          type: 'player/chageCurrentIndex',
          payLoad: {
            currentIndex: num - 1
          }
        })
        dispatch({
          type: 'player/changePlayList',
          payLoad: {
            playList: newPlayList
          }
        })
        dispatch({
          type: 'player/changeSequenceList',
          payLoad: {
            sequenceList: newPlayList
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