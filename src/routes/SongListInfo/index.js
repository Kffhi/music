import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'dva'
import { getNetSongListDetail } from '../../services/netease'
import Header from '../../components/Header'
import SongItem from '../../components/SongItem'
import Loading from '../../components/Loading'
import styles from './style.less'

const SongListInfo = props => {
  const {
    history,
    match,
  } = props
  const tabSub = match.params.tab
  const songListId = match.params.id
  const [songListDetail, setSongListDetail] = useState({})

  /** 初始化执行 */
  useEffect(() => {
    // 获取歌单详情
    switch (tabSub) {
      case 'NETEASE':
        getNetSongListDetail(songListId).then(res => {
          const newSongListDetail = { ...res.playlist }
          newSongListDetail.title = newSongListDetail.name
          newSongListDetail.url = newSongListDetail.coverImgUrl
          newSongListDetail.author = newSongListDetail.creator.nickname
          newSongListDetail.authorPic = newSongListDetail.creator.avatarUrl
          newSongListDetail.shareNum = newSongListDetail.shareCount
          newSongListDetail.commentNum = newSongListDetail.commentCount
          newSongListDetail.songList = newSongListDetail.tracks
          newSongListDetail.songList.forEach(item => {
            item.title = item.name
            item.singer = item.ar[0].name
            item.description = item.al.name
            item.picUrl = item.al.picUrl
            item.time = Number.parseInt((item.dt) / 1000)
          })
          setSongListDetail(newSongListDetail)
        })
        // getNetData()
        break
      case 'TENCENT':
        // getTencentData()
        break
      case 'XIAMI':
        break
      default:
        return null
    }
  }, [songListId, tabSub])

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
      <div className={styles.songList}>
        {songListDetail.songList ?
          songListDetail.songList.map((item, index) => (
            <SongItem
              tab={tabSub}
              songDetail={item}
              playList={songListDetail.songList}
              key={index}
              num={index + 1}
            />
          ))
          : null}
      </div>
    )
  }

  return (
    <div className={styles.songListInfo}>
      <Header history={history} title={'歌单详情'}></Header>
      {JSON.stringify(songListDetail) !== '{}' ?
        <Fragment>
          {renderDetail()}
          {renderSongList()}
        </Fragment> :
        <Loading />
      }
    </div>
  )
}
export default connect(({ player }) => ({
  player
}))(SongListInfo)