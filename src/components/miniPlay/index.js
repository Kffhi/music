import React, { useState } from 'react'
import { Toast } from 'antd-mobile'
import styles from './style.less'

const MiniPlay = props => {
  const {
    history,
    showBig
  } = props
  const [palyingList, setPlayingList] = useState([])
  const [palying, setPalying] = useState({})

  const handleClick = () => {
    if (JSON.stringify === '{}') {
      Toast.info('播放列表为空')
    } else {
      showBig()
    }
  }

  return (
    <div className={styles.miniPlay} onClick={() => { handleClick() }}>
      {JSON.stringify(palyingList) !== '[]' ?
        <div className={`${styles.imgWrapper} ${styles.imgWrapperPlaying}`}>
          <img src="https://images.haiwainet.cn/20160428/1461790811999686.jpg" alt="" />
        </div>
        :
        <div className={styles.imgWrapper}>
          <img src="https://images.haiwainet.cn/20160428/1461790811999686.jpg" alt="" />
        </div>
      }
      <div className={styles.text}>
        <div className={styles.title}>
          {palying.title ? palying.title : '发现新音乐'}
        </div>
        <div className={styles.singer}>
          {palying.singer ? palying.singer : '歌手'}
        </div>
      </div>
      <div className={styles.iconWrapper}>
        <i className="iconfont icon-video-play" />
        <i className="iconfont icon-lesson_list" />
      </div>
    </div>
  )
}
export default MiniPlay;