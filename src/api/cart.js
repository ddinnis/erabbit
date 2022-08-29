import request from './index'

// 获取新的商品信息
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

// 获取商品的specs和skus
export const getSpecsAndSkus = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}

export const findCart = () => {
  return request('/member/cart', 'get')
}

export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}

export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}

export const updateCart = (goods) => {
  return request('/member/cart/' + goods.skuId, 'put', goods)
}

export const checkAllCart = ({ selected, ids }) => {
  return request('/member/cart/selected', 'put', { selected, ids })
}
