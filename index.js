(function ($) {
  var index = {
    init: function () {
      this.bindEvent();
      this.requestAnimationFrame();
    },
    // 绑定点击事件
    bindEvent: function () {
      var _this = this;
      var a = 0;
      var warpInit = 0;
      $('#btn').on('click', function () {
          var $this = $(this);
          var warpScroll = _this.getWarpValue();
          if ($this.hasClass('fn-count') && warpScroll === 0) {
            _this.scrollDestination(-warpInit);
            $this.removeClass('fn-count');
          } else {
            if ($this.hasClass('fn-count') && warpScroll !== 0) {
              var warpScrollremain = _this.getWarpValue();
              console.log(warpInit, warpScrollremain);
              var remain = warpInit - warpScrollremain;
              _this.scrollDestination(-remain);
              $this.removeClass('fn-count');
              return;
            }
            warpInit = _this.getWarpValue();
            if (warpInit) {
              _this.scrollDestination(warpInit);
            }
            $this.addClass('fn-count');
          }
      });
    },
    teen: function (t, b, c, d) {
      if ((t/=d/2) < 1) {
        return c/2*t*t*t + b;
      } 
      return c/2*((t-=2)*t*t + 2) + b;
    },
    /**
    * 实现平滑的效果
    */
    requestAnimationFrame: function () {
      var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
          window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
          window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
          window[vendors[x] + 'CancelRequestAnimationFrame'];
      }

      if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = function(callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
              var id = window.setTimeout(function() {
                  callback(currTime + timeToCall);
              }, timeToCall);
              lastTime = currTime + timeToCall;
              return id;
          };
      }
      if (!window.cancelAnimationFrame) {
          window.cancelAnimationFrame = function(id) {
              clearTimeout(id);
          };
      }
    },
    /**
    * 滑动到位置
    * @param {obj} 位置距离值
    */
    scrollDestination: function (obj) {
      var b = window.scrollY;
      var c = obj;
      var t = 0;
      var d = 100;
      var _this = this;
      function loop() {
        if (t < d) {
          t++;
          var speed = _this.teen(t, b, c, d);
          // console.log('speed:' + speed);
          window.scrollTo(0, speed);
          window.requestAnimationFrame(loop);
        }
      }
      window.requestAnimationFrame(loop);
      $('#btn').removeClass('fn-count');
      return;
    },
    /**
    * 评论区域距离顶部的距离
    */
    getWarpValue: function () {
      return document.querySelector('.warp').getBoundingClientRect().top;
    }
  }
  index.init();
})(window.Zepto);