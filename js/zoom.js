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
 		var mY = event.offsetY;
        var delta = mY - handler.lastY;
        var zoomRatio = handler.ratio - (delta < 0 ? 0 : 0.02); //firefox no soporta sintaxis corta "if"
        var newScale = handler.scale * zoomRatio;        

        zoom.transformImage(zoomRatio);  

        handler.origin = {
        	x: ((handler.mClickPos.x / handler.scale + handler.origin.x) - (handler.mClickPos.x / (handler.scale * zoomRatio))),
        	y: ((handler.mClickPos.y / handler.scale + handler.origin.y) - (handler.mClickPos.y / (handler.scale * zoomRatio)))
        };

        handler.scale *= zoomRatio;
        handler.lastY = mY;
        handler.drawScene();
 	},

 	transformImage: function (zoomRatio) {
 		context.translate(
            handler.origin.x,
            handler.origin.y
        );
        context.scale(zoomRatio, zoomRatio);
        context.translate(
            -((handler.mClickPos.x / handler.scale + handler.origin.x) - (handler.mClickPos.x / (handler.scale * zoomRatio))),
            -((handler.mClickPos.y / handler.scale + handler.origin.y) - (handler.mClickPos.y / (handler.scale * zoomRatio)))
        );
	}
};