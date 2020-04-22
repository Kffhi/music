export default {

  namespace: 'player',

  state: {
    showMini: true,
    playList: [],
    sequenceList: [],
    currentIndex: 0,
    playUrl: '',
    platform: 'NETEASE',
  },

  subscriptions: {

  },

  effects: {

  },

  reducers: {
    changeShowMiniState(state) {
      console.log('changeShowMiniState')
      const { showMini } = state
      return {
        ...state,
        showMini: !showMini,
      }
    },
    chageCurrentIndex(state, action) {
      console.log('chageCurrentIndex')
      return {
        ...state,
        currentIndex: action.payLoad.currentIndex
      }
    },
    changePlayList(state, action) {
      console.log('changePlayList')
      return {
        ...state,
        playList: action.payLoad.playList
      }
    },
    changePlayUrl(state, action) {
      console.log('changePlayUrl')
      return {
        ...state,
        playUrl: action.payLoad.playUrl
      }
    },
    changeSequenceList(state, action) {
      console.log('changeSequenceList')
      return {
        ...state,
        sequenceList: action.payLoad.sequenceList
      }
    },
    changePlatform(state, action) {
      console.log('changePlatform')
      return {
        ...state,
        platform: action.payLoad.platform
      }
    }
  },

};