export default {

  namespace: 'player',

  state: {
    showMini: true,
    playList: [
      {
        "name": "虹の彼方 (feat. Lasah)",
        "singer": "小瀬村晶 / lasah",
        "picUrl": "https://i.ytimg.com/vi/KIL_kmtcNcU/maxresdefault.jpg",
        "url": "https://www.kffhi.com/public/images/audio/test.mp3",
        "time": "446"
      },
      {
        "name": "baby I love you",
        "singer": "Shiggy Jr.",
        "picUrl": "https://p1.music.126.net/tsACZWXQAByxJM4uew78UQ==/2544269907035205.jpg",
        "url": "https://www.kffhi.com/public/images/audio/1.mp3",
        "time": "224"
      },
      {
        "name": "Enough",
        "singer": "Maisy Kay",
        "picUrl": "https://i.kfs.io/album/global/7241972,0v1/fit/500x500.jpg",
        "url": "https://www.kffhi.com/public/images/audio/2.mp3",
        "time": "274"
      },
      {
        "name": "长恨歌",
        "singer": "五色石南叶",
        "picUrl": "https://p2.music.126.net/0rDEqHG2be0xmPs8AiAS5A==/2545369418305520.jpg",
        "url": "https://www.kffhi.com/public/images/audio/3.mp3",
        "time": "177"
      }
    ],
    sequenceList: [
      {
        "name": "虹の彼方 (feat. Lasah)",
        "singer": "小瀬村晶 / lasah",
        "picUrl": "https://i.ytimg.com/vi/KIL_kmtcNcU/maxresdefault.jpg",
        "url": "https://www.kffhi.com/public/images/audio/test.mp3",
        "time": "446"
      },
      {
        "name": "baby I love you",
        "singer": "Shiggy Jr.",
        "picUrl": "https://p1.music.126.net/tsACZWXQAByxJM4uew78UQ==/2544269907035205.jpg",
        "url": "https://www.kffhi.com/public/images/audio/1.mp3",
        "time": "224"
      },
      {
        "name": "Enough",
        "singer": "Maisy Kay",
        "picUrl": "https://i.kfs.io/album/global/7241972,0v1/fit/500x500.jpg",
        "url": "https://www.kffhi.com/public/images/audio/2.mp3",
        "time": "274"
      },
      {
        "name": "长恨歌",
        "singer": "五色石南叶",
        "picUrl": "https://p2.music.126.net/0rDEqHG2be0xmPs8AiAS5A==/2545369418305520.jpg",
        "url": "https://www.kffhi.com/public/images/audio/3.mp3",
        "time": "177"
      }
    ],
  },

  subscriptions: {

  },

  effects: {

  },

  reducers: {
    changeShowMiniState(state) {
      const { showMini } = state
      return {
        ...state,
        showMini: !showMini,
      }
    },
    changePlayList(state, action) {
      return {
        ...state,
        playList: action.payLoad.playList
      }
    }
  },

};