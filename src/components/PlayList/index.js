import React from 'react'
import { connect } from 'dva'
import { getNetSongDetail } from '../../services/netease'
import { getTencentSongDetail } from '../../services/tencent'
import className from 'classnames'
import Toast from '../../components/Toast'
import { Modal } from 'antd-mobile'
import styles from './style.less'

const PlayList = props => {
  const {
    modal,
    handleClose,
    playList,
    playSong,
    currentIndex,
    playMode,
    platform,
    dispatch,
    player,
    clearList
  } = props

  const handleGoPlayer = async (item, index) => {
    handleClose()
    if (player.showMini) {
      dispatch({
        type: 'player/changeShowMiniState',
      })
    }
    let newPlayUrl = ''
    switch (platform) {
      case 'NETEASE':
        await getNetSongDetail(item.id).then(res => {
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
        await getTencentSongDetail(item.mid).then(res => {
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
        currentIndex: index
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
    <div className={styles.infrmationWrapper}>
      <Modal
        visible={modal}
        animationType="slide-up"
        popup
        onClose={() => { handleClose() }}
      >
        <div className={styles.songsWrapper}>
          <div className={styles.header}>
            <div>
              {playMode === 1 ?
                <div>
                  <i className="iconfont icon-round-play" />
                  <span>列表循环</span>
                </div> :
                playMode === 2 ?
                  <div>
                    <i className="iconfont icon-single-play" />
                    <span>单曲循环</span>
                  </div> :
                  <div>
                    <i className="iconfont icon-random-play" />
                    <span>随机播放</span>
                  </div>
              }
            </div>
            <div onClick={() => { clearList() }}>
              <span>清空</span>
              <i className="iconfont icon-app_delete" />
            </div>
          </div>
          <div className={styles.songs}>
            {playList && playSong ?
              playList.map((item, index) => (
                <div
                  className={className(styles.songItem, { [styles.songItemPlaying]: playSong.id === item.id })}
                  onClick={() => { handleGoPlayer(item, index) }}
                  key={index}
                >
                  <div className={className(styles.num, { [styles.numPlaying]: playSong.id === item.id })}>{index + 1}</div>
                  <div className={styles.textWrapper}>
                    <div className={styles.title}>{item.title}</div>
                    <div className={className(styles.singer, { [styles.singerPlaying]: playSong.id === item.id })}>{item.singer}
                      {item.description ? <span>&nbsp;-&nbsp;{item.description}&nbsp;</span> : null}
                    </div>
                  </div>
                  <div className={styles.iconWrapper}>
                    <i className="iconfont icon-app_close" />
                  </div>
                </div>
              ))
              : null}
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default connect(({ player }) => ({
  player
}))(PlayList)