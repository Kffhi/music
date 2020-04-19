export default {

  namespace: 'player',

  state: {
    showMini: true,
    playList: [],
    sequenceList: [],
    currentIndex: 0
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
    chageCurrentIndex(state, action){
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
    changeSequenceList(state, action) {
      return {
        ...state,
        sequenceList: action.payLoad.sequenceList
      }
    }
  },

};