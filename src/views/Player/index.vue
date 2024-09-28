<template>
  <!-- 歌词播放器组件 -->
  <div class="lyrics-player">
    <!-- 顶部导航栏，包括返回按钮、歌曲信息、刷新按钮 -->
    <div class="header">
      <!-- 返回按钮 -->
      <Icon icon="mdi:chevron-left" @click="goBack" />
      <!-- 歌曲信息展示 -->
      <div class="song-info">
        <h1>{{ songTitle }}</h1>
        <!-- 歌曲标题 -->
        <p>{{ artist }} <span class="follow">关注</span></p>
        <!-- 歌手名称及关注按钮 -->
      </div>
      <!-- 刷新按钮 -->
      <Icon icon="mdi:refresh" @click="refresh" />
    </div>

    <!-- 标签页切换，当前默认显示歌词 -->
    <div class="tabs">
      <span class="active">歌词</span>
      <span>百科</span>
    </div>

    <!-- 歌词显示区域，使用 v-for 渲染每一行歌词 -->
    <div class="lyrics-container" ref="lyricsContainer">
      <p
        v-for="(line, index) in parsedLyrics"
        :key="index"
        :class="{ active: currentLineIndex === index }"
        :ref="
          el => {
            if (el) lyricsRefs[index] = el
          }
        ">
        {{ line.text }}
        <!-- 歌词文本 -->
      </p>
    </div>

    <!-- 播放器控制区域，包括进度条、时间信息、控制按钮等 -->
    <div class="player-controls">
      <!-- 进度条，支持点击和触摸拖动来调整播放进度 -->
      <div
        class="progress-bar"
        @click="seek"
        @touchstart="startSeek"
        @touchmove="updateSeek"
        @touchend="endSeek">
        <!-- 进度条背景 -->
        <div class="progress" :style="{ width: `${progress}%` }"></div>
        <!-- 当前进度显示 -->
        <!-- 进度条拖动手柄 -->
        <div class="progress-handle" :style="{ left: `${progress}%` }"></div>
      </div>
      <!-- 当前时间和总时长显示 -->
      <div class="time-info">
        <span>{{ formatTime(currentTime) }}</span>
        <!-- 当前时间 -->
        <span>{{ formatTime(duration) }}</span>
        <!-- 总时长 -->
      </div>

      <!-- 播放控制按钮，包括重复、上一曲、播放/暂停、下一曲、播放列表 -->
      <div class="control-buttons">
        <Icon icon="mdi:repeat" />
        <!-- 重复播放按钮 -->
        <Icon icon="mdi:skip-previous" @click="previousTrack" />
        <!-- 上一曲按钮 -->
        <Icon icon="mdi:pause" v-if="isPlaying" @click="togglePlay" />
        <!-- 播放中显示暂停按钮 -->
        <Icon icon="mdi:play" v-else @click="togglePlay" />
        <!-- 暂停中显示播放按钮 -->
        <Icon icon="mdi:skip-next" @click="nextTrack" />
        <!-- 下一曲按钮 -->
        <Icon icon="mdi:playlist-music" />
        <!-- 播放列表按钮 -->
      </div>

      <!-- 附加功能按钮，包括耳机、下载、更多选项 -->
      <div class="additional-controls">
        <Icon icon="mdi:headphones" />
        <!-- 耳机图标 -->
        <Icon icon="mdi:download" />
        <!-- 下载图标 -->
        <Icon icon="mdi:dots-horizontal" />
        <!-- 更多选项图标 -->
      </div>
    </div>

    <!-- 音频播放器，绑定相关事件 -->
    <audio
      ref="audioPlayer"
      :src="audioUrl"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onAudioLoaded"
      @ended="onAudioEnded"></audio>
  </div>
</template>

<script setup>
// 引入 Vue 的核心 API
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { Icon } from '@iconify/vue'

