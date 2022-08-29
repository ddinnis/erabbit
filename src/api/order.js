import request from './index'

export const createOrder = () => {
  return request('/member/order/pre', 'get')
}

export const addAddress = (address) => {
  return request('/member/address', 'post', address)
}

export const editAddress = (address) => {
  return request(`/member/address/${address.id}`, 'put', address)
}

export const submitOrder = (params) => {
  return request('/member/order', 'post', params)
}

export const findOrder = (id) => {
  return request('/member/order/' + id, 'get')
}

export const repurchaseOrder = (orderId) => {
  return request(`/member/order/repurchase/${orderId}`, 'get')
}

export const findOrderList = ({ orderState, page, pageSize }) => {
  return request('/member/order', 'get', { orderState, page, pageSize })
}

export const cancelOrder = ({ orderId, cancelReason }) => {
  return request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })
}

export const deleteOrder = (ids) => {
  return request('/member/order', 'delete', { ids })
}

export const confirmOrder = (ids) => {
  return request(`/member/order/${ids}/receipt`, 'put')
}

export const logisticsOrder = (id) => {
  return request(`/member/order/${id}/logistics`, 'get')
}
