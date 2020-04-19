import React, { useState } from 'react'
import className from 'classnames';
import { Toast } from 'antd-mobile'
import styles from './style.less'

const MiniPlay = props => {
  const {
    history,
    showBig,
    playSong,
    isPlay,
    changePlayState
  } = props

  const handleClick = () => {
    if (!playSong) {
      Toast.info('播放列表为空')
    } else {
      showBig()
    }
  }

  return (
    <div className={styles.miniPlay} onClick={() => { handleClick() }}>
      <div className={className(styles.imgWrapper, { [styles.imgWrapperPlaying]: isPlay })}>
        <img src={playSong ? playSong.picUrl : 'https://images.haiwainet.cn/20160428/1461790811999686.jpg'} alt="" />
      </div>
      <div className={styles.text}>
        <div className={styles.title}>
          {playSong ? playSong.name : '发现新音乐'}
        </div>
        <div className={styles.singer}>
          {playSong ? playSong.singer : '歌手'}
        </div>
      </div>
      <div className={styles.iconWrapper}>
        <div onClick={e => { changePlayState(e) }}>
          {isPlay ?
            <i className="iconfont icon-video-pause" />
            :
            <i className="iconfont icon-video-play" />
          }
        </div>
        <i className="iconfont icon-lesson_list" />
      </div>
    </div>
  )
}
export default MiniPlay;