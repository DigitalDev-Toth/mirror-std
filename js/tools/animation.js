/* Animate
 * --------  
 * Created by:
 * - Toth (http://www.toth.cl)
 * - DigitalDev (http://www.digitaldev.org)	
 *
 * © Copyright 2014
 */

var animation = {
    on: function (event) {
        var t = this;
        window.requestAnimFrame = (function (callback) {
                                        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || 
                                        window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || 
                                    function (callback) { 
                                        window.setTimeout(callback, 1000 / 60); 
                                    };
        })();

        handler.runAnimation = !handler.runAnimation;

        if (handler.runAnimation) {
            var date = new Date();
            var time = date.getTime();
            t.animate(time);
    	}
    },

    animate: function (lastTime) {
        var t = this;
        if (handler.runAnimation) {
            var time = (new Date()).getTime();
            var timeDiff = time - lastTime;
            
            if (handler.numImg >= handler.numImages) {
            	handler.numImg = handler.numImages;
            } else {
            	handler.numImg++;
            }     
            if (!handler.mobileEnvironment.isMobile()) { 
                $('#scroll').css('top', (handler.numImg - 1) * handler.rScroll);  
            } else {
                $('#scrollMobileL').css('top', (handler.numImg - 1) * handler.rScrollL);
                $('#scrollMobileP').css('left', (handler.numImg - 1) * handler.rScrollP);
            }  
            handler.context.clearRect(0, 0, handler.canvas.width, handler.canvas.height);
            handler.drawScene(handler.numImg);

            if (handler.numImg === handler.numImages) {
            	handler.numImg = 1;
            }

            requestAnimFrame(function () {
                t.animate(time);
            });
        }
    }
};       

      
