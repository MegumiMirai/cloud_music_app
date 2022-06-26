import { createStore } from 'vuex'
import { getSong } from '@/request/api/item.js'

export default createStore({
  state: {
    musiclist: [
      {
        //播放列表
        al: {
          id: 36233282,
          name: 'You',
          pic: 109951164502635070,
          picUrl:
            'https://p2.music.126.net/MVevKfyCw8InBCEmWX1NoQ==/109951164502635067.jpg',
          pic_str: '109951164502635067',
        },
        id: 506520164,
        name: 'You',
        ar:[
          {
            name: '千坂'
          }
        ]
      },
    ],
    musiclistIndex: 0, //默认下标为0
    isBtnShow: true, //暂停按钮的显示
    detailShow: false, // 音乐详情页开关
    songLyric: {}, // 歌词
    currentTime: 0 // 播放音乐的当前时间
  },
  getters: {},
  mutations: {
    isBtnShowChange(state, status){
      state.isBtnShow = status
    },
    updateMusicList(state, musiclist){
      state.musiclist = musiclist
    },
    updateMusicIndeIndex(state, index){
      state.musiclistIndex = index
    },
    updateDetailShow(state){
      state.detailShow = !state.detailShow
    },
    updateSongLyric(state, lyric){
      state.songLyric = lyric
    },
    updateCurrentTime(state, time){
      state.currentTime = time
      console.log(time);
    }
  },
  actions: {
    async getSongLyric(context ,id){
      const {data: res} = await getSong(id)
      console.log(res);
      context.commit('updateSongLyric', res.lrc.lyric)
    }
  },
  modules: {},
})
