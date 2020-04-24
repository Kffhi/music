import React, { useState } from 'react'
import className from 'classnames';
import { Toast } from 'antd-mobile'
import styles from './style.less'

const MiniPlay = props => {
  const {
    showBig,
    playSong,
    isPlay,
    changePlayState,
    showPlayList
  } = props

  console.log(playSong)

  const handleClick = () => {
    if (playSong !== undefined && JSON.stringify(playSong) !== '{}') {
      Toast.info('播放列表为空')
    } else {
      showBig()
    }
  }

  return (
    <div className={styles.miniPlay} onClick={() => { handleClick() }}>
      <div className={className(styles.imgWrapper, { [styles.imgWrapperPlaying]: isPlay })}>
        <img src={playSong !== undefined ? playSong.picUrl : 'https://images.haiwainet.cn/20160428/1461790811999686.jpg'} alt="" />
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
        <i className="iconfont icon-lesson_list" onClick={e => showPlayList(e)} />
      </div>
    </div>
  )
}
export default MiniPlay;