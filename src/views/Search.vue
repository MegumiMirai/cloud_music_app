<template>
  <div class="search">
    <div class="searchTop">
      <svg class="icon" aria-hidden="true" @click="$router.back()">
        <use xlink:href="#icon-a-zuojiantouzhixiangzuojiantou"></use>
      </svg>
      <input
        type="text"
        placeholder="我永远喜欢七濑未来"
        v-model.trim="searchWord"
        @keydown.enter="enterHistory"
      />
    </div>
    <div class="searchHistory">
      <div class="keyWord">
        <p>历史</p>
        <span
          v-for="item in searchHistory"
          :key="item"
          @click="searchSongByHistory(item)"
        >
          {{ item }}
        </span>
      </div>
      <svg class="icon" aria-hidden="true" @click="delHistory">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="musicItem" v-for="(item, index) in songList" :key="item.id">
      <div class="musicItemLeft" @click="updateIndex(item)">
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
    <!-- <SongList :songList="songList"></SongList> -->
    <!-- <SongList></SongList> -->
  </div>
</template>

<script>
import SongList from '@/components/item/SongList.vue'
import { searchSong } from '@/request/api/home.js'
export default {
  data() {
    return {
      searchHistory: [],
      searchWord: '',
      songList: [], // 通过搜索得到的音乐
    }
  },
  components: {
    SongList,
  },
  mounted() {
    this.searchHistory =
      JSON.parse(window.localStorage.getItem('searchHistory')) || []
  },
  methods: {
    async enterHistory() {
      if (this.searchWord === '') {
        return
      }
      // 去重
      this.searchHistory.unshift(this.searchWord)
      // console.log(...new Set(this.searchHistory));
      this.searchHistory = [...new Set(this.searchHistory)]
      // 固定长度
      if (this.searchHistory.length > 10) {
        this.searchHistory.splice(this.searchHistory.length - 1, 1)
      }
      window.localStorage.setItem(
        'searchHistory',
        JSON.stringify(this.searchHistory)
      )

      // 搜索音乐
      const { data: res } = await searchSong(this.searchWord)
      // console.log(res);
      this.songList = res.result.songs
      console.log(this.songList)
      this.searchWord = ''
    },
    delHistory() {
      window.localStorage.removeItem('searchHistory')
      this.searchHistory = []
    },
    async searchSongByHistory(item) {
      const { data: res } = await searchSong(item)
      // console.log(res.result.songs);
      this.songList = res.result.songs
    },
    updateIndex(item) {
      // console.log(item);
      this.$store.commit('pushPlayList', item)
      this.$store.commit(
        'updateMusicIndeIndex',
        this.$store.state.musiclist.length - 1
      )
    },
  },
}
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 100%;
  padding: 0.2rem;

  .searchTop {
    width: 100%;
    height: 0.7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      width: 90%;
      border: 0;
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.1rem;
      color: #666;
    }
  }

  .searchHistory {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.4rem;
    .icon {
      width: 10%;
    }

    .keyWord {
      width: 90%;

      p {
        display: inline-block;
        font-weight: 600;
      }

      span {
        padding: 0.1rem;
        background-color: pink;
        border-radius: 0.4rem;
        margin-left: 0.2rem;
        margin-bottom: 0.2rem;
        display: inline-block;
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
