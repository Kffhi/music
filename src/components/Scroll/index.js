import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactInfiniteScroll from 'react-infinite-scroller';
import { hasNextPage } from '../../utils/format';
import styles from './style.less';

export default class InfiniteScroll extends Component {
  static defaultProps = {
    // 「空列表」样式
    emptyListNode: null,
    pageBean: undefined,
    onLoadMore: () => { },
    className: '',
    isEmpty: false,
    hideBottomTips: false
  }

  static propTypes = {
    emptyListNode: PropTypes.node,
    pageBean: PropTypes.object,
    onLoadMore: PropTypes.func,
    className: PropTypes.string,
    isEmpty: PropTypes.bool,
    hideBottomTips: PropTypes.bool
  }

  state = {
    hasFetched: false
  }

  handleBottomTips = () => {
    if (this.contentNode && this.tipsNode) {
      if (this.contentNode.offsetHeight > window.innerHeight) {
        this.tipsNode.style.display = 'block';
      } else {
        this.tipsNode.style.display = 'none';
      }
    }
  }

  componentDidUpdate() {
    this.handleBottomTips();
  }

  componentDidMount() {
    this.handleBottomTips();
  }

  render() {
    const {
      emptyListNode,
      pageBean,
      onLoadMore,
      children,
      className,
      isEmpty,
      hideBottomTips,
      userWrapperStyle,
      useWindow = true,
    } = this.props;
    const { hasFetched } = this.state;
    let hasMore = true;


    if (pageBean) {
      const { totalCount } = pageBean;

      // 如果获取到的分页信息中 totalCount 为 0，则返回「空列表」样式
      if (totalCount === 0 || isEmpty) {
        return emptyListNode;
      }

      hasMore = hasNextPage(pageBean);
    }

    return (
      <div
        className={styles.infiniteScrollWrapper}
        ref={node => this.contentNode = node}
        style={userWrapperStyle}
      >
        <ReactInfiniteScroll
          useWindow={useWindow}
          children={children}
          loadMore={() => {
            if (!pageBean) {
              if (!hasFetched) {
                this.lastPageNo = 1;
                onLoadMore(1);
                this.setState({ hasFetched: true });
              }
            } else if (hasMore) {
              if (this.lastPageNo !== pageBean.pageNo + 1 || pageBean.pageNo === 1) {
                this.lastPageNo = pageBean.pageNo + 1;
                onLoadMore(pageBean.pageNo + 1);
              }
            }
          }}
          hasMore={hasMore}
          className={className}
          loader={<div key={0} className={styles.tips}>正在加载</div>}
        />
        {
          !hasMore && !hideBottomTips &&
          <div
            key={0}
            ref={node => this.tipsNode = node}
            className={styles.tips}
          >到底了</div>
        }
      </div>
    );
  }
}
