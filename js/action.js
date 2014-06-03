/* Actions
 * --------  
 * Created by:
 * - Toth (http://www.toth.cl)
 * - DigitalDev (http://www.digitaldev.org)	
 *
 * © Copyright 2014
 */

var canvas, context, img;

var action = {
	init: function () {
		handler.respScene();
        $(window).resize(function (event) {
            handler.resize = true;
            handler.respScene();
        });     

        $('#myCanvas').on('mousedown', function (event) {        	
            handler.mClickPos.x = event.clientX - $(this).offset().left;
    		handler.mClickPos.y = event.clientY - $(this).offset().top;	
            switch (event.which) {
                case 1:
                	handler.filter();
                    break;
                case 2:                	
                	handler.dragEffect();                	
                    break;
                case 3:     
                	handler.zoomEffect();              
                    break;
            }
        });    

        $('#myCanvas').on('mouseup', function () {
            $(this).unbind('mousemove');
            drag.isDragging = false;
            handler.lastX = handler.lastY = 0;
        });   

        $(window).bind('contextmenu', function () {
            event.preventDefault();
        });     
	}
}