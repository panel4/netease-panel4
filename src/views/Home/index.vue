<script setup>
import { getHomePageDataAPI } from '@/api/home'
import { ref } from 'vue'
const homePageData = ref({})
// 获取首页数据
const getHomePageData = async () => {
  const res = await getHomePageDataAPI()
  homePageData.value = res.data
  console.log(res.data)
}
// 调用 获取首页数据方法
getHomePageData()
</script>

<template>
  <div class="home">home</div>
</template>
