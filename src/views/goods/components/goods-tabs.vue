<template>
  <div class="goods-tabs">
    <nav>
      <a
        :class="{ active: activeName === 'GoodsDetail' }"
        href="javascript:;"
        @click="activeName = 'GoodsDetail'"
        >商品详情</a
      >
      <a
        :class="{ active: activeName === 'GoodsComment' }"
        href="javascript:;"
        @click="activeName = 'GoodsComment'"
        >商品评价<span>({{ goods.commentCount }})</span></a
      >
    </nav>
    <component :is="activeName" />
  </div>
</template>

<script>
import { ref, inject } from 'vue'
import GoodsDetail from './goods-detail'
import GoodsComment from './goods-comment'
export default {
  name: 'GoodsTabs',
  components: { GoodsComment, GoodsDetail },
  setup() {
    const activeName = ref('GoodsDetail')
    const goods = inject('goods')

    return { activeName, goods }
  }
}
</script>

<style lang="less" scoped>
.goods-tabs {
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @themeColor;
        }
      }
    }
  }
}
</style>