// 歌曲相关信息
const songTitle = ref('情人') // 歌曲标题
const artist = ref('Beyond') // 歌手名称
const audioUrl = ref(
  'http://m801.music.126.net/20240927174548/370cab7fd04440f938e5675603a2ab4f/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/31389357828/a990/e04f/2c77/904ba39748cdf1622100cbdfecaa00d4.flac'
) // 音频 URL
const lyrics = ref(
  // 歌词内容，带时间戳
  '[00:16.71]你的爱像幻境把我的心囚禁\n[00:20.79]我开始分不清你口中的真心\n[00:24.93]哪怕玫瑰凋零哪怕烟火散尽\n[00:29.04]都没能等到你转意回心\n[00:33.21]我好像甘愿搁浅的鱼\n[00:36.33]在你的沙漠死磕到底\n[00:41.49]你好像没有答案的迷\n[00:44.61]我再怎么努力都没能够让你满意\n[00:49.56]风带走我的思念\n[00:51.90]乌云在头顶盘旋\n[00:53.94]眼泪和过去从此告别\n[00:57.78]你冷淡的像场雪\n[01:00.12]掩埋了曾经一切\n[01:02.19]把曾经回忆全都冻结\n[01:22.92]你的爱像幻境把我的心囚禁\n[01:27.03]我开始分不清你口中的真心\n[01:31.14]哪怕玫瑰凋零哪怕烟火散尽\n[01:35.25]都没能等到你转意回心\n[01:39.45]我好像甘愿搁浅的鱼\n[01:42.54]在你的沙漠死磕到底\n[01:47.73]你好像没有答案的迷\n[01:50.85]我再怎么努力都没能够让你满意\n[01:55.74]风带走我的思念\n[01:58.11]乌云在头顶盘旋\n[02:00.12]眼泪和过去从此告别\n[02:03.99]你冷淡的像场雪\n[02:06.33]掩埋了曾经一切\n[02:08.40]把曾经回忆全都冻结\n'
)

// 解析歌词内容，转换为带时间戳和文本的数组
const parsedLyrics = computed(() => {
  return lyrics.value
    .split('\n') // 按行分割歌词
    .map(line => {
      // 使用正则解析时间戳和歌词文本
      const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2})\](.*)/)
      console.log(match)
      if (match) {
        const [, minutes, seconds, centiseconds, text] = match
        return {
          time:
            parseInt(minutes) * 60 +
            parseInt(seconds) +
            parseInt(centiseconds) / 100, // 计算时间戳为秒数
          text: text.trim() // 歌词文本
        }
      }
      return null
    })
    .filter(Boolean) // 过滤掉无效的行
})
console.log(parsedLyrics)

// 音频和播放状态相关变量
const audioPlayer = ref(null) // 音频播放器引用
const currentTime = ref(0) // 当前播放时间
const duration = ref(0) // 音频总时长
const isPlaying = ref(false) // 播放状态
const currentLineIndex = ref(0) // 当前歌词行的索引
const lyricsRefs = ref([]) // 用于追踪每行歌词元素的引用
const lyricsContainer = ref(null) // 歌词容器引用

// 进度条百分比，基于当前时间和总时长计算
const progress = computed(() => (currentTime.value / duration.value) * 100 || 0)

// 是否正在拖动进度条
let seekingTouch = false

// 组件挂载时，添加音频事件监听器
onMounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.addEventListener('play', () => (isPlaying.value = true))
    audioPlayer.value.addEventListener('pause', () => (isPlaying.value = false))
  }
})

// 组件卸载时，移除音频事件监听器
onUnmounted(() => {
  if (audioPlayer.value) {
    audioPlayer.value.removeEventListener(
      'play',
      () => (isPlaying.value = true)
    )
    audioPlayer.value.removeEventListener(
      'pause',
      () => (isPlaying.value = false)
    )
  }
})

// 更新当前显示的歌词行
function updateLyrics() {
  for (let i = parsedLyrics.value.length - 1; i >= 0; i--) {
    if (currentTime.value >= parsedLyrics.value[i].time) {
      currentLineIndex.value = i // 更新当前歌词行
      scrollToCurrentLyric() // 滚动到当前歌词
      break
    }
  }
}

