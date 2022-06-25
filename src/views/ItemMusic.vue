<template>
  <div>
    <ItemMusicTop :playlist='state.playlist'></ItemMusicTop>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {onMounted, reactive} from 'vue'
import {getGeDan} from '@/request/api/item.js'
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
export default {
  setup(){
    const state = reactive({
      playlist: {}
    })
    onMounted(async () => {
      const id = useRoute().query.id
      // console.log(id);
      const {data:res} = await getGeDan(id)
      // console.log(res);
      state.playlist = res.playlist
      sessionStorage.setItem('itemDetail', JSON.stringify(state))
    })
    return { state }
  },
  components:{
    ItemMusicTop
  }
}
</script>

<style>

</style>