import React from 'react'
import { connect } from 'dva'
import { getNetSongDetail } from '../../services/netease'
import { getTencentSongDetail } from '../../services/tencent'
import Toast from '../../components/Toast'
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
    let newPlayUrl = ''
    switch (tab) {
      case 'NETEASE':
        await getNetSongDetail(songDetail.id).then(res => {
          newPlayUrl = res.data[0].url
        })
        dispatch({
          type: 'player/changePlayUrl',
          payLoad: {
            playUrl: newPlayUrl
          }
        })
        dispatch({
          type: 'player/changePlayPlatform',
          payLoad: {
            playPlatform: 'NETEASE'
          }
        })
        break
      case 'TENCENT':
        await getTencentSongDetail(songDetail.mid).then(res => {
          if (res.response.req_0.data.midurlinfo[0].purl === "") {
            newPlayUrl = ""
            return (Toast.info('啊哦，这首歌拿不到播放歌曲地址(；′⌒`)'))
          } else {
            newPlayUrl = 'http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/' + res.response.req_0.data.midurlinfo[0].purl
          }
        })
        dispatch({
          type: 'player/changePlayUrl',
          payLoad: {
            playUrl: newPlayUrl
          }
        })
        dispatch({
          type: 'player/changePlayPlatform',
          payLoad: {
            playPlatform: 'TENCENT'
          }
        })
        break
      case 'XIAMI':
        break
      default:
        return null
    }
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
        <i onClick={e => { e.stopPropagation(); Toast.info('详细操作静待秃头开发的努力吧~') }} className="iconfont icon-more" />
      </div>
    </div>
  )
}
export default connect(({ player }) => ({
  player
}))(SongItem)