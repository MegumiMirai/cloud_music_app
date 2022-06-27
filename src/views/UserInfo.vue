<template>
  <div class="userInfo">
    <img :src="userInfo.profile.avatarUrl" alt="">
    <span>{{userInfo.profile.nickname}}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed:{
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="less" scoped>
  .userInfo{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    img{
      margin-top: 4rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
    }

    span{
      font-weight: 700;
      color: pink;
      margin-top: .2rem;
    }
  }
</style>