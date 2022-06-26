<template>
  <div class="musicDetail">
    <img class="bgImg" :src="musiclist.al.picUrl" alt="" />
    <div class="detailTop">
      <div class="detailTopLeft">
        <svg class="icon" aria-hidden="true" @click="updateDetailShow(false)">
          <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
        </svg>
        <div class="detail">
          <Vue3Marquee class="song">
            {{ musiclist.name }}
          </Vue3Marquee>
          <div class="author">
            <span v-for="(item, index) in musiclist.ar" :key="index">{{
              item.name
            }}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangyoujiantou"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="detailTopRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="detailContent" v-show="isLyricShow">
      <img src="@/assets/cp.png" alt="" class="img_cp" />
      <img src="@/assets/cz.png" alt="" class="img_cz" :class="{img_cz_active:!isBtnShow}" />
      <img :src="musiclist.al.picUrl" alt="" class="img_al" :class="{img_al_active:!isBtnShow, img_al_paused:isBtnShow}" />
    </div>

    <div class="songLyric" ref="songLyricRef">
      <p v-for="item in lyric" :key="item" :class="{active:currentTime * 1000 >= item.time && currentTime * 1000 < item.next}">{{item.lyric}}</p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon_xiazai"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiao_xi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-"></use>
        </svg>
      </div>
      <div class="footerContent">123</div>
      <div class="footerFooter">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg
          class="icon bofang"
          aria-hidden="true"
          v-if="isBtnShow"
          @click="play"
        >
          <use xlink:href="#icon-start"></use>
        </svg>
        <svg class="icon bofang" aria-hidden="true" v-else @click="play">
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zu"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
export default {
  data(){
    return {
      isLyricShow: false
    }
  }, 
  async mounted() {
    // console.log(this.musiclist.id)
    // console.log(this.songLyric);
    console.log(this.lyric);
  },
  props: ['musiclist', 'play', 'isBtnShow', 'musiclistIndex'],
  components: {
    Vue3Marquee,
  },
  methods: {
    ...mapMutations(['updateDetailShow']),
  },
  computed:{
    ...mapState(['songLyric', 'currentTime']),
    lyric(){
      let arr
      if(this.songLyric){
        arr = this.songLyric.split(/[(\r\n)\r\n]+/).map(item => {
          let min = item.slice(1, 3)
          let sec = item.slice(4, 6)
          let mill = item.slice(7, 10)
          let lyric = item.slice(11, item.length)
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          if(isNaN(Number(mill))){
            mill = item.slice(7, 9)
            lyric = item.slice(10, item.length)
            time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          }
            // console.log(min,sec, mill, lyric);
          return {min, sec, mill, lyric, time}
        })

        arr.forEach((item, index) => {
          if(index === arr.length - 1){
            item.next = 0
          }else{
            item.next = arr[index + 1].time
          }
            
        });
      }
      return arr
    }
  },
  watch:{
    currentTime(){
      // console.log(1223);
      let p = document.querySelector("p.active")
      // console.log([p]);
      if(p.offsetTop > 300){
        this.$refs.songLyricRef.scrollTop = p.offsetTop - 300
      }
    }
  }
}
</script>

<style lang="less" scoped>
.musicDetail {
  width: 100%;
  height: 100%;
  padding: 0.2rem;

  .bgImg {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    filter: blur(70px);
  }

  .detailTop {
    position: fixed;
    top: 0;
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .detailTopLeft {
      width: 70%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon {
        width: 0.6rem;
        height: 0.6rem;
        fill: #fff;
      }

      .detail {
        display: flex;
        flex-direction: column;
        width: 80%;

        .song {
          color: #fff;
          font-size: 0.3rem;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .author {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;

          span {
            color: #111;
            font-size: 0.26rem;
          }
          .icon {
            width: 0.22rem;
            height: 0.22rem;
            margin-left: 0.06rem;
          }
        }
      }
    }

    .detailTopRight {
      .icon {
        fill: #fff;
        vertical-align: middle;
      }
    }
  }

  .detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .img_cp {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }

    .img_cz {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-13deg);
      transition: all 1s;
    }

    .img_cz_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 1s;
    }

    .img_al {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: rotate_al 30s linear infinite;
    }

    .img_al_active{
      animation-play-state: running;
    }

    .img_al_paused{
      animation-play-state: paused;
    }

    @keyframes rotate_al {
      0%{
        transform: rotateZ(0deg);
      }

      100%{
        transform: rotateZ(360deg);
      }
    }
  }

  .songLyric{
    width: 100%;
    height: 8.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.2rem;
    overflow: scroll;
    p{
      color: #ddd;
      margin-bottom: .4rem;
    }

    .active{
      font-size: .5rem;
      color: pink;
    }
  }

  .detailFooter {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    .footerTop {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        fill: #fff;
      }
    }

    .footerContent {
      width: 100%;
      height: 0.5rem;
    }

    .footerFooter {
      width: 100%;
      height: 1.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
        fill: #fff;
      }

      .bofang {
        width: 0.9rem;
        height: 0.9rem;
      }
    }
  }
}
</style>
