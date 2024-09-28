<script setup>
import { getHomePageDataAPI } from '@/api/home'
import { ref, computed } from 'vue'
const homePageData = ref({})
// 获取首页数据
const getHomePageData = async () => {
  const res = await getHomePageDataAPI()
  homePageData.value = res.data
  console.log(res.data)
}
// 调用 获取首页数据方法
getHomePageData()

// 首页轮播图数据
const bannerList = computed(
  () => homePageData.value.blocks?.[0].extInfo.banners
)
</script>

<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item">
        <van-image width="100%" height="100%" :src="item.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<style scoped></style>
