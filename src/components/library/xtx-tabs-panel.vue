<template>
  <div class="xtx-tabs-panel" v-show="activeName === name">
    <slot />
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'XtxTabsPanel',
  props: {
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup() {
    const activeName = inject('activeName')
    return { activeName }
  }
}
</script>
<style scoped lang="less"></style>
