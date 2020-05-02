import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'dva'
import className from 'classnames'
import { getNetSongListDetail } from '../../services/netease'
import { getLoveSong, saveLoveSongList, deleteLoveSongList, getLoveSongList } from '../../utils/cache'
import Header from '../../components/Header'
import SongItem from '../../components/SongItem'
import Loading from '../../components/Loading'
import Information from '../../components/Information'
import styles from './style.less'

const SongListInfo = props => {
  const {
    history,
    match,
    dispatch,
    player
  } = props
  const tabSub = match.params.tab
  const songListId = match.params.id
  const [songListDetail, setSongListDetail] = useState({})
  const [modal, setModal] = useState(false)
  const [isLoveSongList, setIsLoveSongList] = useState(false)

  /** 初始化执行 */
  useEffect(() => {
    // 获取歌单详情
    switch (tabSub) {
      case 'NETEASE':
        if (songListId !== '000000') {
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
        } else {
          let loveSong = {}
          loveSong.songList = getLoveSong()
          loveSong.url = 'https://kffhi.com/public/images/end/20200424.jpg'
          loveSong.title = '我喜欢的音乐'
          loveSong.authorPic = 'https://kffhi.com/public/images/end/logo.jpg'
          loveSong.author = 'Kffhi'
          loveSong.description = '这里是我喜欢的音乐列表\n采用的localStorage存储\n非常的炫酷\n\n\n瞧！这是个喜庆之夜\n在最近这些寂寞的年头\n一群天使，收拢翅膀\n遮好面纱，掩住泪流\n坐在一个剧场\n观看一出希望与恐怖之剧\n此时乐队间间断断\n奏出天外之曲\n装扮成上帝的一群小丑\n叽叽咕咕，自言自语\n从舞台这头飞到那头——\n他们只是木偶，来来去去\n全由许多无形物支配\n无形物不断把场景变换\n从它们秃鹰的翅膀内\n拍出看不见的灾难！\n那出杂剧——哦，请相信\n将不会被人遗忘！\n因为它那被抓不住它的人\n永远在追求的幻想\n因为一个永远旋转的怪圈\n最后总是转回原处\n因为情节之灵魂多是罪愆\n充满疯狂，充满恐怖\n可看哟，就在那群小丑之中\n闯进了一个蠕动的怪物！\n那可怕的怪物浑身血红\n从舞台角落扭动而出！\n它扭动——扭动！真是可怕\n小丑都成了它的美餐\n天使们呜咽，见爬虫毒牙正把淋淋人血浸染\n熄灭——熄灭——熄灭灯光！\n罩住每一个哆嗦的影子\n大幕像一块裹尸布一样\n倏然落下像暴风骤雨\n这时脸色苍白的天使\n摘下面纱，起身，肯定\n这是一幕叫《人》的悲剧\n而主角是那征服者爬虫'
          setSongListDetail(loveSong)
        }
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
  }, [player, songListId, tabSub])

  useEffect(() => {
    const isLove = () => {
      const loveSongList = getLoveSongList()
      return loveSongList.some(item => {
        if (String(item.id) === songListId) {
          return true
        } else {
          return false
        }
      })
    }
    if (isLove()) {
      setIsLoveSongList(true)
    } else {
      setIsLoveSongList(false)
    }
  }, [songListId])

  const changeLoveState = () => {
    if (isLove()) {
      deleteLoveSongList(songListDetail)
      setIsLoveSongList(false)
    } else {
      saveLoveSongList(songListDetail)
      setIsLoveSongList(true)
    }
    dispatch({
      type: 'player/changeLovaSongList',
      payLoad: {
        loveSongList: getLoveSongList()
      }
    })
  }

  const isLove = () => {
    const loveSongList = getLoveSongList()
    return loveSongList.some(item => {
      if (String(item.id) === songListId) {
        return true
      } else {
        return false
      }
    })
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
                <div className={styles.description} onClick={() => { setModal(true) }}>
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
              <div className={className(styles.box, { [styles.isLove]: isLoveSongList })} onClick={() => { changeLoveState() }}>
                {isLoveSongList ?
                  <i className="iconfont icon-loveit" /> :
                  <i className="iconfont icon-shoucang" />
                }
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
      <Information
        modal={modal}
        info={songListDetail}
        handleClose={() => { setModal(false) }}
      />
      <Header tab={tabSub} history={history} title={'歌单详情'}></Header>
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