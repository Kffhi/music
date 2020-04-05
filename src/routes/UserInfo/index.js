import React, { useState, Fragment } from 'react'
import Header from '../../components/Header'
import MiniPlay from '../../components/miniPlay'
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
      <MiniPlay history={history} />
    </div>
  )
}
export default UserInfo