import React, { useState, useEffect, Fragment } from 'react'
import { getNetSongListCategory, getNetSongList } from '../../services/netease'
import { getTencentSongListCategory, getTencentCartSongList } from '../../services/tencent'
import { Tabs } from 'antd-mobile'
import Header from '../../components/Header'
import SongList from '../../components/SongList'
import Loading from '../../components/Loading'
import styles from './style.less'

const SongListAll = props => {
  const {
    history,
    match
  } = props
  const tabSub = match.params.tab
  const [tabs, setTabs] = useState([])
  const [songList, setSongList] = useState([])

  /** 初始化执行 */
  useEffect(() => {
    switch (tabSub) {
      case 'NETEASE':
        getNetData()
        break
      case 'TENCENT':
        getTencentData()
        break
      case 'XIAMI':
        break
      default:
        return null
    }
  }, [tabSub])

  // 获取网易云数据
  const getNetData = () => {
    getNetSongList().then(res => {
      const newSongList = [...res.playlists]
      newSongList.forEach(item => {
        item.pic = item.coverImgUrl
        item.title = item.name
      })
      setSongList(newSongList)
    })
    getNetSongListCategory().then(res => {
      let newCategory = [...res.tags]
      newCategory.forEach(item => {
        item.title = item.playlistTag.name
      })
      newCategory = [{ "title": "全部" }].concat(newCategory)
      setTabs(newCategory)
    })
  }

  // 获取QQ音乐数据
  const getTencentData = () => {
    getTencentSongListCategory().then(res => {
      let newCategory = [...res.response.data.categories]
      let all = newCategory[0].items
      newCategory = all.concat(newCategory[2].items)
      newCategory.forEach(item => {
        item.id = item.categoryId
        item.title = item.categoryName
      })
      setTabs(newCategory)
    })
    let categoryId = 10000000
    getTencentCartSongList(categoryId).then(res => {
      let newSongList = [...res.response.data.list]
      newSongList.forEach(item => {
        item.id = item.dissid
        item.pic = item.imgurl
        item.title = item.dissname
      })
      setSongList(newSongList)
    })
  }

  const changeData = tab => {
    switch (tabSub) {
      case 'NETEASE':
        const cat = tab.name
        getNetSongList(cat).then(res => {
          const newSongList = [...res.playlists]
          newSongList.forEach(item => {
            item.pic = item.coverImgUrl
            item.title = item.name
          })
          setSongList(newSongList)
        })
        break
      case 'TENCENT':
        const categoryId = tab.id
        getTencentCartSongList(categoryId).then(res => {
          let newSongList = [...res.response.data.list]
          newSongList.forEach(item => {
            item.id = item.dissid
            item.pic = item.imgurl
            item.title = item.dissname
          })
          setSongList(newSongList)
        })
        break
      case 'XIAMI':
        break
      default:
        return null
    }
  }

  const renderSongList = () => {
    return (
      <div className={styles.songList}>
        {JSON.stringify(songList) !== '[]' ? <SongList tab={tabSub} songList={songList} history={history} /> : <Loading />}
      </div>
    )
  }

  return (
    <div className={styles.songListAll}>
      <Header title={'歌单广场'} tab={tabSub} history={history} />
      <div className={styles.tabs}>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onTabClick={tab => { changeData(tab) }}
        >
          {
            tabs.map(index => (
              <Fragment key={index}>
                {renderSongList()}
              </Fragment>
            ))}
        </Tabs>
      </div>
    </div>
  )
}
export default SongListAll