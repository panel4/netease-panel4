<template>
  <Swiper loop autoplay pagination :modules="[Autoplay, Pagination]">
    <SwiperSlide v-for="item in props.data" :key="item">
      <img :src="item" alt="" />
    </SwiperSlide>
  </Swiper>
</template>
<script setup>
import { defineProps } from "vue";
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from "swiper/vue";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/autoplay";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/pagination";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>
