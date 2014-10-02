/* Zoom In/Out
 * --------  
 * Created by:
 * - Toth (http://www.toth.cl)
 * - DigitalDev (http://www.digitaldev.org)	
 *
 * © Copyright 2014
 */

var zoom = {
    on: function (event) {
        var mY = event.clientY - $(this).offset().top;
        var delta = Math.abs(mY - handler.lastY) / 1000;
        if (handler.lastY > mY) {
            handler.zoomRatio = 1.03 + delta;
        } else {
            handler.zoomRatio = 0.97 - delta;
        } 
        zoom.transformImage();  
        
        handler.lastOrigin = {
            x: handler.origin.x,
            y: handler.origin.y
        };

        handler.origin = {
            x: ((handler.mClickPos.x / handler.scale + handler.origin.x) - (handler.mClickPos.x / (handler.scale * handler.zoomRatio))),
            y: ((handler.mClickPos.y / handler.scale + handler.origin.y) - (handler.mClickPos.y / (handler.scale * handler.zoomRatio)))
        };

        handler.scale *= handler.zoomRatio;
        handler.infoScale = handler.scale * handler.respScale;
        $('#infoScale').html(lang.scale +': '+ handler.infoScale.toFixed(2));
        handler.lastY = mY;
        handler.drawScene(handler.numImg);
    },

    transformImage: function () {
        handler.context.translate(
            handler.origin.x,
            handler.origin.y
        );
        handler.context.scale(handler.zoomRatio, handler.zoomRatio);
        handler.context.translate(
            -((handler.mClickPos.x / handler.scale + handler.origin.x) - (handler.mClickPos.x / (handler.scale * handler.zoomRatio))),
            -((handler.mClickPos.y / handler.scale + handler.origin.y) - (handler.mClickPos.y / (handler.scale * handler.zoomRatio)))
        );
    },
    
    lastTransformImage: function () {        
        handler.context.scale(handler.scale, handler.scale);
        handler.context.translate(
            -handler.origin.x,
            -handler.origin.y
        );

        handler.drawScene(handler.numImg); 
    },

    magnifyingGlass: function () {
        var c = document.createElement('canvas');
        var ctx = c.getContext('2d');
        c.setAttribute('id', 'magnifyingGlass');
        document.getElementById('scene').appendChild(c);
        c.width = $('#myCanvas').width();
        c.height = $('#myCanvas').height();
        c.style.zIndex = 100;
        c.style.position = 'absolute';
        c.style.left = 0;
        c.style.top = 0;
        $(window).on('resize', function () {
            c.width = $('#myCanvas').width();            
            c.height = $('#myCanvas').height();
        });
        $('#scene').on('mousemove', function (event) {
            ctx.clearRect(0, 0, c.width, c.height);
            var x = event.clientX - $(this).offset().left;
            var y = event.clientY - $(this).offset().top;
//            if (handler.detectBrowser.isFirefox() || handler.detectBrowser.isMSIE()) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, 180, 0, Math.PI * 2, true);
                ctx.fill();
                ctx.lineWidth = 10;
                ctx.strokeStyle = '#d58512';
                ctx.stroke();
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(handler.canvas, -x * 2, -y * 2, $('#myCanvas').width() * 3, $('#myCanvas').height() * 3);
                ctx.restore();
//            } else {
//                ctx.drawImage(handler.canvas, -x * 2, -y * 2, $('#myCanvas').width() * 3, $('#myCanvas').height() * 3);  
//                ctx.globalCompositeOperation = 'destination-atop';       
//                ctx.fillStyle = "#fff";
//                ctx.beginPath();
//                ctx.arc(x, y, 180, 0, Math.PI * 2, true);
//                ctx.fill();
//                ctx.lineWidth = 10;
//                ctx.strokeStyle = '#d58512';
//                ctx.stroke();  
//            }      
        });
    }
};