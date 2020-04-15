export default {

  namespace: 'player',

  state: {
    showMini: true
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
    }
  },

};