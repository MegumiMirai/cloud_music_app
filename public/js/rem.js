function remSize(){
  // 获取设备宽度
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if(deviceWidth >= 750){
    deviceWidth = 750
  }
  if(deviceWidth <= 320){
    deviceWidth = 320
  }
  // 750px -> 1rem = 75px   375px -> 1rem = 37.5px
  // 设置字体大小
  document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
}

remSize()
// 当设备宽度改变就调用
window.onresize = function(){
  remSize()
}