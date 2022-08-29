export default {
  namespaced: true,
  state: () => {
    return {
      profile: {
        id: '',
        avatar: '',
        nickname: '',
        account: '',
        mobile: '',
        token: ''
      },
      redirectUrl: '/'
    }
  },
  getters: {},
  mutations: {
    setUser(state, playload) {
      state.profile = playload
    },
    setRedirectUrl(state, url) {
      state.redirectUrl = url
    }
  },
  actions: {},
  modules: {}
}
