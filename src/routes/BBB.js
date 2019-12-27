import React, { Component } from 'react';
import { Link } from 'dva/router';

class BBB extends Component {
  render() {
    return (
      <div>
        <p>
          BBB页
        </p>
        <Link to={'/aaa'}>去AAA页面</Link>
        <br />
        <Link to={'/ccc'}>去CCC页面</Link>
      </div>
    );
  }
}

export default BBB;