import React, { useState, useEffect } from 'react'
import { Link } from 'dva/router'
import { Tabs, Carousel } from 'antd-mobile'
import { getNetBanner, getNetSongList } from '../../services/netease'
import { getTencentBanner, getTencentSongList } from '../../services/tencent'
import { getXiamiBanner, getXiamiSongList } from '../../services/xiami'
import SongList from '../../components/SongList'
import MiniPlay from '../../components/miniPlay'
import styles from './style.less'
// class Home extends Component {

const Home = () => {
  const [banner, setBanner] = useState([])
  const [songList, setSongList] = useState([])
  const tabs = [
    { title: '我的', sub: 'MY_MUSIC' },
    { title: '网易云音乐', sub: 'NETEASE' },
    { title: 'QQ音乐', sub: 'TENCENT' },
    { title: '虾米音乐', sub: 'XIAMI' },
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
    console.log('change', tab.sub)
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
          <span className={styles.more}>
            歌单广场
            <i className="iconfont icon-jump" style={{ 'fontSize': '1.3rem', 'marginLeft': '0.2rem' }} />
          </span>
        </div>
        <SongList songList={songList}></SongList>
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
          <div>Content of first tab</div>
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
        <div className={styles.userPic}>
          <div className={styles.imgWrapper}>
            <img src="https://kffhi.com/public/images/end/logo.jpg" alt="" />
          </div>
        </div>
        <div className={styles.name}>
          <img src="https://kffhi.com/public/images/end/name.png" alt="" />
        </div>
        <div className={styles.search}>
          <i className="iconfont icon-search" style={{ 'fontSize': '2.2rem' }} />
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