<template>
  <div class="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { reactive, onMounted } from '@vue/runtime-core'
import { getBanner } from '@/request/api/home.js'
export default {
  name: 'SwiperTop',
  setup() {
    const state = reactive({
      images: [
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
        'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
      ],
    })
    onMounted(async () => {
      // const {data: res} = await this.$http.get('/banner?type=2')
      // // console.log(res);
      // if(res.code !== 200){
      //   return
      // }
      // state.images = res.banners

      const { data: res } = await getBanner()
      if (res.code !== 200) {
        return
      }
      state.images = res.banners
    })
    return { state }
  },
}
</script>

<style lang="less" scoped>
.swiperTop {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe__track {
      .van-swipe-item {
        padding: 0.2rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 0.2rem;
        }
      }
    }
  }

  /deep/ .van-swipe__indicator--active {
    background-color: rgb(219, 130, 130);
  }
}
</style>
