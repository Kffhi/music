import React, { useState, useEffect } from 'react'
import { getNetSongListDetail } from '../../services/netease'
import Header from '../../components/Header'
import MiniPlay from '../../components/miniPlay'
import styles from './style.less'

const SongListInfo = props => {
  const {
    history
  } = props
  const [songListDetail, setSongListDetail] = useState({})

  /** 初始化执行 */
  useEffect(() => {
    // 获取歌单详情
    getSongListDetail()
  }, [])

  const getSongListDetail = () => {
    getNetSongListDetail().then(res => { setSongListDetail(res.data) })
  }

  const renderDetail = () => {
    return (
      <div className={styles.detail}>
        <div className={styles.picBox}>
          <img src={songListDetail.url} alt="" />
        </div>
        <div className={styles.containerWrapper}>
          <div className={styles.container}>
            <div className={styles.textWrapper}>
              <div className={styles.picWrapper}>
                <img src={songListDetail.url} alt="" />
              </div>
              <div className={styles.text}>
                <div className={styles.title}>{songListDetail.title}</div>
                <div className={styles.author}>
                  <div className={styles.userPic}>
                    <img src={songListDetail.authorPic} alt="" />
                  </div>
                  <div className={styles.name}>{songListDetail.author}</div>
                </div>
                <div className={styles.description}>
                  <div className={styles.descriptionText}>{songListDetail.description}</div>
                  <i className="iconfont icon-jump" />
                </div>
              </div>
            </div>
            <div className={styles.operation}>
              <div className={styles.box}>
                <i className="iconfont icon-pinglun" />
                <div className={styles.boxText}>{songListDetail.commentNum}</div>
              </div>
              <div className={styles.box}>
                <i className="iconfont icon-fenxiang" />
                <div className={styles.boxText}>{songListDetail.shareNum}</div>
              </div>
              <div className={styles.box}>
                <i className="iconfont icon-video-play" />
                <div className={styles.boxText}>播放</div>
              </div>
              <div className={styles.box}>
                <i className="iconfont icon-shoucang" />
                <div className={styles.boxText}>收藏</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderSongList = () => {
    return (
      <div className={styles.songList}>歌曲列表</div>
    )
  }

  return (
    <div className={styles.songListInfo}>
      <Header history={history} title={'歌单详情'}></Header>
      {renderDetail()}
      {renderSongList()}
      <MiniPlay />
    </div>
  )
}
export default SongListInfo