<template>
  <div class="musicItem" v-for="(item, index) in songList" :key="item.id">
    <div class="musicItemLeft" @click="playmusic(index)">
      <span>{{ index + 1 }}</span>
      <div class="musicNameAuthor">
        <h4>{{ item.name }}</h4>
        <div>
          <span v-for="(author, i) in item.ar" :key="i">{{ author.name }}</span>
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
</template>

<script>
export default {
  props: ['songList']
}
</script>

<style lang="less" scoped>
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
</style>
