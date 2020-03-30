import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Button } from 'antd-mobile';
import styles from './style.less'

class Home extends Component {
  render() {
    return (
      <div>
        <p className={styles.text}>
          Home页
        </p>
        <Link to={'/search'}>
          <Button type={'primary'} icon={'link'}>
            点击搜索
          </Button>
        </Link>
      </div>
    );
  }
}

export default Home;