var isTop = false,
  topDistance = 0,
  lastDistance = 0;
  scrollDestination = RAF.scrollDestination,
  isClick = true;
/**
* 获取评论区域距离顶部高度
* @param {String} 位置距离值
*/
getWarpValue = function (elem) {
  return document.querySelector(elem).getBoundingClientRect().top;
},
/**
* 更新最后的评论区域距离顶部距离
*/
updateLastDistance = function () {
  lastDistance = getWarpValue('.warp');
},
/**
* 是否是置顶
* @param {Boolean} 
*/
updateIsTop = function (state) {
  isTop = state;
  console.log('isTop:' + isTop);
},
toTop = function () {
  scrollDestination(getWarpValue('.warp'), function() {
    isClick = true;
  });
  updateLastDistance();
  updateIsTop(true)
};
$('#btn').click(function () {
  if (!isClick) {
    return;
  }
  isClick = false;
  if (!isTop) {
    updateLastDistance();
    scrollDestination(getWarpValue('.warp'), function () {
      topDistance = getWarpValue('.warp');
      isClick = true;
    });
    updateIsTop(true);
  } else {
    if (getWarpValue('.warp') === 0) {
      scrollDestination(-lastDistance, function () {
        isClick = true;
      });
      updateIsTop(false)
    } else {
      if (topDistance !== 0) {
        if (getWarpValue('.warp') === topDistance) {
          scrollDestination(-lastDistance + getWarpValue('.warp'), function() {
            isClick = true;
          });
          updateIsTop(false);
          return;
        } 
        toTop();
        return;
      } 
      toTop();
    }
  }
});
