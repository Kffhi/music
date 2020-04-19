import React from 'react'
import styles from './style.less'

const Loading = () => {

  return (
    <div className={styles.loadingWrapper}>
      <img src="https://www.kffhi.com/public/images/loading.gif" alt=""/>
      <div>哎呀，数据去哪了 ┗|｀O′|┛</div>
    </div>
  )
}
export default Loading