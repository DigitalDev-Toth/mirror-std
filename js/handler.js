/* Handlers
 * --------  
 * Created by:
 * - Toth (http://www.toth.cl)
 * - DigitalDev (http://www.digitaldev.org)	
 *
 * © Copyright 2014
 */

 var handler = { 		
 	resize: false,
 	canvasSize: {w: 0, h: 0},
 	canvasPos: {x: 0, y: 0},
	imgSize: {w: 0, h: 0},
 	scale: 1, ratio: 1.01,
	lastX: 0, lastY: 0,
	origin: {x: 0, y: 0},
	mClickPos: {x: 0, y: 0},

 	respScene: function () { // responsive scene
 		var t = this;
 		var imgRatio = img.width / img.height;   

 		t.canvasSize.w = $(window).width();
        t.canvasSize.h = $(window).height();

        if (t.canvasSize.w / t.canvasSize.h > imgRatio) {
            t.imgSize.h = t.canvasSize.h;
            t.imgSize.w = t.imgSize.h * imgRatio;
        } else {
            t.imgSize.w = t.canvasSize.h;
            t.imgSize.h = t.imgSize.w / imgRatio;
        }       

        if (t.resize) {
            var ctxRatioW = $('#myCanvas').width() / t.imgSize.w;
            var ctxRatioH = $('#myCanvas').height() / t.imgSize.h;
            $('#myCanvas').width(t.imgSize.w);
            $('#myCanvas').height(t.imgSize.h);
            t.origin.x = t.origin.x / ctxRatioW;
            t.origin.y = t.origin.y / ctxRatioH;
            context.scale(ctxRatioW, ctxRatioH);
        } else {
            $('#myCanvas').width(t.imgSize.w);
            $('#myCanvas').height(t.imgSize.h);
            canvas.width = t.imgSize.w;
            canvas.height = t.imgSize.h;
        }               

        t.canvasPos.x = (t.canvasSize.w / 2) - (t.imgSize.w / 2); 
        t.canvasPos.y = (t.canvasSize.h / 2) - (t.imgSize.h / 2);

        $('#myCanvas').css('left', t.canvasPos.x);
	    $('#myCanvas').css('top', t.canvasPos.y);
	    
                
        t.drawScene();
 	},

 	drawScene: function () { // drawing pictures
 		var t = this;
 		context.save();
	    context.setTransform(1, 0, 0, 1, 0, 0);
	    context.clearRect(0, 0, canvas.width, canvas.height);
	    context.restore();
	    context.drawImage(img, 0, 0, t.imgSize.w, t.imgSize.h); 
 	},

 	zoomEffect: function () { // zoom
 		$('#myCanvas').on('mousemove', zoom.on);
 	},

 	dragEffect: function () { // drag
 		$('#myCanvas').on('mousemove', drag.on);
 	},

 	filter: function () {
 		$('#myCanvas').on('mousemove', filter.on);
 	}
 }