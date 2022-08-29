import request from './index'

export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}

export const findRelGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}

export const findHotGoods = ({ id, type, limit = 3 }) => {
  return request('/goods/hot', 'get', { id, type, limit })
}

export const findGoodsCommentInfo = (id) => {
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`,
    'get'
  )
  // return request(`/goods/${id}/evaluate`)
}

export const findGoodsCommentList = (id, params) => {
  return request(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`,
    'get',
    params
  )
  // return request(`/goods/${id}/evaluate`)
}
