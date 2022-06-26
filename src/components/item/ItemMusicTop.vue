<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgImg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
        <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
  </div>
  <div class="itemTopContent">
    <div class="contentImg">
      <img :src="playlist.coverImgUrl" alt="" />
      <span class="playCount">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-play"></use>
        </svg>
        {{ countChange(playlist.playCount) }}
      </span>
    </div>
    <div class="contextDetail">
      <div>
        <h4 class="title">{{ playlist.name }}</h4>
      </div>
      <div class="user">
        <img :src="playlist.creator.avatarUrl" alt="" />
        <span>{{ playlist.creator.nickname }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
      <div class="description">
        <span>{{ playlist.description }}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
    </div>
  </div>
  <div class="itemTopFooter">
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiao_xi"></use>
      </svg>
      <span>{{playlist.commentCount}}</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{playlist.shareCount}}</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-icon_xiazai"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xuanzeb"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { getAllMusic } from '@/request/api/item.js'
export default {
  setup(props) {
    if ((props.playlist.creator = '')) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem('itemDetail').playlist
      ).creator
    }
    // console.log(props)
    function countChange(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + '亿'
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + '万'
      }
    }
    return { countChange }
  },
  props: ['playlist'],
}
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  // padding: .2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .itemLeft,
  .itemRight {
    margin: 0 0.2rem;
    height: 100%;
    width: 25%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 0.4rem;
      color: #fff;
    }

    .icon {
      fill: #fff;
    }
  }

  .bgImg {
    width: 100%;
    height: 11rem;
    position: fixed;
    z-index: -1;
    filter: blur(30px);
  }
}

.itemTopContent {
  width: 100%;
  height: 3rem;
  margin-top: 0.4rem;
  padding: 0 0.2rem;
  display: flex;
  justify-content: space-between;

  .contentImg {
    width: 36%;
    height: 2.6rem;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      border-radius: 0.2rem;
    }
    .playCount {
      position: absolute;
      top: 0.1rem;
      right: 0.2rem;
      color: #fff;
      font-size: 0.3rem;

      .icon {
        fill: #fff;
        width: 0.26rem;
        height: 0.26rem;
      }
    }
  }

  .contextDetail {
    width: 64%;
    height: 2.6rem;
    padding-left: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 0.28rem;
      color: #fff;
    }

    .user {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
      }

      span {
        margin: 0 0.1rem;
        color: #ccc;
      }

      .icon {
        width: 0.25rem;
        height: 0.25rem;
        fill: #fff;
        vertical-align: middle;
        margin-top: 0.02rem;
      }
    }

    .description {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        width: 95%;
        height: 100%;
        color: #fff;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.24rem;
      }

      .icon {
        width: 0.2rem;
        height: 0.2rem;
        fill: #fff;
        margin-left: 0.1rem;
      }
    }
  }
}

.itemTopFooter{
  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-around;
  .item{
    display: flex;
    flex-direction: column;
    align-items: center;

    span{
      color: #fff;
      font-size: .26rem;
    }

    .icon{
      margin-bottom: .1rem;
      fill: #fff;
    }
  }
}
</style>
