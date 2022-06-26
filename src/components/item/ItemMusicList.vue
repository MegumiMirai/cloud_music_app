<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="musicTopLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg>
        <span>
          <h4>播放全部</h4>
          (共{{ musiclist.length }}首)
        </span>
      </div>
      <div class="subscribedCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-taskjiahao"></use>
        </svg>
        <span>收藏({{ subscribedCount }})</span>
      </div>
    </div>
    <div class="musicItem" v-for="(item, index) in musiclist" :key="item.id">
      <div class="musicItemLeft" @click="playmusic(index)">
        <span>{{ index + 1 }}</span>
        <div class="musicNameAuthor">
          <h4>{{ item.name }}</h4>
          <div>
            <span v-for="(author, i) in item.ar" :key="i">{{
              author.name
            }}</span>
          </div>
        </div>
      </div>
      <div class="musicItemRight">
        <svg class="icon" aria-hidden="true" v-if="item.mv !== 0">
          <use xlink:href="#icon-shipin1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  setup(props) {
    console.log(props)
  },
  props: ['musiclist', 'subscribedCount'],
  methods: {
    playmusic(index) {
      this.updateMusicList(this.musiclist)
      this.updateMusicIndeIndex(index)
    },
    ...mapMutations(['updateMusicList', 'updateMusicIndeIndex']),
  },
}
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 0.4rem 0.4rem 0 0;
  padding: 0 0.2rem;

  .musicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .musicTopLeft {
      width: 45%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span {
        display: flex;
        align-items: baseline;
        color: #666;
        font-size: 0.24rem;

        h4 {
          color: #000;
          font-size: 0.32rem;
        }
      }
    }

    .subscribedCount {
      height: 0.8rem;
      // width: 100%;
      padding: 0.1rem 0.2rem;
      background-color: red;
      border-radius: 0.4rem;
      display: flex;
      align-items: center;
      color: #fff;
      .icon {
        fill: #fff;
        width: 0.32rem;
        height: 0.32rem;
        margin-right: 0.1rem;
        margin-top: 0.04rem;
      }
    }
  }

  .musicItem {
    height: 1rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem 0;

    .musicItemLeft {
      width: 75%;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .musicNameAuthor {
        margin-left: 0.2rem;
        font-size: 0.24rem;

        h4 {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        div {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          span {
            color: #999;
            font-size: 0.22rem;
            margin-right: 0.1rem;
          }
        }
      }
    }

    .musicItemRight {
      width: 20%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .icon {
        width: 0.4rem;
        height: 0.4rem;
        fill: #aaa;
        margin-left: 0.3rem;
      }
    }
  }
}
</style>
