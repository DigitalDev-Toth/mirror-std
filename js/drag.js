/* Drag/Pan
 * --------  
 * Created by:
 * - Toth (http://www.toth.cl)
 * - DigitalDev (http://www.digitaldev.org)	
 *
 * © Copyright 2014
 */

 var drag = {
 	isDragging: false,

 	on: function (event) {
 		drag.isDragging = true;
		var mX = event.clientX - $(this).offset().left;
		var mY = event.clientY - $(this).offset().top;
		drag.dragImage(mX, mY);	
 	},

 	dragImage: function (mX, mY) { 		
		var diffX = (mX - handler.mClickPos.x) / handler.scale;
		var diffY = (mY - handler.mClickPos.y) / handler.scale;			

		context.translate(diffX, diffY);
		handler.origin.x -= (diffX);
		handler.origin.y -= (diffY);

		handler.mClickPos.x = mX;
		handler.mClickPos.y = mY;
		handler.drawScene();		
 	}
 }