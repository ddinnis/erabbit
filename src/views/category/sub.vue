<template>
  <div class="sub-category">
    <div class="container">
      <SubBread />
      <SubFilter @filter-change="changeFilter" />
      <div class="goods-list">
        <SubSort @sort-change="sortChange" />
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <XtxInfiniteLoading
          @infinite="getData"
          :loading="loading"
          :finished="finished"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './sub-filter'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'

import { ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: { SubBread, SubSort, GoodsItem, SubFilter },
  setup() {
    const route = useRoute()

    const loading = ref(false)
    const finished = ref(false)
    const goodsList = ref([])

    let reqParams = {
      page: 1,
      pageSize: 20
    }

    const getData = () => {
      loading.value = true
      reqParams.categoryId = route.params.id
      findSubCategoryGoods(reqParams).then(({ result }) => {
        if (result.items.length) {
          goodsList.value.push(...result.items)
          reqParams.page++
        } else {
          finished.value = true
        }
        loading.value = false
      })
    }

    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === '/category/sub/' + newVal) {
          reqParams = {
            page: 1,
            pageSize: 20
          }
          finished.value = false
          goodsList.value = []
        }
      }
    )

    const sortChange = (sortParams) => {
      finished.value = false
      reqParams = { ...reqParams, ...sortParams }
      reqParams.page = 1
      goodsList.value = []
    }

    const changeFilter = (filterParams) => {
      reqParams = { ...reqParams, ...filterParams }
      reqParams.page = 1
      goodsList.value = []
      finished.value = false
    }

    return { loading, finished, goodsList, getData, sortChange, changeFilter }
  }
}
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
