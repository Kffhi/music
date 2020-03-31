import React, { Component } from 'react'
import { Link } from 'dva/router'
import { Tabs } from 'antd-mobile'
import { get } from '../../utils/request'
import styles from './style.less'

class Home extends Component {

  componentDidMount() {
    get('/api/tencent/songList/hot?categoryId=10000000&sortId=5&pageSize=10&page=1').then(data=>{console.log(data)})
  }

  renderFooter = () => {
    return (
      <div className={styles.footer}>底部</div>
    )
  }

  renderContainer = () => {

    const tabs = [
      { title: '我的', sub: '1' },
      { title: '网易云音乐', sub: '2' },
      { title: 'QQ音乐', sub: '3' },
      { title: '虾米音乐', sub: '4' },
    ]

    return (
      <div className={styles.container}>
        <Tabs tabs={tabs}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div className={styles.mainWrapper}>Content of first tab</div>
          <div>Content of first tab</div>
          <div>Content of first tab</div>
          <div>Content of first tab</div>
        </Tabs>
      </div>
    )
  }

  renderHeader = () => {
    return (
      <div className={styles.header}>
        <div className={styles.userPic}>
          <div className={styles.imgWrapper}>
            <img src="https://kffhi.com/public/images/end/logo.jpg" alt="" />
          </div>
        </div>
        <div className={styles.name}>
          <img src="https://kffhi.com/public/images/end/name.png" alt="" />
        </div>
        <div className={styles.search}>
          <i className="iconfont icon-search" style={{ 'fontSize': '1.5rem' }} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContainer()}
        {this.renderFooter()}
      </div>
    );
  }
}

export default Home;