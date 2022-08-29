<template>
  <div class="detail-step">
    <XtxSteps :active="order.orderState === 6 ? 1 : order.orderState">
      <XtxStepsItem title="提交订单" :desc="order.createTime" />
      <XtxStepsItem title="付款成功" :desc="order.payTime" />
      <XtxStepsItem title="商品发货" :desc="order.consignTime" />
      <XtxStepsItem title="确认收货" :desc="order.endTime" />
      <XtxStepsItem title="订单完成" :desc="order.evaluationTime" />
    </XtxSteps>
  </div>
</template>
<script>
import XtxSteps from '@/components/library/xtx-steps.vue'
import XtxStepsItem from '@/components/library/xtx-steps-item.vue'

export default {
  name: 'DetailStep',
  components: { XtxSteps, XtxStepsItem },
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style scoped lang="less">
.detail-step {
  padding: 20px;
}
</style>
