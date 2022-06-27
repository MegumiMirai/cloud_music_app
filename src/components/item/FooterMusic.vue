<template>
  <div class="footerMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="musiclist[musiclistIndex].al.picUrl" alt="" />
      <div class="gequ">
        <h4>{{ musiclist[musiclistIndex].name }}</h4>
        <span>横滑可以切换上下首哦</span>
      </div>
    </div>

    <div class="footerRight">
      <svg class="icon" aria-hidden="true" @click="play" v-if="isBtnShow">
        <use xlink:href="#icon-icon_bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-weibiaoti--"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu"></use>
      </svg>
    </div>
    <audio
      ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${musiclist[musiclistIndex].id}.mp3`"
    ></audio>
    <van-popup
      v-model:show="detailShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <MusicDetail :musiclist="musiclist[musiclistIndex]" :isBtnShow="isBtnShow" :play="play" :musiclistIndex="musiclistIndex" :addDuration="addDuration"></MusicDetail>
    </van-popup>
  </div>
</template>

<script>
import MusicDetail from '@/components/item/MusicDetail.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  data(){
    return {
      timer : null
    }
  },
  computed: {
    ...mapState(['musiclist', 'musiclistIndex', 'isBtnShow', 'detailShow']),
  },
  mounted() {
    // console.log(this.$refs);
    // this.$refs.bofang.autoplay = true
    // console.log(this.musiclist);
    // console.log(this.musiclist[this.musiclistIndex].id);
    this.$store.dispatch('getSongLyric', this.musiclist[this.musiclistIndex].id)
    // this.updateTime()
  },
  updated(){
    this.$store.dispatch('getSongLyric', this.musiclist[this.musiclistIndex].id)
    this.addDuration()
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.isBtnShowChange(false)
        this.updateTime() // 音乐开始就开启定时器
      } else {
        this.$refs.audio.pause()
        this.isBtnShowChange(true)
        clearInterval(this.timer) // 音乐暂停就清除定时器
      }
    },
    addDuration(){
      this.updateDuration(this.$refs.audio.duration)
    },
    updateTime(){
      this.timer = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 1000)
    },
    ...mapMutations(['isBtnShowChange', 'updateDetailShow', 'updateCurrentTime', 'updateDuration']),
  },
  watch: {
    musiclistIndex() {
      // 如果播放的歌曲的下标发生变化，自动播放音乐
      this.$refs.audio.autoplay = true
      // 如果当前是暂停的状态，要改变播放的图标
      this.isBtnShowChange(false)

      // this.updateTime()
      this.play()
      this.$store.dispatch('getSongLyric', this.musiclist[this.musiclistIndex].id)
    },
    musiclist() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.autoplay = true
        this.isBtnShowChange(false)
      }
       this.$store.dispatch('getSongLyric', this.musiclist[this.musiclistIndex].id)
    },
  },
  components:{
    MusicDetail
  }
}
</script>

<style lang="less" scoped>
.footerMusic {
  height: 1.2rem;
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 9999;
  border-top: 1px solid #999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.2rem;

  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      margin-right: 0.1rem;
    }

    .gequ {
      font-size: 0.26rem;

      h4 {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      span {
        color: #aaa;
      }
    }
  }

  .footerRight {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>
