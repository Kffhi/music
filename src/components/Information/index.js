import React from 'react'
import { Modal } from 'antd-mobile'
import styles from './style.less'

const Infomation = props => {
  const {
    modal,
    info,
    handleClose
  } = props

  return (
    <div className={styles.infrmationWrapper}>
      <Modal
        visible={modal}
        transparent
        onClose={() => { handleClose() }}
      >
        <div className={styles.wrapper}>
          <div className={styles.background}>
            <img src={info.url} alt="" />
          </div>
          <div className={styles.containerWrapper}>
            <div className={styles.showImg}>
              <img src={info.url} alt="" />
            </div>
            <div className={styles.title}>{info.title}</div>
            <div style={{whiteSpace: 'pre-wrap'}} className={styles.description} dangerouslySetInnerHTML={{ __html: info.description }}></div>
            <div className={styles.iconWrap}>
              <i className="iconfont icon-edit" onClick={() => { handleClose() }} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default Infomation;