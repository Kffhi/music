import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'dva/router'
import { Tabs, Carousel } from 'antd-mobile'
import { getNetBanner, getNetSongList } from '../../services/netease'
import { getTencentBanner, getTencentSongList } from '../../services/tencent'
import { getXiamiBanner, getXiamiSongList } from '../../services/xiami'
import SongList from '../../components/SongList'
import MiniPlay from '../../components/miniPlay'
import Accordion from '../../components/Accordion'
import SongListItem from '../../components/SongListItem'
import styles from './style.less'
// class Home extends Component {

const Home = props => {
  const { history } = props
  const [banner, setBanner] = useState([])
  const [songList, setSongList] = useState([])
  const tabs = [
    { title: '我的', sub: 'MY_MUSIC' },
    { title: '网易云音乐', sub: 'NETEASE' },
    { title: 'QQ音乐', sub: 'TENCENT' },
    { title: '虾米音乐', sub: 'XIAMI' },
  ]
  const mySongList = [
    {
      'title': '我喜欢的音乐',
      'url': 'https://kffhi.com/public/images/end/myLoveSongList.png',
      'num': 23,
      'author': ''
    },
    {
      'title': '旧事甚欠',
      'url': 'https://p.qpic.cn/music_cover/PiajxSqBRaEISibhtdxpkLprufpT7OzywmZksgnxoguZwkZxZgIsZYug/300?n=1',
      'num': 424,
      'author': ''
    },
    {
      'title': '华语&粤语&日语&韩语',
      'url': 'https://p.qpic.cn/music_cover/xy585mIRLoGjBb9SibEqA5iaSkRbkvAnJvUzL2EdBAsvCVRLOQkt82Zg/300?n=1',
      'num': 67,
      'author': ''
    }
  ]

  const myCollList = [
    {
      'title': 'ACG伤感宣泄向曲目精选',
      'url': 'https://p.qpic.cn/music_cover/roDbe9tS2lUqucickjGhXicHViblIPcaHWPepdpTiaHAQ4Cic4pLfvk738w/300?n=1',
      'num': 122,
      'author': '花痞'
    },
    {
      'title': 'Hardcore: 黑暗沉浸的极致快感',
      'url': 'https://p.qpic.cn/music_cover/sv5U6cpoN0dCLVrs9ibkz75fPLICuJNYVZKAmoL4q2EoQYia9xzcR4qg/300?n=1',
      'num': 100,
      'author': '北鹤'
    },
    {
      'title': '躁动引力 • 电瘾患者的深度迷梦',
      'url': 'https://p.qpic.cn/music_cover/4J0DcvEPJgEWsf9WgbblMDUdHBPu83H7zO99QL5mNfP1um5LibuwEzg/300?n=1',
      'num': 298,
      'author': '大师傅'
    },
    {
      'title': 'ACG伤感宣泄向曲目精选',
      'url': 'https://p.qpic.cn/music_cover/roDbe9tS2lUqucickjGhXicHViblIPcaHWPepdpTiaHAQ4Cic4pLfvk738w/300?n=1',
      'num': 122,
      'author': '花痞'
    },
    {
      'title': 'Hardcore: 黑暗沉浸的极致快感',
      'url': 'https://p.qpic.cn/music_cover/sv5U6cpoN0dCLVrs9ibkz75fPLICuJNYVZKAmoL4q2EoQYia9xzcR4qg/300?n=1',
      'num': 100,
      'author': '北鹤'
    },
    {
      'title': '躁动引力 • 电瘾患者的深度迷梦',
      'url': 'https://p.qpic.cn/music_cover/4J0DcvEPJgEWsf9WgbblMDUdHBPu83H7zO99QL5mNfP1um5LibuwEzg/300?n=1',
      'num': 298,
      'author': '大师傅'
    },
    {
      'title': 'ACG伤感宣泄向曲目精选',
      'url': 'https://p.qpic.cn/music_cover/roDbe9tS2lUqucickjGhXicHViblIPcaHWPepdpTiaHAQ4Cic4pLfvk738w/300?n=1',
      'num': 122,
      'author': '花痞'
    },
    {
      'title': 'Hardcore: 黑暗沉浸的极致快感',
      'url': 'https://p.qpic.cn/music_cover/sv5U6cpoN0dCLVrs9ibkz75fPLICuJNYVZKAmoL4q2EoQYia9xzcR4qg/300?n=1',
      'num': 100,
      'author': '北鹤'
    },
    {
      'title': '躁动引力 • 电瘾患者的深度迷梦',
      'url': 'https://p.qpic.cn/music_cover/4J0DcvEPJgEWsf9WgbblMDUdHBPu83H7zO99QL5mNfP1um5LibuwEzg/300?n=1',
      'num': 298,
      'author': '大师傅'
    }
  ]

  /** 初始化执行 */
  useEffect(() => {
    // 默认tab为网易音乐
    getNetData()
  }, [])

  // 获取网易云数据
  const getNetData = () => {
    getNetBanner().then(res => { setBanner(res.data) })
    getNetSongList().then(res => { setSongList(res.data) })
  }

  // 获取QQ音乐数据
  const getTencentData = () => {
    getTencentBanner().then(res => { setBanner(res.data) })
    getTencentSongList().then(res => { setSongList(res.data) })
  }

  // 获取虾米音乐数据
  const getXiamiData = () => {
    getXiamiBanner().then(res => { setBanner(res.data) })
    getXiamiSongList().then(res => { setSongList(res.data) })
  }

  const changeData = (tab) => {
    switch (tab.sub) {
      case 'MY_MUSIC':
        console.log('来到了我的音乐', tab.sub)
        break
      case 'NETEASE':
        getNetData()
        break
      case 'TENCENT':
        getTencentData()
        break
      case 'XIAMI':
        getXiamiData()
        break
      default:
        return null
    }
  }

  const renderSongList = () => {
    return (
      <div className={styles.songListWrapper}>
        <div className={styles.header}>
          <span className={styles.text}>推荐歌单</span>
          <span className={styles.more} onClick={() => { history.push('/songlistall') }}>
            歌单广场
            <i className="iconfont icon-jump" style={{ 'fontSize': '1.3rem', 'marginLeft': '0.2rem' }} />
          </span>
        </div>
        <SongList songList={songList} history={history} showAll={false}></SongList>
      </div>
    )
  }

  const renderMyMusic = () => {
    return (
      <div className={styles.myMusic}>
        <Accordion title={'创建的歌单'} render={() => {
          return (
            <Fragment>
              {mySongList && mySongList.map((item, index) => (<SongListItem listItem={item} history={history} key={index} />))}
            </Fragment>
          )
        }}>
        </Accordion>
        <Accordion title={'收藏的歌单'} render={() => {
          return (
            <Fragment>
              {myCollList && myCollList.map((item, index) => (<SongListItem listItem={item} history={history} key={index} />))}
            </Fragment>
          )
        }}>
        </Accordion>
      </div>
    )
  }

  const renderTabsContent = () => {
    return (
      <div className={styles.mainWrapper}>
        <div className={styles.bannerWrapper}>
          <Carousel
            autoplay={true}
            infinite
          >
            {banner.map(item => (
              <a
                key={item.id}
                href={item.url}
              >
                <img
                  onLoad={() => { window.dispatchEvent(new Event('resize')); }}
                  src={item.pic_url}
                  alt=""
                />
              </a>
            ))}
          </Carousel>
        </div>
        {renderSongList()}
      </div>
    )
  }

  const renderContainer = () => {

    return (
      <div className={styles.container}>
        <Tabs tabs={tabs}
          initialPage={1}
          swipeable={false}
          onChange={tab => { console.log(tab) }}
          onTabClick={tab => { changeData(tab) }}
        >
          {renderMyMusic()}
          {renderTabsContent()}
          {renderTabsContent()}
          {renderTabsContent()}
        </Tabs>
      </div>
    )
  }

  const renderHeader = () => {
    return (
      <div className={styles.header}>
        <div className={styles.userPic} onClick={() => { history.push('userinfo') }}>
          <div className={styles.imgWrapper}>
            <img src="https://kffhi.com/public/images/end/logo.jpg" alt="" />
          </div>
        </div>
        <div className={styles.name}>
          <img src="https://kffhi.com/public/images/end/name.png" alt="" />
        </div>
        <div className={styles.search} onClick={() => { history.push('/search') }}>
          <i className="iconfont icon-search" />
        </div>
      </div>
    )
  }

  // render() {
  return (
    <div>
      {renderHeader()}
      {renderContainer()}
      <MiniPlay></MiniPlay>
    </div>
  );
  // }
}

export default Home;