<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe
        :loop="false"
        :width="150"
        class="mySwipe"
        :show-indicators="false"
      >
        <van-swipe-item v-for="item in state.musicList" :key="item.id" class="">
          <router-link :to="{path: '/itemmusic', query:{id: item.id}}">
            <img :src="item.picUrl" alt="" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-play"></use>
              </svg>
              {{ countChange(item.playCount) }}
            </span>
            <span class="name">{{ item.name }}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/request/api/home.js'
import { reactive, onMounted } from 'vue'
export default {
  // data() {
  //   return {
  //     musicList: [],
  //   }
  // },
  // methods: {
  //   async getGeDan() {
  //     const { data: res } = await getMusicList()
  //     console.log(res.result)
  //     if (res.code !== 200) {
  //       return
  //     }
  //     this.musicList = res.result
  //     console.log(this.musicList)
  //   },
  //   countChange(num) {
  //     if (num >= 100000000) {
  //       return (num / 100000000).toFixed(1) + '亿'
  //     } else if (num >= 10000) {
  //       return (num / 10000).toFixed(1) + '万'
  //     }
  //   },
  // },
  // mounted() {
  //   this.getGeDan()
  // },
  // Vue3
  setup() {
    const state = reactive({
      musicList: [],
    })
    onMounted(async () => {
      const { data: res } = await getMusicList()
      console.log(res)
      state.musicList = res.result
    })
    function countChange(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    return {
      state,
      countChange,
    }
  },
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0 0.2rem;
  .musicTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      padding: 0 0.2rem;
      text-align: center;
      line-height: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 0.4rem;
    }
  }

  .musicContent {
    width: 100%;
    height: 3.6rem;

    .van-swipe-item {
      position: relative;
      padding-right: 0.2rem;
      height: 3.8rem;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
      }

      .playCount {
        position: absolute;
        z-index: 999;
        right: 0.3rem;
        top: 0.06rem;
        color: #fff;

        .icon {
          width: 0.3rem;
          height: 0.3rem;
          fill: #fff;
        }
      }

      .name {
        bottom: 0px;
        font-size: 0.24rem;
      }
    }
  }
}
</style>
