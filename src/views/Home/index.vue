<script setup>
import { getHomePageDataAPI } from '@/api/home'
import { ref } from 'vue'
const homePageData = ref([])
const getHomePageData = async () => {
  const res = await getHomePageDataAPI()
  homePageData.value = res.data
  console.log(res.data)
}
// 调用
getHomePageData()
</script>

<template>
  <div class="home">home</div>
</template>
