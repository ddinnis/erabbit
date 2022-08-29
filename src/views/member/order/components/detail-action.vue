<template>
  <div class="detail-action">
    <div class="state">
      <span
        class="iconfont"
        :class="[`icon-order-${orderStatus[order.orderState].name}`]"
      ></span>
      <p>{{ orderStatus[order.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ order.id }}</p>
      <p>下单时间：{{ order.createTime }}</p>
    </div>
    <div class="btn">
      <template v-if="order.orderState === 1">
        <XtxButton
          @click="$router.push('/member/pay?id=' + order.id)"
          type="primary"
          size="small"
          >立即付款</XtxButton
        >
        <XtxButton type="gray" size="small">取消订单</XtxButton>
      </template>
      <template v-if="order.orderState === 2">
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push('/member/pay?id=' + order.id)"
          >再次购买</XtxButton
        >
      </template>
      <template v-if="order.orderState === 3">
        <XtxButton type="primary" size="small">确认收货</XtxButton>
        <XtxButton
          type="plain"
          size="small"
          @click="$router.push('/member/pay?id=' + order.id)"
          >再次购买</XtxButton
        >
      </template>
      <template v-if="order.orderState === 4">
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push('/member/pay?id=' + order.id)"
          >再次购买</XtxButton
        >
        <XtxButton type="plain" size="small">评价商品</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
      <template v-if="order.orderState === 5">
        <XtxButton
          type="primary"
          size="small"
          @click="$router.push('/member/pay?id=' + order.id)"
          >再次购买</XtxButton
        >
        <XtxButton type="plain" size="small">查看评价</XtxButton>
        <XtxButton type="gray" size="small">申请售后</XtxButton>
      </template>
    </div>
  </div>
</template>
<script>
import { orderStatus } from '@/api/constants'
export default {
  name: 'OrderDetailAction',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    return { orderStatus }
  }
}
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @themeColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
