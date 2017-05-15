var RAF = {    
  teen: function (t, b, c, d) {
    if ((t/=d/2) < 1) {
      return c/2*t*t*t + b;
    } 
    return c/2*((t-=2)*t*t + 2) + b;
  },
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
    * @param callback
  */
  scrollDestination: function (obj, callback) {
    var b = window.scrollY;
    var c = obj;
    var t = 0;
    var d = 100;
    function loop() {
      if (t < d) {
        t++;
        var speed = RAF.teen(t, b, c, d);
        window.scrollTo(0, speed);

        window.requestAnimationFrame(loop);
      } else {
        callback && callback();
      }
    }
    window.requestAnimationFrame(loop);
    $('#btn').removeClass('fn-count');
    return;
  }
}
RAF.requestAnimationFrame()