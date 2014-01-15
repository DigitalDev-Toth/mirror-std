/* Zoom-0.1 
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

var interval;

function handlerZoomOn (event) {
	handlerMousePosition(event);
	$(window).bind('contextmenu', function (evt) {
		evt.preventDefault();
	});

	$('#myCanvas').mousemove(function (event) {
		event.preventDefault();				
		if (mousePY < event.pageY - $('#myCanvas').offset().top) {
			zoomRatio = 0.99;
		} else {
			if (mousePY > event.pageY - $('#myCanvas').offset().top) {
				zoomRatio = 1.01;
			}
		}		
			
		mousePY = parseInt(event.pageY - $('#myCanvas').offset().top);
		zoomEffect();
		console.log(mousePY);					
	});	
}

function handlerZoomOff (event) {
	clearInterval(interval);
	$('#myCanvas').unbind('mousemove');

	console.log('CLICK OUT!');
}

function drawImageZoom () {
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.restore();
	ctx.drawImage(img, 0, 0, imgW, imgH); 
}

function zoomEffect () {
	ctx.translate(mouseX, mouseY);
	ctx.scale(zoomRatio, zoomRatio);
	ctx.translate(-mouseX, -mouseY);
	drawImageZoom();
}
