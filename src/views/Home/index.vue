<script setup>
import { getHomePageDataAPI, getBanner, getMenu } from "@/api/home";
import { ref } from "vue";
import StyleRcmd from "./components/StyleRcmd.vue";
import Menu from "./Menu.vue";
import PlayListPcmd from "./components/PlayListPcmd.vue";
import SearchPage from "./SearchPage.vue";
import MgcPlaylst from "./components/MgcPlaylst.vue";
import NewSong from "./components/NewSong.vue";
import OfficialPlaylist from "./components/OfficialPlaylist.vue";
import ListenLive from "./components/ListenLive.vue";
import MusicCalenda from "./components/MusicCalenda.vue";
// const homePageData = ref({});
const banner = ref();
const menu = ref();
const STYLE_RCMD = ref([]);
const LISTEN_LIVE = ref([]);
const LISTEN_LIVE_Title = ref("");
const MGC_PLAYLIST = ref([]);
const PLAYLIST_RCMD = ref([]);
const NEW_SONG = ref([]);
const MGC_PLAYLIST_Title = ref("");
const PLAYLIST_RCMD_Title = ref("");
const STYLE_RCMD_Title = ref("");
const NEW_SONG_Title = ref("");
const OFFICIAL_PLAYLIST = ref([]);
const OFFICIAL_PLAYLIST_Title = ref("");
const MGC_PLAYLIST_Action = ref("");
const STYLE_RCMD__Action = ref("");
const MUSIC_CALENDA = ref([]);
const MUSIC_CALENDA_Title = ref("");

// 获取首页数据
const getHomePageData = async () => {
  const res = await getHomePageDataAPI();
  console.log(res);
  // homePageData.value = res.data;
  console.log(res.data.blocks[0].creatives);

  PLAYLIST_RCMD.value = res.data.blocks[0]?.creatives
    ?.map((item) => {
      PLAYLIST_RCMD_Title.value = res.data.blocks[0]?.uiElement.subTitle.title;
      return item.resources;
    })
    .flat(2);

  console.log(res.data.blocks[1].creatives);
  STYLE_RCMD.value = res.data.blocks[1]?.creatives
    ?.map((item) => {
      STYLE_RCMD_Title.value = res.data.blocks[1]?.uiElement.subTitle.title;
      STYLE_RCMD__Action.value = res.data.blocks[1]?.uiElement.button.action;
      return item.resources;
    })
    .flat(2);

  MGC_PLAYLIST.value = res.data.blocks[2]?.creatives
    ?.map((item) => {
      MGC_PLAYLIST_Title.value = res.data.blocks[2]?.uiElement.subTitle.title;
      MGC_PLAYLIST_Action.value = res.data.blocks[2]?.uiElement.button.action;
      return item.resources;
    })
    .flat(2);

  NEW_SONG.value = res.data.blocks[4]?.creatives
    ?.map((item) => {
      NEW_SONG_Title.value = res.data.blocks[4]?.creatives.resource;

      return item.resources;
    })
    .flat(2);

  LISTEN_LIVE.value = res.data.blocks[3]?.extInfo
    ?.map((item) => {
      LISTEN_LIVE_Title.value = res.data.blocks[3].uiElement.subTitle.title;
      return item.resources;
    })
    .flat(2);

  OFFICIAL_PLAYLIST.value = res.data.blocks[5]?.creatives
    ?.map((item) => {
      OFFICIAL_PLAYLIST_Title.value =
        res.data.blocks[5]?.uiElement.subTitle.title;
      return item.resources;
    })
    .flat(2);

  MUSIC_CALENDA.value = res.data.blocks[6]?.creatives
    ?.map((item) => {
      MUSIC_CALENDA_Title.value = res.data.blocks[6]?.uiElement.mainTitle.title;
      return item.resources;
    })
    .flat(2);
};

// 调用 获取首页数据方法
getHomePageData();

// // 首页轮播图数据
// const bannerList = computed(
//   () => homePageData.value.blocks?.[0].extInfo.banners
// );
getBanner()
  .then((res) => {
    banner.value = res.banners;
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
getMenu()
  .then((res) => {
    menu.value = res.data;
    console.log(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

const props = defineProps({
  menu: {
    type: Array,
  },
});
</script>

<template>
  <SearchPage />
  <div class="home">
    <van-swipe
      autoplay="3000"
      indicator-color="white"
      class="w-[91.709vw] h-[35.897vw] rounded-[5vw] mx-auto"
    >
      <!-- <van-swipe-item v-for="item in bannerList" :key="item">
        <van-image width="100%" height="100%" :src="item.pic" />
      </van-swipe-item> -->
      <van-swipe-item v-for="item in banner" :key="item">
        <!-- <van-image width="100%" height="100%" :src="item.imageUrl" /> -->
        <img :src="item.imageUrl" alt="" class="w-full h-full object-cover" />
      </van-swipe-item>
    </van-swipe>
    <Menu :menu="menu" />

    <!-- 推荐歌单 -->
    <!-- <BetterScroll
      :config="{ scrollX: true, scrollY: false }"
      :dep="homePageData"
    >
      <div
        v-for="item in homePageData"
        class="title flex flex-col items-center w-[40vw] h-[60vw]"
      >
        <img
          :src="item.uiElement.image.imageUrl"
          alt=""
          class="rounded-[20px] w-[32vw] h-[32vw]"
        />
        {{ item.uiElement.mainTitle.title }}
      </div>
    </BetterScroll> -->
    <PlayListPcmd :data="PLAYLIST_RCMD" :title="PLAYLIST_RCMD_Title" />
    <StyleRcmd :data="STYLE_RCMD" :title="STYLE_RCMD_Title" />
    <MgcPlaylst :data="MGC_PLAYLIST" :title="MGC_PLAYLIST_Title" />
    <ListenLive :data="LISTEN_LIVE" />
    <NewSong :data="NEW_SONG" :title="NEW_SONG_Title" />
    <OfficialPlaylist
      :data="OFFICIAL_PLAYLIST"
      :title="OFFICIAL_PLAYLIST_Title"
    />
    <MusicCalenda :data="MUSIC_CALENDA" :title="MUSIC_CALENDA_Title" />
  </div>
</template>

<style scoped></style>
