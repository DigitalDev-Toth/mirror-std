/* Filters
 * --------  
 * Created by:
 * - Toth (http://www.toth.cl)
 * - DigitalDev (http://www.digitaldev.org)	
 *
 * © Copyright 2014
 */

 var filter = {
 	pixels: null,

 	on: function (event) {
 		var mX = event.offsetX;
 		var mY = event.offsetY;
 		var deltaX = mX - handler.lastX;
 		var deltaY = mY - handler.lastY; 
 		var adjustX = deltaX < 0 ? 1 : -1;
 		var adjustY = deltaY < 0 ? 1 : -1;

 		filter.getPixels();
		var newPixels = filter.brightness(adjustY);
		newPixels = filter.contrast(adjustX);
 		
 		context.putImageData(newPixels, 0, 0);
 		console.log(newPixels);

 		handler.lastX = mX;
 		handler.lastY = mY;
 	},

 	brightness: function (adjust) {
 		var data = filter.pixels.data;
		for (var i = 0; i < data.length; i += 4) {
			if ((data[i] === 0) && (data[i+1] === 0) && (data[i+2] === 0)) {
				data[i] = 0;
				data[i+1] = 0;
				data[i+2] = 0;
				/*data[i+3] = 0;*/	    		
			} else {
				data[i] += adjust;
	    		data[i+1] += adjust;
	    		data[i+2] += adjust;
			}    		
	  	}
	  	return filter.pixels;
 	},

 	contrast: function (adjust) {
 		var data = filter.pixels.data;
    	var factor = (259 * (adjust + 255)) / (255 * (259 - adjust));
	    for (var i = 0; i < data.length; i += 4) {
	    	if ((data[i] === 0) && (data[i+1] === 0) && (data[i+2] === 0)) {
				data[i] = 0;
				data[i+1] = 0;
				data[i+2] = 0;
				/*data[i+3] = 0;*/	    		
			} else {
				data[i] = (factor * ((data[i] - 128) + 128));
	        	data[i+1] = (factor * ((data[i+1] - 128) + 128));
	        	data[i+2] = (factor * ((data[i+2] - 128) + 128));
			}	        
	    }
    	return filter.pixels;
 	},

 	getPixels: function () {
 		filter.pixels = context.getImageData(0, 0, handler.imgSize.w, handler.imgSize.h);
 	}
 }