import React, { useState } from 'react'
import styles from './style.less'

const Accordion = props => {
  const {
    title = '',
    render = () => { }
  } = props

  const [showAll, setShowAll] = useState(true)

  return (
    <div className={styles.accordion}>
      <div className={styles.accordionTitle} onClick={() => { setShowAll(!showAll) }}>
        {showAll ?
          <i className="iconfont icon-arrow-down" /> :
          <i className="iconfont icon-jump" />
        }
        <div className={styles.text}>{title}</div>
        <i className="iconfont icon-add_bold" style={{ 'fontSize': '2rem', 'position': 'absolute', 'right': '0.2rem' }} />
      </div>
      {showAll ? render() : null}
    </div>
  )
}
export default Accordion