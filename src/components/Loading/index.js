import React from 'react'
import styles from './style.less'

const Loading = () => {

  return (
    <div className={styles.loadingWrapper}>
      <img src="https://www.kffhi.com/public/images/loading.gif" alt=""/>
      <div>哎呀，一定是你的网不好 ┗|｀O′|┛</div>
    </div>
  )
}
export default Loading