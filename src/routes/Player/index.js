import React, { useState, Fragment } from 'react'
import styles from './style.less'

const Player = props => {
  const {
    history
  } = props
  const [showLyric, setShowLyric] = useState(false)

  const renderHeader = () => {
    return (
      <Fragment>
        <div className={styles.header}>
          <div className={styles.goBack} onClick={() => { history.goBack(-1) }}>
            <i className="iconfont icon-app_back" />
          </div>
          <div className={styles.text}>
            <div className={styles.title}>虹の彼方 (feat. Lasah)</div>
            <div className={styles.singer}>
              小瀬村晶 / lasah
              <i className="iconfont icon-jump" />
            </div>
          </div>
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
          <div className={styles.imgWrapper}>
            <img src="https://i.ytimg.com/vi/KIL_kmtcNcU/maxresdefault.jpg" alt=""/>
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
          <div className={styles.time}>00:00</div>
          <div className={styles.line}></div>
          <div className={styles.time}>03:43</div>
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
          <div className={styles.playIconWrapper}>
            {/* <i className="iconfont icon-video-pause" /> */}
            <i className="iconfont icon-video-play" />
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

  return (
    <div className={styles.player}>
      <div className={styles.backgroundWrapper}>
        <img src="https://i.ytimg.com/vi/KIL_kmtcNcU/maxresdefault.jpg" alt="" />
      </div>
      <div className={styles.containerWrapper}>
        {renderHeader()}
        {renderPicAndLyric()}
        {renderBottom()}
      </div>
    </div>
  )
}
export default Player;