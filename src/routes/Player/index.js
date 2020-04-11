import React, { useState, Fragment, useEffect, useRef } from 'react'
import className from 'classnames';
import Toast from '../../components/Toast'
import { format } from '../../utils/format'
import styles from './style.less'

const Player = props => {
  const {
    history,
    currentIndex = 0
  } = props
  const audioRef = useRef()
  const progressBarRef = useRef()
  const dotRef = useRef()
  const [currentTime, setCurrentTime] = useState('0:00')
  const [showLyric, setShowLyric] = useState(false)
  const [isPlay, setIsPlay] = useState(false)
  const [offsetWidth, setOffsetWidth] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  // const [playSong, setPlaySong] = useState({})
  const playSong = {
    "name": "虹の彼方 (feat. Lasah)",
    "singer": "小瀬村晶 / lasah",
    "picUrl": "https://i.ytimg.com/vi/KIL_kmtcNcU/maxresdefault.jpg",
    "url": "https://www.kffhi.com/public/images/audio/test.mp3",
    "time": "446"
  }
  const playList = [
    {
      "name": "虹の彼方 (feat. Lasah)",
      "singer": "小瀬村晶 / lasah",
      "picUrl": "https://i.ytimg.com/vi/KIL_kmtcNcU/maxresdefault.jpg",
      "url": "https://www.kffhi.com/public/images/audio/test.mp3",
      "time": "446"
    },
    {
      "name": "baby I love you",
      "singer": "Shiggy Jr.",
      "picUrl": "https://i.ytimg.com/vi/suTPx6M8vTQ/hqdefault.jpg",
      "url": "https://www.kffhi.com/public/images/audio/1.mp3",
      "time": "03:44"
    },
    {
      "name": "Enough",
      "singer": "Maisy Kay",
      "picUrl": "https://i.kfs.io/album/global/7241972,0v1/fit/500x500.jpg",
      "url": "https://www.kffhi.com/public/images/audio/2.mp3",
      "time": "04:34"
    },
    {
      "name": "长恨歌",
      "singer": "五色石南叶",
      "picUrl": "https://p2.music.126.net/0rDEqHG2be0xmPs8AiAS5A==/2545369418305520.jpg",
      "url": "https://www.kffhi.com/public/images/audio/3.mp3",
      "time": "02:57"
    }
  ]
  let touchOffset = 0

  const handleClickProgessBar = e => {
    setOffsetWidth(e.nativeEvent.offsetX / 10)
    audioRef.current.currentTime = (e.nativeEvent.offsetX / 10) / 25 * playSong.time
    audioRef.current.play()
    setIsPlay(true)
  }

  const handleDotTouchStart = e => {
    setTouchStart(e.nativeEvent.touches[0].pageX / 10)
    console.log('touchStart', touchStart)
    audioRef.current.pause()
  }

  const handleDotTouchMove = e => {
    console.log('touchMove', touchStart)
    touchOffset = e.nativeEvent.touches[0].pageX / 10 - touchStart
    setOffsetWidth(touchOffset > 25 ? 25 : touchOffset)
    audioRef.current.currentTime = touchOffset / 25 * playSong.time
  }

  const handleDotTouchEnd = () => {
    audioRef.current.play()
    setIsPlay(true)
  }

  const handleChangePlayState = () => {
    if (isPlay) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlay(!isPlay)
  }

  const handleChangeCurrentTime = () => {
    setOffsetWidth((audioRef.current.currentTime / playSong.time) * 25)
    setCurrentTime(format(audioRef.current.currentTime))
  }

  const renderHeader = () => {
    return (
      <Fragment>
        <div className={styles.header}>
          <div className={styles.goBack} onClick={() => { history.goBack(-1) }}>
            <i className="iconfont icon-app_back" />
          </div>
          {JSON.stringify(playSong) !== '{}' ?
            <div className={styles.text}>
              <div className={styles.title}>{playSong.name}</div>
              <div className={styles.singer}>
                {playSong.singer}
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
            <img src={playSong.picUrl} alt="" />
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
          <div className={styles.backLine} ref={progressBarRef} onClick={e => { handleClickProgessBar(e) }}>
            <div className={styles.prograssLine} style={{ "width": offsetWidth + 'rem' }}></div>
            <div className={styles.dot} style={{ "left": offsetWidth - 0.3 + 'rem' }} ref={dotRef} onTouchEnd={() => { handleDotTouchEnd() }} onTouchMove={e => { handleDotTouchMove(e) }} onTouchStart={e => { handleDotTouchStart(e) }}>
              <div className={styles.dotColor}></div>
            </div>
          </div>
          <div className={`${styles.time} ${styles.right}`}>{format(playSong.time)}</div>
        </div>
        <div className={styles.playCtrlBar}>
          <div className={styles.ctrlIconWrapper}>
            <i className="iconfont icon-random-play" />
            {/* <i className="iconfont icon-round-play" />
            <i className="iconfont icon-single-play" /> */}
          </div>
          <div className={styles.ctrlIconWrapper}>
            <i className="iconfont icon-voice-last" />
          </div>
          <div className={styles.playIconWrapper} onClick={() => { handleChangePlayState() }}>
            {isPlay ?
              <i className="iconfont icon-video-pause" />
              :
              <i className="iconfont icon-video-play" />
            }
          </div>
          <div className={styles.ctrlIconWrapper}>
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
      <audio src={playSong.url} ref={audioRef} onTimeUpdate={() => { handleChangeCurrentTime() }}></audio>
    )
  }

  return (
    <div className={styles.player}>
      <div className={styles.backgroundWrapper}>
        <img src={playSong.picUrl} alt="" />
      </div>
      <div className={styles.containerWrapper}>
        {renderHeader()}
        {renderPicAndLyric()}
        {renderBottom()}
        {renderAudio()}
      </div>
    </div>
  )
}
export default Player;