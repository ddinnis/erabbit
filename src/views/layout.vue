<template>
  <AppNavBar />
  <AppHeader />
  <AppHeaderSticky />
  <main>
    <router-view></router-view>
  </main>
  <AppFooter />
</template>

<script>
import AppNavBar from '../components/app-navbar.vue'
import AppHeader from '../components/app-header.vue'
import AppFooter from '../components/app-footer.vue'
import AppHeaderSticky from '../components/app-header-sticky.vue'

import { useStore } from 'vuex'
export default {
  components: { AppNavBar, AppHeader, AppFooter, AppHeaderSticky },
  name: 'layout',
  setup() {
    const store = useStore()
    store.dispatch('category/getCategoryList')
  }
}
</script>

<style scoped lang="less"></style>
