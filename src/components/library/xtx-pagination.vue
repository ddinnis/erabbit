<template>
  <div class="xtx-pagination">
    <a v-if="myCurrentPage <= 1" href="javascript:;" class="disabled">上一页</a>
    <a v-else href="javascript:;" @click="changePage(myCurrentPage - 1)"
      >上一页</a
    >
    <span v-if="pager.start > 1">...</span>
    <a
      href="javascript:;"
      @click="changePage((myCurrentPage = i))"
      :class="{ active: i === myCurrentPage }"
      v-for="i in pager.btnArr"
      :key="i"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      v-if="myCurrentPage >= pager.pageCount"
      href="javascript:;"
      class="disabled"
      >下一页</a
    >
    <a v-else href="javascript:;" @click="changePage(myCurrentPage + 1)"
      >下一页</a
    >
  </div>
</template>
<script>
import { emit } from 'process'
import { ref, computed, watch } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup(props, { emit }) {
    const myTotal = ref(100)
    const myPageSize = ref(10)
    const myCurrentPage = ref(1)
    const btnCount = 5

    const pager = computed(() => {
      const pageCount = Math.ceil(myTotal.value / myPageSize.value)
      let start = myCurrentPage.value - Math.floor(btnCount / 2)
      let end = start + btnCount - 1
      if (start < 1) {
        start = 1
        end =
          start + btnCount - 1 > pageCount ? pageCount : start + btnCount - 1
      }
      if (end > pageCount) {
        end = pageCount
        start = end - btnCount + 1 < 1 ? 1 : end - btnCount + 1
      }
      const btnArr = []
      for (let i = start; i <= end; i++) {
        btnArr.push(i)
      }
      return { pageCount, start, end, btnArr }
    })
    const changePage = (newPage) => {
      myCurrentPage.value = newPage
      emit('current-change', newPage)
    }
    watch(
      props,
      () => {
        myTotal.value = props.total
        myPageSize.value = props.pageSize
        myCurrentPage.value = props.currentPage
      },
      { immediate: true }
    )
    return { pager, myCurrentPage, changePage }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @themeColor;
    }
    &.active {
      background: @themeColor;
      color: #fff;
      border-color: @themeColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
