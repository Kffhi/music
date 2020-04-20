import React, { useState, Fragment, useEffect, useRef } from 'react'
import className from 'classnames'
import { connect } from 'dva'
import { getNetSongDetail } from '../../services/netease'
import Toast from '../../components/Toast'
import MiniPlay from '../../components/miniPlay'
import { format, shuffle } from '../../utils/format'
import styles from './style.less'

const Player = props => {
  const {
    history,
    dispatch,
    player
  } = props
  const audioRef = useRef()
  const isFirstLoad = useRef(true)
  const [currentTime, setCurrentTime] = useState('0:00')
  const [showLyric, setShowLyric] = useState(false)
  const [isPlay, setIsPlay] = useState(false)
  const [offsetWidth, setOffsetWidth] = useState(0)
  const [playMode, setPlayMode] = useState(1)
  const [playSong, setPlaySong] = useState({})
  const currentIndex = player.currentIndex

  useEffect((() => {
    if (playMode !== 3) {
      setPlaySong(player.playList[currentIndex])
    }
  }), [currentIndex, playMode, player.playList])

  useEffect((() => {
    if (player.playUrl.length !== 0 && player.showMini === false && isFirstLoad.current) {
      setIsPlay(true)
      audioRef.current.play()
    }
  }), [player.playUrl, player.showMini])

  // 期望：当playSong改变调用播放方法
  // 问题：第一次render初始化时也会调用
  // 解决方式：通过useRef避开
  // useEffect(() => {
  //   if (!isFirstLoad.current && player.playUrl.length !== 0) {
  //     setIsPlay(true)
  //     audioRef.current.play()
  //   }
  // }, [playSong, player.playUrl.length])

  const changeCurrentIndex = index => {
    dispatch({
      type: 'player/chageCurrentIndex',
      payLoad: {
        currentIndex: index
      }
    })
  }

  const getPlayUrl = async song => {
    await getNetSongDetail(song.id).then(res => {
      if (res.data[0].url === null) {
        dispatch({
          type: 'player/changePlayUrl',
          payLoad: {
            playUrl: ''
          }
        })
        setIsPlay(false)
        return (Toast.info('啊哦，这首歌拿不到播放歌曲地址(；′⌒`)'))
      } else {
        dispatch({
          type: 'player/changePlayUrl',
          payLoad: {
            playUrl: res.data[0].url
          }
        })
      }
    })
  }

  const handleClickProgessBar = e => {
    e.stopPropagation()
    if (player.playUrl.length === 0) {
      setIsPlay(false)
      return (Toast.info('没有播放地址'))
    } else {
      setOffsetWidth(e.nativeEvent.offsetX / 10)
      audioRef.current.currentTime = (e.nativeEvent.offsetX / 10) / 25 * playSong.time
      audioRef.current.play()
      setIsPlay(true)
    }
  }

  const handleDotTouchStart = e => {
    if (player.playUrl.length === 0) {
      setIsPlay(false)
      return (Toast.info('没有播放地址'))
    } else {
      e.stopPropagation()
      audioRef.current.pause()
    }
  }

  const handleDotTouchMove = e => {
    if (player.playUrl.length === 0) {
      setIsPlay(false)
      return (Toast.info('没有播放地址'))
    } else {
      e.stopPropagation()
      let touchOffset = e.nativeEvent.touches[0].pageX / 10 - 6.1 // 6.1为进度条为0的位置dotWrapper的e.nativeEvent.touches[0].pageX值
      touchOffset = touchOffset > 25 ? 25 : touchOffset
      setOffsetWidth(touchOffset)
      audioRef.current.currentTime = touchOffset / 25 * playSong.time
    }
  }

  const handleDotTouchEnd = e => {
    if (player.playUrl.length === 0) {
      setIsPlay(false)
      return (Toast.info('没有播放地址'))
    } else {
      e.stopPropagation()
      audioRef.current.play()
      setIsPlay(true)
    }
  }

  const handleChangePlayState = e => {
    e.stopPropagation()
    if (player.playUrl.length !== 0) {
      if (isPlay) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlay(!isPlay)
    } else {
      Toast.info('没有播放地址')
    }
  }

  const handleChangeCurrentTime = () => {
    setOffsetWidth((audioRef.current.currentTime / playSong.time) * 25)
    setCurrentTime(format(audioRef.current.currentTime))
  }

  const handleShowMini = () => {
    isFirstLoad.current = false
    dispatch({
      type: 'player/changeShowMiniState',
    })
  }

  const nextSong = e => {
    e.stopPropagation()
    isFirstLoad.current = false
    if (playMode === 2) {
      audioRef.current.currentTime = 0;
      setIsPlay(true)
      audioRef.current.play()
    } else {
      if (playMode === 1) {
        console.log('顺序')
        if (currentIndex < player.playList.length - 1) {
          changeCurrentIndex(currentIndex + 1)
          getPlayUrl(player.playList[currentIndex + 1])
        } else {
          changeCurrentIndex(0)
          getPlayUrl(player.playList[0])
        }
      } else {
        console.log('随机')
        console.log(currentIndex, player.playList)
        if (currentIndex < player.playList.length - 1) {
          changeCurrentIndex(currentIndex + 1)
          getPlayUrl(player.playList[currentIndex + 1])
          setPlaySong(player.playList[currentIndex + 1])
        } else {
          changeCurrentIndex(0)
          getPlayUrl(player.playList[0])
          setPlaySong(player.playList[0])
        }
      }
    }
  }

  const prevSong = e => {
    e.stopPropagation()
    isFirstLoad.current = false
    if (playMode === 2) {
      audioRef.current.currentTime = 0
      setIsPlay(true)
      audioRef.current.play()
    } else {
      if (playMode === 1) {
        if (currentIndex > 0) {
          changeCurrentIndex(currentIndex - 1)
          getPlayUrl(player.playList[currentIndex - 1])
        } else {
          changeCurrentIndex(player.playList.length - 1)
          getPlayUrl(player.playList[player.playList.length - 1])
        }
      } else {
        if (currentIndex > 0) {
          changeCurrentIndex(currentIndex - 1)
          getPlayUrl(player.playList[currentIndex - 1])
          setPlaySong(player.playList[currentIndex - 1])
        } else {
          changeCurrentIndex(player.playList.length - 1)
          getPlayUrl(player.playList[player.playList.length - 1])
          setPlaySong(player.playList[player.playList.length - 1])
        }
      }
    }
  }

  const handleChangePlayMode = async () => {
    // 1:顺序播放 2.单曲循环 3.随机播放
    // 数字表示当前状态，但是点击后进入下一状态，所以实际上playList应按下一状态的播放逻辑修改
    playMode === 3 ? setPlayMode(1) : setPlayMode(playMode + 1)
    switch (playMode) {
      case 1:
        dispatch({
          type: 'player/chageCurrentIndex',
          payLoad: {
            currentIndex: 0
          }
        })
        await dispatch({
          type: 'player/changePlayList',
          payLoad: {
            playList: [playSong]
          }
        })
        break
      case 2:
        const newSequenceList = [...player.sequenceList]
        const randomList = shuffle(newSequenceList)
        dispatch({
          type: 'player/changePlayList',
          payLoad: {
            playList: [...randomList]
          }
        })
        break
      case 3:
        const loopList = player.sequenceList
        dispatch({
          type: 'player/changePlayList',
          payLoad: {
            playList: [...loopList]
          }
        })
        break
      default:
        return undefined
    }
  }

  const renderHeader = () => {
    return (
      <Fragment>
        <div className={styles.header}>
          <div className={styles.goBack} onClick={() => { handleShowMini() }}>
            <i className="iconfont icon-arrow-down" />
          </div>
          {JSON.stringify(playSong) !== '{}' ?
            <div className={styles.text} onClick={() => { history.push('/singerinfo'); handleShowMini() }}>
              <div className={styles.title}>{playSong ? playSong.name : '发现新音乐'}</div>
              <div className={styles.singer}>
                {playSong ? playSong.singer : '歌手'}
                <i className="iconfont icon-jump" />
              </div>
            </div>
            : null}
        </div>
        <div style={{ "width": "100%", "height": "4.8rem" }}></div>
      </Fragment>
    )
  }

  const renderPicAndLyric = () => {
    return (
      <div className={styles.picAndLyricWrapper}>
        {showLyric ?
          <div className={styles.lyricWrapeer}></div>
          :
          <div className={className(styles.imgWrapper, {
            [styles.imgWrapperPlaying]: isPlay
          })}>
            <img src={playSong ? playSong.picUrl : 'https://images.haiwainet.cn/20160428/1461790811999686.jpg'} alt="" />
          </div>
        }
      </div>
    )
  }

  const renderBottom = () => {
    return (
      <div className={styles.bottomWrapper}>
        <div className={styles.iconBar}>
          <div className={styles.iconWrapper}>
            <i className="iconfont icon-shoucang" />
          </div>
          <div className={styles.iconWrapper}>
            <i className="iconfont icon-lesson_list_download" />
          </div>
          <div className={styles.iconWrapper}>
            <i className="iconfont icon-pinglun" />
            <span className={styles.commentNum}>567</span>
          </div>
          <div className={styles.iconWrapper}>
            <i className="iconfont icon-fenxiang" />
          </div>
          <div className={styles.iconWrapper}>
            <i className="iconfont icon-Moreoptionshorizon" />
          </div>
        </div>
        <div className={styles.progressBar}>
          <div className={`${styles.time} ${styles.left}`}>{currentTime}</div>
          <div className={styles.backLine} onClick={e => { handleClickProgessBar(e) }}>
            <div className={styles.prograssLine} style={{ "width": offsetWidth + 'rem' }}></div>
            {/* 使用dotWrapper增大能touch的面积 */}
            <div className={styles.dotWrapper} style={{ "left": offsetWidth - 0.9 + 'rem' }} onTouchEnd={e => { handleDotTouchEnd(e) }} onTouchMove={e => { handleDotTouchMove(e) }} onTouchStart={e => { handleDotTouchStart(e) }}>
              <div className={styles.dot}>
                <div className={styles.dotColor}></div>
              </div>
            </div>
          </div>
          <div className={`${styles.time} ${styles.right}`}>{playSong ? format(playSong.time) : '0:00'}</div>
        </div>
        <div className={styles.playCtrlBar}>
          <div className={styles.ctrlIconWrapper} onClick={() => { handleChangePlayMode() }}>
            {playMode === 1 ?
              <i className="iconfont icon-round-play" /> :
              playMode === 2 ?
                <i className="iconfont icon-single-play" /> :
                <i className="iconfont icon-random-play" />}
          </div>
          <div className={styles.ctrlIconWrapper} onClick={e => { prevSong(e) }}>
            <i className="iconfont icon-voice-last" />
          </div>
          <div className={styles.playIconWrapper} onClick={e => { handleChangePlayState(e) }}>
            {isPlay ?
              <i className="iconfont icon-video-pause" />
              :
              <i className="iconfont icon-video-play" />
            }
          </div>
          <div className={styles.ctrlIconWrapper} onClick={e => { nextSong(e) }}>
            <i className="iconfont icon-voice-next" />
          </div>
          <div className={styles.ctrlIconWrapper}>
            <i className="iconfont icon-lesson_list" />
          </div>
        </div>
      </div>
    )
  }

  const renderAudio = () => {
    return (
      <audio src={player.playUrl} ref={audioRef} onTimeUpdate={() => { handleChangeCurrentTime() }} onEnded={e => { nextSong(e) }}></audio>
    )
  }

  return (
    <Fragment>
      {player.showMini ?
        <MiniPlay
          history={history}
          showBig={() => { handleShowMini() }}
          playSong={playSong}
          isPlay={isPlay}
          changePlayState={handleChangePlayState}
        /> :
        <div className={styles.player}>
          <div className={styles.backgroundWrapper}>
            <img src={playSong ? playSong.picUrl : 'https://www.kffhi.com/public/images/portfolio/4.png'} alt="" />
          </div>
          <div className={styles.containerWrapper}>
            {renderHeader()}
            {renderPicAndLyric()}
            {renderBottom()}
          </div>
        </div>
      }
      {player.playUrl.length !== 0 ? renderAudio() : null}
    </Fragment>
  )
}
export default connect(({ player }) => ({
  player
}))(Player);