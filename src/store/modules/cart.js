import {
  checkAllCart,
  deleteCart,
  findCart,
  getNewCartGoods,
  insertCart,
  mergeCart,
  updateCart
} from '@/api/cart'

// 购物车模块
export default {
  namespaced: true,
  state: () => {
    return {
      list: []
    }
  },
  getters: {
    validList(state) {
      return state.list.filter((goods) => goods.stock > 0 && goods.isEffective)
    },
    validTotal(state, getters) {
      return getters.validList.reduce((p, c) => p + c.count, 0)
    },
    validAmount(state, getters) {
      return (
        getters.validList.reduce(
          (p, c) => p + Math.round(c.nowPrice * 100) * c.count,
          0
        ) / 100
      )
    },
    invalidList(state) {
      return state.list.filter(
        (goods) => goods.stock <= 0 || !goods.isEffective
      )
    },
    selectedList(state, getters) {
      return getters.validList.filter((item) => item.selected)
    },
    selectedTotal(state, getters) {
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    selectedAmount(state, getters) {
      return (
        getters.selectedList.reduce(
          (p, c) => p + Math.round(c.nowPrice * 100) * c.count,
          0
        ) / 100
      )
    },
    isCheckAll(state, getters) {
      return (
        getters.validList.length !== 0 &&
        getters.selectedList.length === getters.validList.length
      )
    }
  },
  mutations: {
    insertCart(state, payload) {
      const sameIndex = state.list.findIndex(
        (goods) => goods.skuId === payload.skuId
      )
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count
        payload.count += count
        // 删除原来
        state.list.splice(sameIndex, 1)
      }
      // 追加新的
      state.list.unshift(payload)
    },
    updateCart(state, goods) {
      const updateGoods = state.list.find((item) => item.skuId === goods.skuId)
      for (const key in goods) {
        if (
          goods[key] !== undefined &&
          goods[key] !== null &&
          goods[key] !== ''
        ) {
          updateGoods[key] = goods[key]
        }
      }
    },
    deleteCart(state, skuId) {
      const index = state.list.findIndex((item) => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    setCart(state, payload) {
      state.list = payload
    }
  },
  actions: {
    async mergeCart(ctx) {
      const cartList = ctx.state.list.map((goods) => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      await mergeCart(cartList)
      ctx.commit('setCart', [])
    },
    updateCartSku(ctx, { oldSkuId, newSku }) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          const oldGoods = ctx.state.list.find(
            (item) => item.skuId === oldSkuId
          )
          deleteCart([oldGoods.skuId])
            .then(() => {
              return insertCart({ skuId: newSku.skuId, count: oldGoods.count })
            })
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          const oldGoods = ctx.state.list.find(
            (item) => item.skuId === oldSkuId
          )
          ctx.commit('deleteCart', oldSkuId)
          const {
            skuId,
            price: nowPrice,
            specsText: attrsText,
            inventory: stock
          } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, attrsText, stock }
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    batchDeleteCart(ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          const ids = ctx.getters[isClear ? 'invalidList' : 'selectedList'].map(
            (item) => item.skuId
          )
          deleteCart(ids)
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(
            (item) => {
              ctx.commit('deleteCart', item.skuId)
            }
          )
          resolve()
        }
      })
    },
    checkAllCart(ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          const ids = ctx.getters.validList.map((item) => item.skuId)
          checkAllCart({ selected, ids })
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          ctx.getters.validList.forEach((goods) => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    },
    updateCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          updateCart(payload)
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          ctx.commit('updateCart', payload)
          resolve()
        }
      })
    },
    deleteCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          deleteCart([payload])
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    insertCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          insertCart({ skuId: payload.skuId, count: payload.count })
            .then(() => {
              return findCart()
            })
            .then((data) => {
              ctx.commit('setCart', data.result)
              resolve()
            })
        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    },
    findCart(ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
          findCart().then((data) => {
            ctx.commit('setCart', data.result)
            resolve()
          })
        } else {
          // 未登录
          // 同时发送请求（有几个商品发几个请求）等所有请求成功，一并去修改本地数据。
          // Promise.all(promise数组).then((dataList)=>{})  同时发请求，所有请求成功，得到所有成功结果
          // Promise.resolve() Promise.reject() new Promise()
          // Promise.race(promise数组).then((data)=>{}) 同时发请求，最快的请求成功，得到成功结果
          const promiseArr = ctx.state.list.map((goods) => {
            return getNewCartGoods(goods.skuId)
          })
          // dataList成功结果的集合，数据顺序和promiseArr顺序一致，它又是根据state.list而来
          Promise.all(promiseArr).then((dataList) => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', {
                skuId: ctx.state.list[i].skuId,
                ...data.result
              })
            })
            // 调用resolve代表操作成功
            resolve()
          })
        }
      })
    }
  }
}
