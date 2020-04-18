import React, { useState, Fragment, useEffect } from 'react'
import { getNetHotSearch, getNetSearchResult } from '../../services/netease'
import SongItem from '../../components/SongItem'
import styles from './style.less'

const Search = props => {
  const {
    history
  } = props
  const [isSearch, setIsSearch] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [hotSearch, setHotSearch] = useState([])
  const [searchResult, setSearchResult] = useState({})
  const historySearch = ['樱花树下', '陈奕迅', 'Aimer', 'enough', 'leave me alone', '碧梨', 'white alience']

  /** 初始化执行 */
  useEffect(() => {
    // 默认tab为网易音乐
    getNetData()
  }, [])

  // 获取网易云数据
  const getNetData = () => {
    getNetHotSearch().then(res => { setHotSearch(res.data) })
  }

  const search = async () => {
    if (searchValue === '') {
      return null
    } else {
      await getNetSearchResult().then(res => {
        setSearchResult({ ...res.data })
        setIsSearch(true)
      })
    }
  }

  const handleChange = value => {
    setSearchValue(value)
  }

  const renderNoSearch = () => {
    return (
      <Fragment>
        {renderHistory()}
        {renderHot()}
      </Fragment>
    )
  }

  const renderReault = () => {
    return (
      <Fragment>
        {JSON.stringify(searchResult) !== '{}' ?
          <div className={styles.resultWrapper}>
            {JSON.stringify(searchResult.singer) !== '{}' ?
              <Fragment>
                <div className={styles.titleText}>歌手</div>
                <div className={styles.singerWrapper} onClick={()=>{history.push('/singerinfo')}}>
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
              {searchResult.song && searchResult.song.map((item, index) => (
                <SongItem history={history} songListDetail={item} key={index} num={index + 1} />
              ))}
            </div>
          </div>
          : null}
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
            <input className={styles.input} type="text" placeholder='发现新音乐' onChange={e => {
              handleChange(e.target.value);
            }} />
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
          <i className="iconfont icon-app_delete" />
        </div>
        <div className={styles.itemWrapper}>
          {historySearch.map((item, index) => (
            <span className={styles.tag} key={index}>{item}</span>
          ))}
        </div>
      </div>
    )
  }

  const renderHot = () => {
    return (
      <div className={styles.hotWrapper}>
        <div className={styles.text}>热搜榜</div>
        <div className={styles.itemWrapper}>
          {hotSearch && hotSearch.map((item, index) => (
            <div className={styles.hotItem} key={index}>
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