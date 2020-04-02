import React, { useState, useEffect } from 'react'
import { Link } from 'dva/router'
import { Tabs, Carousel } from 'antd-mobile'
import { getNetBanner, getNetSongList } from '../../services/netease'
import SongList from '../../components/SongList'
import MiniPlay from '../../components/miniPlay'
import styles from './style.less'
// class Home extends Component {

const Home = () => {
  const [netBanner, setNetBanner] = useState([])
  const [netSongList, setNetSongList] = useState([])

  /** 初始化执行 */
  useEffect(() => {
    getBanner()
    getSongList()
  }, [])

  // 获取歌单
  const getSongList = async () => {
    await getNetSongList().then(res => { setNetSongList(res.data) })
  }

  // 获取轮播图
  const getBanner = () => {
    getNetBanner().then(res => { setNetBanner(res.data) })
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
        <SongList songList={netSongList}></SongList>
      </div>
    )
  }

  const renderContainer = () => {

    const tabs = [
      { title: '我的', sub: '1' },
      { title: '网易云音乐', sub: '2' },
      { title: 'QQ音乐', sub: '3' },
      { title: '虾米音乐', sub: '4' },
    ]

    return (
      <div className={styles.container}>
        <Tabs tabs={tabs}
          initialPage={1}
          swipeable={false}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div>Content of first tab</div>
          <div className={styles.mainWrapper}>
            <div className={styles.bannerWrapper}>
              <Carousel
                autoplay={true}
                infinite
              >
                {netBanner.map(item => (
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
          <div>Content of first tab</div>
          <div>Content of first tab</div>
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