// 滚动歌词，使当前行居中显示
function scrollToCurrentLyric() {
  if (lyricsRefs.value[currentLineIndex.value]) {
    lyricsRefs.value[currentLineIndex.value].scrollIntoView({
      behavior: 'smooth', // 平滑滚动
      block: 'center' // 滚动到容器中央
    })
  }
}

// 点击进度条调整播放进度
function seek(event) {
  const rect = event.target.getBoundingClientRect() // 获取进度条位置
  const x = event.clientX - rect.left // 获取点击位置
  const clickedValue = (x / rect.width) * duration.value // 计算点击对应的时间
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = clickedValue // 跳转到点击的时间
  }
}

// 触摸开始拖动进度条
function startSeek(event) {
  seekingTouch = true
}

// 触摸过程中更新进度条
function updateSeek(event) {
  if (seekingTouch) {
    const rect = event.target.getBoundingClientRect()
    const x = event.touches[0].clientX - rect.left
    const newTime = (x / rect.width) * duration.value
    if (audioPlayer.value) {
      audioPlayer.value.currentTime = Math.max(
        0,
        Math.min(newTime, duration.value)
      ) // 限制时间范围
    }
  }
}

// 触摸结束，结束拖动
function endSeek() {
  seekingTouch = false
}

// 格式化时间为 mm:ss 格式
function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

// 播放/暂停控制
function togglePlay() {
  if (audioPlayer.value) {
    if (isPlaying.value) {
      audioPlayer.value.pause() // 暂停播放
    } else {
      audioPlayer.value.play() // 开始播放
    }
  }
}

// 播放进度更新时触发，更新当前时间和歌词
function onTimeUpdate() {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime // 更新当前播放时间
    updateLyrics() // 更新当前显示歌词
  }
}

// 音频加载完毕时获取音频总时长
function onAudioLoaded() {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration // 获取音频总时长
  }
}

// 播放结束时重置状态
function onAudioEnded() {
  isPlaying.value = false
  currentTime.value = 0
}

// 返回按钮的功能
function goBack() {
  console.log('Go back') // 实现导航逻辑
}

// 刷新按钮的功能
function refresh() {
  console.log('Refresh') // 实现刷新逻辑
}

// 上一曲按钮的功能
function previousTrack() {
  console.log('Previous track') // 实现上一曲逻辑
}

// 下一曲按钮的功能
function nextTrack() {
  console.log('Next track') // 实现下一曲逻辑
}

// 监听播放状态的变化，自动播放/暂停
watch(isPlaying, newValue => {
  if (newValue) {
    audioPlayer.value?.play()
  } else {
    audioPlayer.value?.pause()
  }
})
</script>

<style lang="scss" scoped>
.lyrics-player {
  background-color: #2c2c2c;
  color: #ffffff;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .song-info {
    text-align: center;

    h1 {
      font-size: 18px;
      margin: 0;
    }

    p {
      font-size: 14px;
      color: #999;
      margin: 5px 0 0;

      .follow {
        color: #007aff;
      }
    }
  }
}

.tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;

  span {
    padding: 5px 15px;
    margin: 0 10px;
    font-size: 14px;
    color: #999;

    &.active {
      color: #ffffff;
      border-bottom: 2px solid #ffffff;
    }
  }
}

.lyrics-container {
  height: 50vh;
  overflow-y: auto;
  text-align: center;
  transition: all 1s linear;

  p {
    font-size: 16px;
    line-height: 1.6;
    margin: 20px 0;
    color: #999;

    &.active {
      color: #ffffff;
      font-size: 18px;
    }
  }
}

.player-controls {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: #2c2c2c;

  .progress-bar {
    height: 4px;
    background-color: #4a4a4a;
    margin-bottom: 10px;
    position: relative;

    .progress {
      height: 100%;
      background-color: #ffffff;
    }

    .progress-handle {
      width: 12px;
      height: 12px;
      background-color: #ffffff;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .time-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }

  .control-buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .icon {
      font-size: 24px;
    }
  }

  .additional-controls {
    display: flex;
    justify-content: space-between;

    .icon {
      font-size: 20px;
    }
  }
}
</style>
