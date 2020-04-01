### 首页

#### 获取轮播推荐

##### 网易

接口地址: `https://v1.itooi.cn/netease/banner`

请求示例: `https://v1.itooi.cn/netease/banner`

##### QQ

接口地址: `https://v1.itooi.cn/tencent/banner`

请求示例: `https://v1.itooi.cn/tencent/banner`

#### 获取热门歌单

##### 网易

接口地址: `https://v1.itooi.cn/netease/songList/hot`

请求示例: `https://v1.itooi.cn/netease/songList/hot?cat=全部&pageSize=20&page=0`

| 参数说明     | 是否必须 | 说明               | 默认值                               |
| ------------ | -------- | ------------------ | ------------------------------------ |
| categoryType | ×        | 歌单分类           | 默认全部                             |
| orderType    | ×        | 分别对应最新和最热 | 可选值为 'new' 和 'hot',默认为 'hot' |
| pageSize     | ×        | 获取条数           | 默认 30                              |
| page         | ×        | 分页               | 默认 0                               |

##### QQ

接口地址: `https://v1.itooi.cn/tencent/songList/hot`

请求示例: `https://v1.itooi.cn/tencent/songList/hot?categoryId=10000000&sortId=5&pageSize=10&page=1`

| 参数说明   | 是否必须 | 说明     | 默认值                             |
| ---------- | -------- | -------- | ---------------------------------- |
| categoryId | ×        | 分类 ID  | ID 见歌单分类接口返回数据          |
| sortId     | ×        | 排序 ID  | ID 见歌单分类接口返回数据          |
| pageSize   | ×        | 获取条数 | 默认 30 官方限制分页条数最大 60 条 |
| page       | ×        | 分页     | 默认 0                             |

### 歌单广场

#### 获取歌单分类

##### 网易

接口地址: `https://v1.itooi.cn/netease/songList/category`

请求示例: `https://v1.itooi.cn/netease/songList/category`

```json
{
  "code": 200,
  "msg": "OK",
  "timestamp": 1557323584425,
  "data": {
    "all": { //顶级类型 包含所有
      "imgId": 0,
      "activity": false,
      "resourceCount": 1000,
      "name": "全部歌单", //分类名称
      "type": 0,
      "category": 4,
      "hot": false,
      "resourceType": 0
    },
    "sub": [ //子级分类类型
      {
        "imgId": 0,
        "activity": false,
        "resourceCount": 1000,
        "name": "流行",//子级分类名称
        "type": 0,
        "category": 1,
        "hot": true,
        "resourceType": 0
      },

      .........

      {
        "imgId": 0,
        "activity": false,
        "resourceCount": 1000,
        "name": "华语",
        "type": 0,
        "category": 0, //父级分类ID
        "hot": true,
        "resourceType": 0
      }
    ],
    "code": 200,
    "categories": { // 父级分类类型
      "0": "语种", //父级分类ID和名称
      "1": "风格",
      "2": "场景",
      "3": "情感",
      "4": "主题"
    }
  }
}
```

##### QQ

接口地址: `https://v1.itooi.cn/tencent/songList/category`

请求示例: `https://v1.itooi.cn/tencent/songList/category`

#### 获取全部歌单

##### 网易

接口地址: `https://v1.itooi.cn/netease/songList/hot`

请求示例: `https://v1.itooi.cn/netease/songList/hot?cat=全部&pageSize=20&page=0`

| 参数说明     | 是否必须 | 说明               | 默认值                               |
| ------------ | -------- | ------------------ | ------------------------------------ |
| categoryType | ×        | 歌单分类           | 默认全部                             |
| orderType    | ×        | 分别对应最新和最热 | 可选值为 'new' 和 'hot',默认为 'hot' |
| pageSize     | ×        | 获取条数           | 默认 30                              |
| page         | ×        | 分页               | 默认 0                               |

#### 获取精品歌单

##### 网易

接口地址: `https://v1.itooi.cn/netease/songList/highQuality`

请求示例: `https://v1.itooi.cn/netease/songList/highQuality?cat=全部&pageSize=100`

| 参数说明     | 是否必须 | 说明                         | 默认值                               |
| ------------ | -------- | ---------------------------- | ------------------------------------ |
| categoryType | ×        | 歌单分类                     | 默认全部                             |
| orderType    | ×        | 分别对应最新和最热           | 可选值为 'new' 和 'hot',默认为 'hot' |
| pageSize     | ×        | 获取条数                     | 默认 30                              |
| lasttime     | ×        | 上次返回的结果的 lasttime 值 |                                      |

##### QQ

接口地址: `https://v1.itooi.cn/tencent/songList/hot`

请求示例: `https://v1.itooi.cn/tencent/songList/hot?categoryId=10000000&sortId=5&pageSize=10&page=1`

| 参数说明   | 是否必须 | 说明     | 默认值                             |
| ---------- | -------- | -------- | ---------------------------------- |
| categoryId | ×        | 分类 ID  | ID 见歌单分类接口返回数据          |
| sortId     | ×        | 排序 ID  | ID 见歌单分类接口返回数据          |
| pageSize   | ×        | 获取条数 | 默认 30 官方限制分页条数最大 60 条 |
| page       | ×        | 分页     | 默认 0                             |

### 歌单详情页

#### 获取歌单详情

