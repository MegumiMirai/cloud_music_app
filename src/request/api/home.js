import service from "..";
export function getBanner(){
  return service({
    method: 'GET',
    url: '/banner?type=2'
  })
}

export function getMusicList(){
  return service({
    method: 'GET',
    url: '/personalized?limit=10'
  })
}

// 根据关键词搜索内容
export function searchSong(keyword){
  return service({
    method: 'GET',
    url: '/cloudsearch?keywords=' + keyword
  })
}

// 根据手机号登录
export function phoneLogin(data){
  return service({
    method: 'GET',
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}

// 获取用户详情
export function getUserInfo(id){
  return service({
    method: 'GET',
    url: '/user/detail?uid=' + id
  })
}
