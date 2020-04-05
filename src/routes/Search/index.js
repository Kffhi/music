import React, { useState, Fragment, useEffect } from 'react'
import { getHotSearch } from '../../services/netease'
import MiniPlay from '../../components/miniPlay'
import styles from './style.less'

const Search = props => {
  const {
    history
  } = props
  const [isSearch, setIsSearch] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [hotSearch, setHotSearch] = useState([])
  const historySearch = ['樱花树下', '陈奕迅', 'Aimer', 'enough', 'leave me alone', '碧梨', 'white alience']

  /** 初始化执行 */
  useEffect(() => {
    // 默认tab为网易音乐
    getNetData()
  }, [])

  // 获取网易云数据
  const getNetData = () => {
    getHotSearch().then(res => { setHotSearch(res.data) })
  }

  const search = () => {
    if (searchValue === '') {
      return null
    } else {
      console.log(searchValue)
      setIsSearch(true)
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
      <div className={styles.resultWrapper}>result</div>
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
      <MiniPlay />
    </div>
  )
}
export default Search