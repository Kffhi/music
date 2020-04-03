import React, { useState } from 'react'
import styles from './style.less'

const SongListItem = props => {

  const {
    listItem = {}
  } = props

  return (
    <div className={styles.songListItem}>
      <div className={styles.imgWrapper}>
        <img src={listItem.url} alt="" />
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.text}>
          <div className={styles.title}>{listItem.title}</div>
          <div className={styles.info}><spna className={styles.num}>{listItem.num}</spna>首{listItem.author !== '' ? <span className={styles.author}>by <span>{listItem.author}</span></span> : null}</div>
        </div>
        <i className="iconfont icon-more" />
      </div>
    </div>
  )
}
export default SongListItem