import service from "..";
// 获取歌单
export function getGeDan(id){
  return service({
    method:'GET',
    url: '/playlist/detail?id=' + id
  })
}

// 获取所有音乐
export function getAllMusic(id){
  return service({
    method: 'GET',
    url: '/playlist/track/all?id=' + id
  })
}

// 获取歌词
export function getSong(id){
  return service({
    method: 'GET',
    url: '/lyric?id=' + id
  })
}