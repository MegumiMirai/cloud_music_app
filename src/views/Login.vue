<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="passworld"
        class="passworld"
        v-model="password"
        placeholder="请输入密码"
      />
      <button class="btn" @click="Login">登录</button>
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/request/api/home.js'
export default {
  data() {
    return {
      phone: '',
      password: '',
    }
  },
  methods: {
    async Login() {
      const res = await this.$store.dispatch('Login', {
        phone: this.phone,
        password: this.password,
      })
      console.log(res)
      if (res.status === 200) {
        // 登录成功
        this.$store.commit('updateIsLogin', true)
        this.$router.push('/userinfo')
        this.$store.commit('updateToken', res.data.token)
        const {data: result} = await getUserInfo(res.data.account.id)
        // console.log(result)
        this.$store.commit('updateUserInfo', result)
      } else {
        alert('用户名或密码错误')
        this.password = ''
      }
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 13.34rem;
  padding: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(248, 97, 97);
  .loginTop {
    margin-top: 1rem;
    font-size: 1rem;
    color: #fff;
  }
  .loginContent {
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin-top: 2rem;
    .phone,
    .passworld {
      width: 5rem;
      height: 1rem;
      border: 0.02rem solid #999;
    }
    .btn {
      width: 2rem;
      height: 0.6rem;
    }
  }
}
</style>
