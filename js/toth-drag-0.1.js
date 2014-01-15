/* Drag-0.1 
 * --------
 * 
 *
 *  
 * Created by:
 * - Toth (http://www.toth.cl)
 * - DigitalDev (http://www.digitaldev.org)	
 *
 * © Copyright 2014
 */

var mX, mY;
var isDragging = false;

function handlerDragOn (event) {		
	isDragging = true;
	handlerMousePosition(event);
	$(window).mousemove(function (event) {
		mX = event.pageX - $('#myCanvas').offset().left;
		mY = event.pageY - $('#myCanvas').offset().top;
		dragEffect(event);	
	});	
}

function handlerDragOff (event) {
	isDragging = false;
	$(window).unbind('mousemove');
}

function dragEffect () {	
	if (isDragging) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img, mX - mouseX, mY - mouseY, imgW, imgH);
	}
}