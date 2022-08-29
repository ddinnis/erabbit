<template>
  <div class="member-order-page">
    <XtxTabs v-model="activeName" @tab-click="changeTab">
      <XtxTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :name="item.name"
        :label="item.label"
        >{{ item.label }}</XtxTabsPanel
      >
    </XtxTabs>
    <!-- 订单列表 -->
    <div class="order-list">
      <div v-if="loading" class="loading"></div>
      <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
      <OrderItem
        @on-cancel="handlerCancel"
        @on-delete="handlerDelete"
        @on-confirm="handlerConfirm"
        @on-logistics="handlerLogistics"
        v-for="item in orderList"
        :key="item.id"
        :order="item"
      />
    </div>
    <XtxPagination
      v-if="total > requestParams.pageSize"
      @current-change="requestParams.page = $event"
      :total="total"
      :page-size="requestParams.pageSize"
      :current-page="requestParams.page"
    />
    <OrderCancel ref="orderCancelCom" />
    <OrderLogistics ref="logisticsOrderCom" />
  </div>
</template>
<script>
import { orderStatus } from '@/api/constants'
import { reactive, ref, watch } from 'vue'
import { findOrderList, deleteOrder, confirmOrder } from '@/api/order'

import XtxPagination from '@/components/library/xtx-pagination.vue'
import OrderItem from './components/order-item'
import OrderCancel from './components/order-cancel.vue'
import OrderLogistics from './components/order-logistics.vue'

import Confirm from '@/components/library/Confirm'
import Message from '@/components/library/Message'
export default {
  name: 'MemberOrder',
  components: { OrderItem, XtxPagination, OrderCancel, OrderLogistics },
  setup() {
    const activeName = ref('all')
    const loading = ref(true)
    const orderList = ref([])
    const total = ref(0)

    const requestParams = reactive({
      page: 1,
      pageSize: 5,
      orderState: 0
    })

    const changeTab = ({ index }) => {
      requestParams.page = 1
      requestParams.orderState = index
    }

    const getOrderList = () => {
      loading.value = true
      findOrderList(requestParams).then((data) => {
        orderList.value = data.result.items
        loading.value = false
        total.value = data.result.counts
      })
    }

    watch(
      requestParams,
      () => {
        getOrderList()
      },
      { immediate: true }
    )

    const handlerDelete = (item) => {
      Confirm({ text: '您确认删除该条订单吗？' })
        .then(() => {
          deleteOrder([item.id]).then(() => {
            Message({ text: '删除订单成功', type: 'success' })
            getOrderList()
          })
        })
        .catch((e) => {})
    }
    return {
      activeName,
      orderStatus,
      changeTab,
      requestParams,
      orderList,
      loading,
      total,
      handlerDelete,
      ...useCancel(),
      ...useConfirm(),
      ...useLogisticsOrder()
    }
  }
}

export const useCancel = () => {
  const orderCancelCom = ref(null)
  const handlerCancel = (order) => {
    orderCancelCom.value.open(order)
  }
  return { handlerCancel, orderCancelCom }
}

export const useConfirm = () => {
  const handlerConfirm = (item) => {
    Confirm({ text: '您确认收到货吗？确认后货款将会打给卖家。' }).then(() => {
      confirmOrder(item.id).then(() => {
        Message({ text: '确认收货成功', type: 'success' })
        item.orderState = 4
      })
    })
  }
  return { handlerConfirm }
}

export const useLogisticsOrder = () => {
  const logisticsOrderCom = ref(null)
  const handlerLogistics = (item) => {
    logisticsOrderCom.value.open(item)
  }
  return { handlerLogistics, logisticsOrderCom }
}
</script>
<style scoped lang="less">
.order-list {
  padding: 20px;
  position: relative;
  min-height: 400px;
}
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
.member-order-page {
  height: 100%;
  background: #fff;
}
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @themeColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @themeColor;
          }
        }
      }
    }
  }
}
</style>
