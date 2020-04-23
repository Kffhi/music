import React, { useState, Fragment, useEffect } from 'react'
import { saveSearch, getSearch } from '../../utils/cache'
import { getNetHotSearch, getNetSearchResult, getNetSongDetailData } from '../../services/netease'
import SongItem from '../../components/SongItem'
import Loading from '../../components/Loading'
import styles from './style.less'

const Search = props => {
  const {
    history,
    match
  } = props
  const [isSearch, setIsSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [hotSearch, setHotSearch] = useState([])
  const [searchResult, setSearchResult] = useState({})
  const [historySearch, setHistorySearch] = useState([])
  const tab = match.params.tab
  // const historySearch = ['樱花树下', '陈奕迅', 'Aimer', 'enough', 'leave me alone', '碧梨', 'white alience']

  /** 初始化执行 */
  useEffect(() => {
    setHistorySearch(getSearch())
    switch (tab) {
      case 'NETEASE':
        getNetData()
        break
      case 'TENCENT':
        // getTencentData()
        break
      case 'XIAMI':
        break
      default:
        return null
    }
  }, [tab])

  useEffect(() => {
    if(searchValue === '')
    setIsSearch(false)
  }, [searchValue])

  // 获取网易云数据
  const getNetData = () => {
    getNetHotSearch().then(res => {
      const newHotSearch = res.data
      newHotSearch.forEach((item, index) => {
        item.id = index
        item.title = item.searchWord
        item.description = item.content
        item.num = item.score
      })
      setHotSearch(newHotSearch)
    })
  }

  const search = async value => {
    let newValue = ''
    if (!value && searchValue === '') {
      return null
    } else {
      if (value && searchValue === '') {
        newValue = String(value)
      } else {
        newValue = searchValue
      }
      let newSearchValue = []
      newSearchValue.push(newValue)
      saveSearch(newSearchValue)
      setHistorySearch(getSearch())
      switch (tab) {
        case 'NETEASE':
          let ids = []
          let newResult = {}
          await getNetSearchResult(newValue).then(res => {
            newResult = { ...res.result }
            newResult.songs.forEach(item => {
              ids.push(item.id)
            })
          })
          await getNetSongDetailData(ids.join(',')).then(res => {
            let newSongList = [...res.songs]
            newResult.songs.forEach((item, index) => {
              Object.assign(item, newSongList[index])
            })
          })
          newResult.songs.forEach(item => {
            item.title = item.name
            item.singer = item.artists[0].name
            item.description = item.album.name
            item.time = Number.parseInt((item.duration) / 1000)
            item.picUrl = item.al.picUrl
          })
          setSearchResult(newResult)
          setIsSearch(true)
          break
        case 'TENCENT':
          // getTencentData()
          break
        case 'XIAMI':
          break
        default:
          return null
      }
    }
  }

  const handleChange = value => {
    setSearchValue(value)
  }

  const renderNoSearch = () => {
    return (
      <Fragment>
        {historySearch.length > 0 ? renderHistory() : null}
        {renderHot()}
      </Fragment>
    )
  }

  const renderReault = () => {
    return (
      <Fragment>
        {JSON.stringify(searchResult) !== '{}' ?
          <div className={styles.resultWrapper}>
            {searchResult.singer && JSON.stringify(searchResult.singer) !== '{}' ?
              <Fragment>
                <div className={styles.titleText}>歌手</div>
                <div className={styles.singerWrapper} onClick={() => { history.push('/singerinfo') }}>
                  <img src={searchResult.singer.url} alt="" />
                  <div className={styles.singerName}>{searchResult.singer.name}</div>
                </div>
              </Fragment>
              : null}
            <div className={styles.titleText}>
              <div>单曲</div>
              <div className={styles.playAll}>
                <i className="iconfont icon-video-play"></i>
                播放全部
              </div>
            </div>
            <div className={styles.songWrapper}>
              {searchResult.songs && searchResult.songs.map((item, index) => (
                <SongItem history={history} playList={searchResult.songs} songDetail={item} key={index} num={index + 1} tab={tab} />
              )
              )}
            </div>
          </div>
          :
          <Loading />
        }
      </Fragment>
    )
  }

  const renderHeader = () => {
    return (
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <div className={styles.goBack} onClick={() => { history.goBack(-1) }}>
            <i className="iconfont icon-app_back" />
          </div>
          <div className={styles.inputWrapper}>
            <input className={styles.input} type="text" value={searchValue} placeholder='发现新音乐' onChange={e => { handleChange(e.target.value) }} />
          </div>
          <div className={styles.search} onClick={() => { search() }}>
            GO
          </div>
        </div>
        <div style={{ "width": "100%", "height": "4.8rem" }}></div>
      </div>
    )
  }

  const renderHistory = () => {
    return (
      <div className={styles.historyWrapper}>
        <div className={styles.text}>历史记录
          <i className="iconfont icon-app_delete" onClick={() => { window.localStorage.clear(); setHistorySearch([]) }} />
        </div>
        <div className={styles.itemWrapper}>
          {historySearch.map((item, index) => (
            <span className={styles.tag} key={index} onClick={() => { setSearchValue(item); setIsSearch(true); search(item) }}>{item}</span>
          ))}
        </div>
      </div>
    )
  }

  const renderHot = () => {
    return (
      <div className={styles.hotWrapper}>
        <div className={styles.text}>
          {tab === 'NETEASE' ? '网易' : tab === 'TENCENT' ? 'QQ音乐' : '虾米'}热搜榜
          </div>
        {hotSearch ?
          <div className={styles.itemWrapper}>
            {hotSearch && hotSearch.map((item, index) => (
              <div className={styles.hotItem} key={index} onClick={() => { setSearchValue(item.title); setIsSearch(true); search(item.title) }}>
                <div className={styles.num} style={index < 3 ? { "color": "#ed4014" } : null}>{index + 1}</div>
                <div className={styles.container}>
                  <div className={styles.title}>
                    {item.title}
                    <span className={styles.hotNum}>{item.num}</span>
                  </div>
                  <div className={styles.description}>
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          : <Loading />}
      </div>
    )
  }

  return (
    <div className={styles.search}>
      {renderHeader()}
      {isSearch ? renderReault() : renderNoSearch()}
    </div>
  )
}
export default Search