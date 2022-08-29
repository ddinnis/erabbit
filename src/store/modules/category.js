import { findAllCategory } from '@/api/category'
import { topCategory } from '@/api/constants'

export default {
  namespaced: true,
  state: () => {
    return {
      list: topCategory.map((item) => ({ name: item }))
    }
  },
  getters: {},
  mutations: {
    setCategoryList(state, categoryList) {
      state.list = categoryList
    },
    show(state, item) {
      const category = state.list.find((category) => category.id === item.id)
      category.open = true
    },
    hide(state, item) {
      const category = state.list.find((category) => category.id === item.id)
      category.open = false
    }
  },
  actions: {
    async getCategoryList({ commit }) {
      const data = await findAllCategory()

      data.result.forEach((item) => {
        item.open = false
      })

      commit('setCategoryList', data.result)
    }
  },
  modules: {}
}
