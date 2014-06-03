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
        var mX = event.clientX - $(this).offset().left;
        var mY = event.clientY - $(this).offset().top; 	

        handler.ba += mY - handler.mClickPos.y;	
        handler.c += (mX - handler.mClickPos.x) / 100; 	
        handler.b = 1 + Math.min(150, Math.max(-150, handler.ba)) / 150;
        handler.c = Math.max(1, Math.min(handler.c, 10));

        $('#infoBC').html(lang.brightness +': '+ handler.b.toFixed(2) +' '+ lang.contrast +': '+ handler.c.toFixed(2));
        filter.pixels = handler.tempContext.getImageData(0, 0, handler.tempCanvas.width, handler.tempCanvas.height);

        filter.brightnessContrastNegative();

        handler.context.putImageData(filter.pixels, 0, 0);   

        handler.mClickPos.x = mX;	
        handler.mClickPos.y = mY;	
    },

    brightnessContrastNegative: function () {
        var data = filter.pixels.data; 			
        var mul, add;
		
        mul = handler.b * handler.c;
        add = - handler.c * 128 + 128;

        var r, g, b;

        for (var i = 0; i < data.length; i += 4) {
            r = data[i] * mul + add;
            if (r > 255 ){                    
                data[i] = 255;
            }
            else if (r < 0){
                data[i] = 0;
            }
            else{             
                data[i] = r;
            }
            g = data[i + 1] * mul + add;
            if (g > 255 ){ 
                data[i + 1] = 255;
            }
            else if (g < 0){
                data[i + 1] = 0;
            }
            else{
                data[i + 1] = g;
            }
            b = data[i + 2] * mul + add;
            if (b > 255 ) {
                data[i + 2] = 255;
            }
            else if (b < 0){
                data[i + 2] = 0;
            }
            else{
                data[i + 2] = b;
            }  
            if (handler.isNegative) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
        }
    },

    negative: function () {
        filter.pixels = handler.tempContext.getImageData(0, 0, handler.tempCanvas.width, handler.tempCanvas.height);

        filter.brightnessContrastNegative();     
        
        handler.context.putImageData(filter.pixels, 0, 0);   
    },

    filtered: function () {
        filter.pixels = handler.tempContext.getImageData(0, 0, handler.tempCanvas.width, handler.tempCanvas.height);	

        filter.brightnessContrastNegative();

        handler.context.putImageData(filter.pixels, 0, 0);  
    }
};