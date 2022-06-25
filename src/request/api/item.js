import service from "..";
export function getGeDan(id){
  return service({
    method:'GET',
    url: '/playlist/detail?id=' + id
  })
}