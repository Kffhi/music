import React, { useState, Fragment } from 'react'
import { getLoveSongList } from '../../utils/cache'
import Header from '../../components/Header'
import Accordion from '../../components/Accordion'
import SongListItem from '../../components/SongListItem'
import styles from './style.less'
import { Toast } from 'antd-mobile'

const UserInfo = props => {
  const { history } = props

  const mySongList = [
    {
      'title': '我喜欢的音乐',
      'url': 'https://kffhi.com/public/images/end/myLoveSongList.png',
      'num': 23,
      'author': ''
    }
  ]

  const myCollList = getLoveSongList()

  const renderDetail = () => {
    return (
      <div className={styles.info}>
        <div className={styles.container}>
          <div className={styles.picWrapper}>
            <img src="https://kffhi.com/public/images/end/logo.jpg" alt="" />
            <div className={styles.edit} onClick={() => { Toast.info('暂未开发，敬请期待') }}>
              <i className="iconfont icon-address_edit"></i>
              编辑</div>
          </div>
          <div className={styles.tagsWrapper}>
            <div className={styles.name}>Kffhi</div>
            <div className={styles.focus}><span>关注：114</span><span>粉丝：89</span></div>
            <div className={styles.tags}>
              <span className={`${styles.tag} ${styles.vip}`}>年度小会员</span>
              <span className={`${styles.tag} ${styles.sex}`}>男&nbsp;&nbsp;♂</span>
              <span className={styles.tag}>Lv&nbsp;9</span>
              <span className={styles.tag}>杭州市</span>
            </div>
          </div>
        </div>
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

  return (
    <div className={styles.userInfo}>
      <Header history={history} title={'个人中心'} />
      {renderDetail()}
      {renderMyMusic()}
    </div>
  )
}
export default UserInfo