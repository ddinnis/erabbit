<template>
  <div class="member-order-detail" v-if="order">
    <DetailAction :order="order" />
    <!-- 步骤条-->
    <DetailStep :order="order" />
    <!-- 物流栏 -->
    <Suspense>
      <template #default>
        <DetailLogistics
          :order="order"
          v-if="[3, 4, 5].includes(order.orderState)"
        />
      </template>
      <template #fallback>
        <div class="loading">loading</div>
      </template>
    </Suspense>
    <!-- 订单商品信息 -->
    <OrderInfo :order="order" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { findOrder } from '@/api/order'
import { useRoute } from 'vue-router'

import XtxSteps from '@/components/library/xtx-steps.vue'
import XtxStepsItem from '@/components/library/xtx-steps-item.vue'

import DetailAction from './components/detail-action'
import DetailStep from './components/detail-step.vue'
import DetailLogistics from './components/detail-logistics.vue'
import OrderInfo from './components/order-info.vue'
export default {
  name: 'OrderDetailPage',
  components: {
    DetailAction,
    XtxStepsItem,
    XtxSteps,
    DetailStep,
    DetailLogistics,
    OrderInfo
  },
  setup() {
    const order = ref(null)
    const route = useRoute()
    findOrder(route.params.id).then((data) => {
      order.value = data.result
    })
    return { order }
  }
}
</script>

<style lang="less" scoped>
.member-order-detail {
  background: #fff;
  height: 100%;
}
.loading {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
}
</style>
