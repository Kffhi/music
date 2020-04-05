import React, { useState, useEffect, Fragment } from 'react'
import { getNetSongListCategory, getNetSongList } from '../../services/netease'
import { Tabs } from 'antd-mobile'
import Header from '../../components/Header'
import MiniPlay from '../../components/miniPlay'
import SongList from '../../components/SongList'
import styles from './style.less'

const SongListAll = props => {
  const {
    history
  } = props
  const [tabs, setTabs] = useState([])
  const [songList, setSongList] = useState([])

  /** 初始化执行 */
  useEffect(() => {
    // 默认tab为网易音乐
    getNetData()
  }, [])

  // 获取网易云数据
  const getNetData = () => {
    getNetSongList().then(res => { setSongList(res.data) })
    getNetSongListCategory().then(res => { setTabs(res.data) })
  }

  const changeData = () => {
    return null
  }

  const renderSongList = () => {
    return (
      <div className={styles.songList}>
        <SongList songList={songList} history={history} />
      </div>
    )
  }

  return (
    <div className={styles.songListAll}>
      <Header title={'歌单广场'} history={history}/>
      <div className={styles.tabs}>
        <Tabs 
          tabs={tabs}
          initialPage={0}
          onChange={tab => { console.log(tab) }}
          onTabClick={tab => { changeData(tab) }}
        >
          {
            tabs.map(() => (
              <Fragment>
                {renderSongList()}
              </Fragment>
            ))}
        </Tabs>
      </div>
      <MiniPlay history={history} />
    </div>
  )
}
export default SongListAll