<template>
  <div>
    <ItemMusicTop :playlist='state.playlist'></ItemMusicTop>
    <ItemMusicList :musiclist="state.musiclist" :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {onMounted, reactive} from 'vue'
import {getGeDan, getAllMusic} from '@/request/api/item.js'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
export default {
  setup(){
    const state = reactive({
      playlist: {}, //歌单的详情页
      musiclist: [] //音乐列表
    })
    onMounted(async () => {
      const id = useRoute().query.id
      // console.log(id);
      // 获取歌单详情
      const {data:res} = await getGeDan(id)
      // console.log(res);
      state.playlist = res.playlist
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
      // 获取歌曲列表
      const {data: res1} = await getAllMusic(id)
      // console.log(res1.songs);
      state.musiclist = res1.songs
      // console.log(state.musiclist);
    })
    return { state }
  },
  components:{
    ItemMusicTop,
    ItemMusicList
  }
}
</script>

<style>

</style>