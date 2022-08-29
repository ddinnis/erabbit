<template>
  <div class="home-entry">
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
  </div>
  <HomeNew />
  <HomeHot />
  <HomeBrand />
  <HomeProduct />
  <HomeSpecial />
</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner.vue'
import HomeNew from './components/home-new.vue'
import HomeHot from './components/home-hot.vue'
import HomeBrand from './components/home-brand.vue'
import HomeGoods from './components/home-goods.vue'
import HomeProduct from './components/home-product'
import HomeSpecial from './components/home-special.vue'

export default {
  name: 'PageHome',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeGoods,
    HomeProduct,
    HomeSpecial
  }
}
</script>
<style scoped lang="less"></style>
