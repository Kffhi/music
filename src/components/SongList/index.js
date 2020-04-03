import React, { Component } from 'react'
import styles from './style.less'

class SongList extends Component {
  render() {
    const { songList, history } = this.props
    return (
      <div className={styles.songList}>
        {songList.length > 0 ? songList.slice(0, 6).map((item, index) => (
          <div className={styles.songListBox} key={index} onClick={()=>{history.push('/songlistinfo')}}>
            <div className={styles.pic}>
              <img src={item.pic} alt="" />
            </div>
            <div className={styles.title}>{item.title}</div>
          </div>
        )) : null}
      </div>
    )
  }
}

export default SongList;