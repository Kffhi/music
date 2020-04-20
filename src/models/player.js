export default {

  namespace: 'player',

  state: {
    showMini: true,
    playList: [],
    sequenceList: [],
    currentIndex: 0,
    playUrl: ''
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
    chageCurrentIndex(state, action) {
      return {
        ...state,
        currentIndex: action.payLoad.currentIndex
      }
    },
    changePlayList(state, action) {
      return {
        ...state,
        playList: action.payLoad.playList
      }
    },
    changePlayUrl(state, action) {
      return {
        ...state,
        playUrl: action.payLoad.playUrl
      }
    },
    changeSequenceList(state, action) {
      return {
        ...state,
        sequenceList: action.payLoad.sequenceList
      }
    }
  },

};