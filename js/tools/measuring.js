/* Measuring
 * --------  
 * Created by:
 * - Toth (http://www.toth.cl)
 * - DigitalDev (http://www.digitaldev.org)	
 *
 * © Copyright 2014
 */

var measuring = {
    ruler: function () {
        var t = this;
        handler.regInfo = new Array();
        if (!handler.mobileEnvironment.isMobile()) {
            var c = document.createElement('canvas');
            var ctx = c.getContext('2d');
            c.setAttribute('id', 'mRuler');
            document.getElementById('scene').appendChild(c);
            c.width = $('#myCanvas').width();
            c.height = $('#myCanvas').height();
            c.style.zIndex = 10;
            c.style.position = 'absolute';
            c.style.left = 0;
            c.style.top = 0;
            var match = false;
            
            $('#mRuler').on('click', function (event) {
                handler.rClicks++;
                if (handler.rClicks === 1) {
                    handler.bx = event.clientX - $(this).offset().left;
                    handler.by = event.clientY - $(this).offset().top;
                    
                    if (handler.regInfo.length > 0) {
                        while (!match && handler.regCount < handler.regInfo.length) {
                            if (((handler.regInfo[handler.regCount].bx - 5) < handler.bx) && ((handler.regInfo[handler.regCount].bx + 5) > handler.bx) && 
                                ((handler.regInfo[handler.regCount].by - 5) < handler.by) && ((handler.regInfo[handler.regCount].by + 5) > handler.by)) {
                                match = true;
                                handler.bx = handler.regInfo[handler.regCount].fx;
                                handler.by = handler.regInfo[handler.regCount].fy;
                                handler.cRuler = handler.regInfo[handler.regCount].cRuler;
                                handler.regInfo.splice(handler.regCount, 1);
                            } else if (((handler.regInfo[handler.regCount].fx - 5) < handler.bx) && ((handler.regInfo[handler.regCount].fx + 5) > handler.bx) && 
                                ((handler.regInfo[handler.regCount].fy - 5) < handler.by) && ((handler.regInfo[handler.regCount].fy + 5) > handler.by)) {
                                match = true;
                                handler.bx = handler.regInfo[handler.regCount].bx;
                                handler.by = handler.regInfo[handler.regCount].by;
                                handler.cRuler = handler.regInfo[handler.regCount].cRuler;
                                handler.regInfo.splice(handler.regCount, 1);
                            }
                            
                            if (!match) {
                                handler.regCount++;
                            }
                        }
                    }
                    
                    if (!match) {
                        handler.regCount = 0;
                        ctx.beginPath();
                        ctx.arc(handler.bx, handler.by, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath();
                    }
                    $(this).on('mousemove', function (event) {
                        handler.regCount = 0;
                        ctx.clearRect(0, 0, c.width, c.height);
                        $('#scene h5').remove();
                        if (handler.regInfo.length > 0) {
                            t.paintRegRuler(c, ctx);
                        }

                        handler.fx = event.clientX - $(this).offset().left;
                        handler.fy = event.clientY - $(this).offset().top;

                        var deltaX = (handler.bx - handler.fx) * handler.pixelSpacing[0];
                        var deltaY = (handler.by - handler.fy) * handler.pixelSpacing[1];
                        var sum = (deltaX * deltaX) + (deltaY * deltaY);
                        handler.rm = Math.sqrt(sum) / handler.infoScale;
                        
                        var pen = (handler.fy - handler.by) / (handler.fx - handler.bx);

                        if (pen > 0) {
                            $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (((handler.fy + handler.by) / 2) - 20).toFixed(0) +'px; left: '+ (((handler.fx + handler.bx) / 2).toFixed(0)) +'px;">'+ handler.rm.toFixed(0) +'[mm]</span></h5>');
                        } else {
                            $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (((handler.fy + handler.by) / 2) + 5).toFixed(0) +'px; left: '+ (((handler.fx + handler.bx) / 2).toFixed(0)) +'px;">'+ handler.rm.toFixed(0) +'[mm]</span></h5>');
                        }
                        
                        ctx.beginPath();
                        ctx.moveTo(handler.fx, handler.fy);
                        ctx.lineTo(handler.bx, handler.by);	
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#d58512';
                        ctx.stroke();
                        ctx.closePath();

                        ctx.beginPath();
                        ctx.arc(handler.bx, handler.by, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath();
                        
                        if (match) {
                            ctx.beginPath();	
                            ctx.arc(handler.fx, handler.fy, 3, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath();
                        }
                    });                           
                } else if (handler.rClicks === 2) {
                    $('#mRuler').unbind('mousemove');
                    
                    if (!match) {
                        ctx.beginPath();	
                        ctx.arc(handler.fx, handler.fy, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath();
                    }

                    handler.infoData = {
                        bx: handler.bx, by: handler.by, 
                        fx: handler.fx, fy: handler.fy, 
                        cRuler: handler.rm
                    };
                    handler.regInfo.push(handler.infoData); 

                    handler.rClicks = 0;
                    handler.regCount = 0;
                    match = false;  
                    
                } 
            });	   
        } else {
            var c = document.createElement('canvas');
            var ctx = c.getContext('2d');
            c.setAttribute('id', 'mRulerMobile');
            document.getElementById('scene').appendChild(c);
            c.width = $('#myCanvas').width();
            c.height = $('#myCanvas').height();
            c.style.zIndex = 10;
            c.style.position = 'absolute';
            c.style.left = 0;
            c.style.top = 0;
            var match = 0;
            
            $('#mRulerMobile').bind('touchstart', function (event) {          	  	
                handler.bx = event.originalEvent.touches[0].pageX - $(this).offset().left;
                handler.by = event.originalEvent.touches[0].pageY - $(this).offset().top;
        	
                if (handler.regInfo.length > 0) {
                    while (!match && handler.regCount < handler.regInfo.length) {
                        if (((handler.regInfo[handler.regCount].bx - 13) < handler.bx) && ((handler.regInfo[handler.regCount].bx + 13) > handler.bx) && 
                            ((handler.regInfo[handler.regCount].by - 13) < handler.by) && ((handler.regInfo[handler.regCount].by + 13) > handler.by)) {
                            match = true;
                            handler.bx = handler.regInfo[handler.regCount].fx;
                            handler.by = handler.regInfo[handler.regCount].fy;
                            handler.cRuler = handler.regInfo[handler.regCount].cRuler;
                            handler.regInfo.splice(handler.regCount, 1);
                        } else if (((handler.regInfo[handler.regCount].fx - 13) < handler.bx) && ((handler.regInfo[handler.regCount].fx + 13) > handler.bx) && 
                            ((handler.regInfo[handler.regCount].fy - 13) < handler.by) && ((handler.regInfo[handler.regCount].fy + 13) > handler.by)) {
                            match = true;
                            handler.bx = handler.regInfo[handler.regCount].bx;
                            handler.by = handler.regInfo[handler.regCount].by;
                            handler.cRuler = handler.regInfo[handler.regCount].cRuler;
                            handler.regInfo.splice(handler.regCount, 1);
                        }

                        if (!match) {
                            handler.regCount++;
                        }
                    }
                }
                
                if (!match) {
                    ctx.beginPath();
                    ctx.arc(handler.bx, handler.by, 3, 0, Math.PI * 2, true);
                    ctx.fillStyle = '#d58512';
                    ctx.fill();
                    ctx.closePath();
                }
                $(this).bind('touchmove', function (event) {
                    ctx.clearRect(0, 0, c.width, c.height);
                    $('#scene h5').remove();
                    if (handler.regInfo.length > 0) {
                        t.paintRegRuler(c, ctx);
                    }

                    handler.fx = event.originalEvent.touches[0].pageX - $(this).offset().left - 30;
                    handler.fy = event.originalEvent.touches[0].pageY - $(this).offset().top - 30;

                    var deltaX = (handler.bx - handler.fx) * handler.pixelSpacing[0];
                    var deltaY = (handler.by - handler.fy) * handler.pixelSpacing[1];
                    var sum = (deltaX * deltaX) + (deltaY * deltaY);
                    handler.rm = Math.sqrt(sum) / handler.infoScale;
                    
                    var pen = (handler.fy - handler.by) / (handler.fx - handler.bx);

                    if (pen > 0) {
                        $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (((handler.fy + handler.by) / 2) - 20).toFixed(0) +'px; left: '+ (((handler.fx + handler.bx) / 2).toFixed(0)) +'px;">'+ handler.rm.toFixed(0) +'[mm]</span></h5>');
                    } else {
                        $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (((handler.fy + handler.by) / 2) + 5).toFixed(0) +'px; left: '+ (((handler.fx + handler.bx) / 2).toFixed(0)) +'px;">'+ handler.rm.toFixed(0) +'[mm]</span></h5>');
                    }

                    ctx.beginPath();
                    ctx.moveTo(handler.fx, handler.fy);
                    ctx.lineTo(handler.bx, handler.by);	
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#d58512';
                    ctx.stroke();
                    ctx.closePath();

                    ctx.beginPath();
                    ctx.arc(handler.bx, handler.by, 3, 0, Math.PI * 2, true);
                    ctx.fillStyle = '#d58512';
                    ctx.fill();
                    ctx.closePath();
                    
                    if (match) {
                        ctx.beginPath();	
                        ctx.arc(handler.fx, handler.fy, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath();
                    } 
                });
                  
            });

            $('#mRulerMobile').bind('touchend', function (event) {
                $(this).unbind('touchmove');                	
                if (!match) {
                    ctx.beginPath();	
                    ctx.arc(handler.fx, handler.fy, 3, 0, Math.PI * 2, true);
                    ctx.fillStyle = '#d58512';
                    ctx.fill();
                    ctx.closePath();
                }                  
                
                handler.infoData = {
                    bx: handler.bx, by: handler.by, 
                    fx: handler.fx, fy: handler.fy, 
                    cRuler: handler.rm
                };
                handler.regInfo.push(handler.infoData); 
                match = false;
                handler.regCount = 0;
            }); 
        } 
    },

    paintRegRuler: function (c, ctx) {
        for (var i = 0; i < handler.regInfo.length; i++) {
            var pen = (handler.regInfo[i].fy - handler.regInfo[i].by) / (handler.regInfo[i].fx - handler.regInfo[i].bx);

            if (pen > 0) {
                $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (((handler.regInfo[i].fy + handler.regInfo[i].by) / 2) - 20).toFixed(0) +'px; left: '+ (((handler.regInfo[i].fx + handler.regInfo[i].bx) / 2).toFixed(0)) +'px;">'+ handler.regInfo[i].cRuler.toFixed(0) +'[mm]</span></h5>');
            } else {
                $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (((handler.regInfo[i].fy + handler.regInfo[i].by) / 2) + 5).toFixed(0) +'px; left: '+ (((handler.regInfo[i].fx + handler.regInfo[i].bx) / 2).toFixed(0)) +'px;">'+ handler.regInfo[i].cRuler.toFixed(0) +'[mm]</span></h5>');
            }
            
            ctx.beginPath();
            ctx.moveTo(handler.regInfo[i].fx, handler.regInfo[i].fy);
            ctx.lineTo(handler.regInfo[i].bx, handler.regInfo[i].by);	
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#d58512';
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.arc(handler.regInfo[i].bx, handler.regInfo[i].by, 3, 0, Math.PI * 2, true);
            ctx.fillStyle = '#d58512';
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();	
            ctx.arc(handler.regInfo[i].fx, handler.regInfo[i].fy, 3, 0, Math.PI * 2, true);
            ctx.fillStyle = '#d58512';
            ctx.fill();
            ctx.closePath();  
        }
    },

    angle: function () {
        var t = this;
        handler.regInfo = new Array();
        if (!handler.mobileEnvironment.isMobile()) {
            var c = document.createElement('canvas');
            var ctx = c.getContext('2d');
            c.setAttribute('id', 'mAngle');
            document.getElementById('scene').appendChild(c);
            c.width = $('#myCanvas').width();
            c.height = $('#myCanvas').height();
            c.style.zIndex = 10;
            c.style.position = 'absolute';
            c.style.left = 0;
            c.style.top = 0;
            var match = false;
            var point = 0; // 0: first, 1: second, 2: thrid
            
            $('#mAngle').on('click', function (event){
                handler.rClicks++;

                if (handler.rClicks === 1) {
                    handler.fx = event.clientX - $(this).offset().left;
                    handler.fy = event.clientY - $(this).offset().top;
                    
                    if (handler.regInfo.length > 0) {
                        while (!match && handler.regCount < handler.regInfo.length) {
                            if (((handler.regInfo[handler.regCount].fx - 5) < handler.fx) && ((handler.regInfo[handler.regCount].fx + 5) > handler.fx) &&
                                ((handler.regInfo[handler.regCount].fy - 5) < handler.fy) && ((handler.regInfo[handler.regCount].fy + 5) > handler.fy)) {
                                match = true;
                                point = 0;
                                handler.sx = handler.regInfo[handler.regCount].sx;
                                handler.sy = handler.regInfo[handler.regCount].sy;
                                handler.tx = handler.regInfo[handler.regCount].tx;
                                handler.ty = handler.regInfo[handler.regCount].ty;
                                handler.cAngle = handler.regInfo[handler.regCount].cAngle;
                                handler.regInfo.splice(handler.regCount, 1);
                            } else if (((handler.regInfo[handler.regCount].sx - 5) < handler.fx) && ((handler.regInfo[handler.regCount].sx + 5) > handler.fx) &&
                                ((handler.regInfo[handler.regCount].sy - 5) < handler.fy) && ((handler.regInfo[handler.regCount].sy + 5) > handler.fy)) {
                                match = true;
                                point = 1;
                                handler.fx = handler.regInfo[handler.regCount].fx;
                                handler.fy = handler.regInfo[handler.regCount].fy;
                                handler.tx = handler.regInfo[handler.regCount].tx;
                                handler.ty = handler.regInfo[handler.regCount].ty;
                                handler.cAngle = handler.regInfo[handler.regCount].cAngle;
                                handler.regInfo.splice(handler.regCount, 1);
                            } else if (((handler.regInfo[handler.regCount].tx - 5) < handler.fx) && ((handler.regInfo[handler.regCount].tx + 5) > handler.fx) &&
                                ((handler.regInfo[handler.regCount].ty - 5) < handler.fy) && ((handler.regInfo[handler.regCount].ty + 5) > handler.fy)) {
                                match = true;
                                point = 2;
                                handler.fx = handler.regInfo[handler.regCount].fx;
                                handler.fy = handler.regInfo[handler.regCount].fy;
                                handler.sx = handler.regInfo[handler.regCount].sx;
                                handler.sy = handler.regInfo[handler.regCount].sy;
                                handler.cAngle = handler.regInfo[handler.regCount].cAngle;
                                handler.regInfo.splice(handler.regCount, 1);
                            }
                            
                            if (!match) {
                                handler.regCount++;
                            }
                        }
                    }

                    if (!match) {
                        handler.regCount = 0;
                        ctx.beginPath();
                        ctx.arc(handler.fx, handler.fy, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath();
                        
                        $(this).on('mousemove', function (event) {
                            ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
                            $('#scene h5').remove();
                            if (handler.regInfo.length > 0) {
                                t.paintRegAngle(c, ctx);
                            }

                            handler.sx = event.clientX - $(this).offset().left;
                            handler.sy = event.clientY - $(this).offset().top;

                            ctx.beginPath();
                            ctx.moveTo(handler.sx, handler.sy);
                            ctx.lineTo(handler.fx, handler.fy);	
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = '#d58512';
                            ctx.stroke();

                            ctx.beginPath();
                            ctx.arc(handler.fx, handler.fy, 3, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath();
                        });
                    } else {
                        $(this).on('mousemove', function (event) {
                            ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
                            $('#scene h5').remove();
                            if (handler.regInfo.length > 0) {
                                t.paintRegAngle(c, ctx);
                            }

                            if (point === 0) {
                                handler.fx = event.clientX - $(this).offset().left;
                                handler.fy = event.clientY - $(this).offset().top;
                            } else if (point === 1) {
                                handler.sx = event.clientX - $(this).offset().left;
                                handler.sy = event.clientY - $(this).offset().top;
                            } else if (point === 2) {
                                handler.tx = event.clientX - $(this).offset().left;
                                handler.ty = event.clientY - $(this).offset().top;
                            }                          

                            var cSum = ((handler.fx - handler.tx) * (handler.fx - handler.tx)) + ((handler.fy - handler.ty) * (handler.fy - handler.ty));
                            var c = Math.sqrt(cSum);
                            var bSum = ((handler.sx - handler.tx) * (handler.sx - handler.tx)) + ((handler.sy - handler.ty) * (handler.sy - handler.ty));
                            var b = Math.sqrt(bSum);
                            var aSum = ((handler.fx - handler.sx) * (handler.fx - handler.sx)) + ((handler.fy - handler.sy) * (handler.fy - handler.sy));
                            var a = Math.sqrt(aSum);
                            var ang = Math.acos(((a * a) + (b * b) - (c * c)) / (2 * a * b));
                            handler.rm = ang *(180 / Math.PI);

                            $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (handler.sy + 5) +'px; left: '+ (handler.sx + 5) +'px;">'+ handler.rm.toFixed(2) +'º</span></h5>');

                            ctx.beginPath();
                            ctx.moveTo(handler.sx, handler.sy);
                            ctx.lineTo(handler.fx, handler.fy);	
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = '#d58512';
                            ctx.stroke();

                            ctx.beginPath();
                            ctx.arc(handler.fx, handler.fy, 2, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath();

                            ctx.moveTo(handler.sx, handler.sy);
                            ctx.lineTo(handler.tx, handler.ty);		
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = '#d58512';
                            ctx.stroke();

                            ctx.beginPath();	
                            ctx.arc(handler.sx, handler.sy, 3, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath();

                            ctx.beginPath();	
                            ctx.arc(handler.tx, handler.ty, 3, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath();
                        });                                                      
                    }                
                } else if (handler.rClicks === 2) {
                    if (!match) {
                        $(this).unbind('mousemove');
                        handler.sx = event.clientX - $(this).offset().left;
                        handler.sy = event.clientY - $(this).offset().top;		

                        ctx.beginPath();	
                        ctx.arc(handler.sx, handler.sy, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath();  

                        $(this).on('mousemove', function (event) {
                            ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
                            $('#scene h5').remove();
                            if (handler.regInfo.length > 0) {
                                t.paintRegAngle(c, ctx);
                            }

                            handler.tx = event.clientX - $(this).offset().left;
                            handler.ty = event.clientY - $(this).offset().top;

                            var cSum = ((handler.fx - handler.tx) * (handler.fx - handler.tx)) + ((handler.fy - handler.ty) * (handler.fy - handler.ty));
                            var c = Math.sqrt(cSum);
                            var bSum = ((handler.sx - handler.tx) * (handler.sx - handler.tx)) + ((handler.sy - handler.ty) * (handler.sy - handler.ty));
                            var b = Math.sqrt(bSum);
                            var aSum = ((handler.fx - handler.sx) * (handler.fx - handler.sx)) + ((handler.fy - handler.sy) * (handler.fy - handler.sy));
                            var a = Math.sqrt(aSum);
                            var ang = Math.acos(((a * a) + (b * b) - (c * c)) / (2 * a * b));
                            handler.rm = ang *(180 / Math.PI);

                            $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (handler.sy + 5) +'px; left: '+ (handler.sx + 5) +'px;">'+ handler.rm.toFixed(2) +'º</span></h5>');

                            ctx.beginPath();
                            ctx.moveTo(handler.sx, handler.sy);
                            ctx.lineTo(handler.fx, handler.fy);	
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = '#d58512';
                            ctx.stroke();

                            ctx.beginPath();
                            ctx.arc(handler.fx, handler.fy, 2, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath();

                            ctx.moveTo(handler.sx, handler.sy);
                            ctx.lineTo(handler.tx, handler.ty);		
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = '#d58512';
                            ctx.stroke();

                            ctx.beginPath();	
                            ctx.arc(handler.sx, handler.sy, 3, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath();  
                        });     
                    } else {
                        $(this).unbind('mousemove');
                        
                        handler.infoData = {
                            fx: handler.fx, fy: handler.fy, 
                            sx: handler.sx, sy: handler.sy,
                            tx: handler.tx, ty: handler.ty, 
                            cAngle: handler.rm
                        };
                        handler.regInfo.push(handler.infoData); 

                        handler.rClicks = 0;
                        match = false;
                        handler.regCount = 0;
                    }                    		
                } else if (handler.rClicks === 3) {
                    if (!match) {
                        $(this).unbind('mousemove');

                        ctx.beginPath();	
                        ctx.arc(handler.tx, handler.ty, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath();

                        handler.infoData = {
                            fx: handler.fx, fy: handler.fy, 
                            sx: handler.sx, sy: handler.sy,
                            tx: handler.tx, ty: handler.ty, 
                            cAngle: handler.rm
                        };
                        handler.regInfo.push(handler.infoData); 

                        handler.rClicks = 0;
                        match = false;
                        handler.regCount = 0;
                    }                    
                }
            });	
        } else {
            var c = document.createElement('canvas');
            var ctx = c.getContext('2d');
            c.setAttribute('id', 'mAngleMobile');
            document.getElementById('scene').appendChild(c);
            c.width = $('#myCanvas').width();
            c.height = $('#myCanvas').height();
            c.style.zIndex = 10;
            c.style.position = 'absolute';
            c.style.left = 0;
            c.style.top = 0;
            var match = false;
            var point = 0; // 0: first, 1: second, 2: third
            
            $('#mAngleMobile').bind('touchstart', function (event) {
                handler.rClicks++;
                if (handler.rClicks === 1) {
                    handler.fx = event.originalEvent.touches[0].pageX - $(this).offset().left;
                    handler.fy = event.originalEvent.touches[0].pageY - $(this).offset().top;  
                    
                    if (handler.regInfo.length > 0) {
                        while (!match && handler.regCount < handler.regInfo.length) {
                            if (((handler.regInfo[handler.regCount].fx - 13) < handler.fx) && ((handler.regInfo[handler.regCount].fx + 13) > handler.fx) &&
                                ((handler.regInfo[handler.regCount].fy - 13) < handler.fy) && ((handler.regInfo[handler.regCount].fy + 13) > handler.fy)) {
                                match = true;
                                point = 0;
                                handler.sx = handler.regInfo[handler.regCount].sx;
                                handler.sy = handler.regInfo[handler.regCount].sy;
                                handler.tx = handler.regInfo[handler.regCount].tx;
                                handler.ty = handler.regInfo[handler.regCount].ty;
                                handler.cAngle = handler.regInfo[handler.regCount].cAngle;
                                handler.regInfo.splice(handler.regCount, 1);
                            } else if (((handler.regInfo[handler.regCount].sx - 13) < handler.fx) && ((handler.regInfo[handler.regCount].sx + 13) > handler.fx) &&
                                ((handler.regInfo[handler.regCount].sy - 13) < handler.fy) && ((handler.regInfo[handler.regCount].sy + 13) > handler.fy)) {
                                match = true;
                                point = 1;
                                handler.fx = handler.regInfo[handler.regCount].fx;
                                handler.fy = handler.regInfo[handler.regCount].fy;
                                handler.tx = handler.regInfo[handler.regCount].tx;
                                handler.ty = handler.regInfo[handler.regCount].ty;
                                handler.cAngle = handler.regInfo[handler.regCount].cAngle;
                                handler.regInfo.splice(handler.regCount, 1);
                            } else if (((handler.regInfo[handler.regCount].tx - 13) < handler.fx) && ((handler.regInfo[handler.regCount].tx + 13) > handler.fx) &&
                                ((handler.regInfo[handler.regCount].ty - 13) < handler.fy) && ((handler.regInfo[handler.regCount].ty + 13) > handler.fy)) {
                                match = true;
                                point = 2;
                                handler.fx = handler.regInfo[handler.regCount].fx;
                                handler.fy = handler.regInfo[handler.regCount].fy;
                                handler.sx = handler.regInfo[handler.regCount].sx;
                                handler.sy = handler.regInfo[handler.regCount].sy;
                                handler.cAngle = handler.regInfo[handler.regCount].cAngle;
                                handler.regInfo.splice(handler.regCount, 1);
                            }
                            
                            if (!match) {
                                handler.regCount++;
                            }
                        }
                    }
                    
                    if (!match) {
                        ctx.beginPath();
                        ctx.arc(handler.fx, handler.fy, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath();

                        $(this).bind('touchmove', function (event) {
                            ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
                            $('#scene h5').remove();
                            if (handler.regInfo.length > 0) {
                                t.paintRegAngle(c, ctx);
                            }

                            handler.sx = event.originalEvent.touches[0].pageX - $(this).offset().left - 30;
                            handler.sy = event.originalEvent.touches[0].pageY - $(this).offset().top - 30;

                            ctx.beginPath();
                            ctx.moveTo(handler.sx, handler.sy);
                            ctx.lineTo(handler.fx, handler.fy);	
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = '#d58512';
                            ctx.stroke();
                            ctx.closePath();

                            ctx.beginPath();
                            ctx.arc(handler.fx, handler.fy, 3, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath();
                        });
                    } else {
                        $(this).bind('touchmove', function (event) {
                            ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
                            $('#scene h5').remove();
                            if (handler.regInfo.length > 0) {
                                t.paintRegAngle(c, ctx);
                            }
                            
                            if (point === 0) {
                                handler.fx = event.originalEvent.touches[0].pageX - $(this).offset().left - 30;
                                handler.fy = event.originalEvent.touches[0].pageY - $(this).offset().top - 30;
                            } else if (point === 1) {
                                handler.sx = event.originalEvent.touches[0].pageX - $(this).offset().left - 30;
                                handler.sy = event.originalEvent.touches[0].pageY - $(this).offset().top - 30;
                            } else if (point === 2) {
                                handler.tx = event.originalEvent.touches[0].pageX - $(this).offset().left - 30;
                                handler.ty = event.originalEvent.touches[0].pageY - $(this).offset().top - 30;
                            }   
                            
                            var cSum = ((handler.fx - handler.tx) * (handler.fx - handler.tx)) + ((handler.fy - handler.ty) * (handler.fy - handler.ty));
                            var c = Math.sqrt(cSum);
                            var bSum = ((handler.sx - handler.tx) * (handler.sx - handler.tx)) + ((handler.sy - handler.ty) * (handler.sy - handler.ty));
                            var b = Math.sqrt(bSum);
                            var aSum = ((handler.fx - handler.sx) * (handler.fx - handler.sx)) + ((handler.fy - handler.sy) * (handler.fy - handler.sy));
                            var a = Math.sqrt(aSum);
                            var ang = Math.acos(((a * a) + (b * b) - (c * c)) / (2 * a * b));
                            handler.rm = ang *(180 / Math.PI);

                            $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (handler.sy + 5) +'px; left: '+ (handler.sx + 5) +'px;">'+ handler.rm.toFixed(2) +'º</span></h5>');

                            ctx.beginPath();
                            ctx.moveTo(handler.sx, handler.sy);
                            ctx.lineTo(handler.fx, handler.fy);	
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = '#d58512';
                            ctx.stroke();
                            ctx.closePath();

                            ctx.beginPath();	
                            ctx.arc(handler.sx, handler.sy, 3, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath(); 

                            ctx.beginPath();
                            ctx.arc(handler.fx, handler.fy, 3, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath();
                            
                            ctx.beginPath();	
                            ctx.arc(handler.tx, handler.ty, 3, 0, Math.PI * 2, true);
                            ctx.fillStyle = '#d58512';
                            ctx.fill();
                            ctx.closePath();

                            ctx.beginPath();
                            ctx.moveTo(handler.sx, handler.sy);
                            ctx.lineTo(handler.tx, handler.ty);		
                            ctx.lineWidth = 2;
                            ctx.strokeStyle = '#d58512';
                            ctx.stroke();
                            ctx.closePath();
                        });
                    }                    
                } else if (handler.rClicks === 2) {
                    $(this).bind('touchmove', function (event) {
                        ctx.clearRect(0, 0, $('#myCanvas').width(), $('#myCanvas').height());
                        $('#scene h5').remove();
                        if (handler.regInfo.length > 0) {
                            t.paintRegAngle(c, ctx);
                        }

                        handler.tx = event.originalEvent.touches[0].pageX - $(this).offset().left - 30;
                        handler.ty = event.originalEvent.touches[0].pageY - $(this).offset().top - 30;
                        
                        var cSum = ((handler.fx - handler.tx) * (handler.fx - handler.tx)) + ((handler.fy - handler.ty) * (handler.fy - handler.ty));
                        var c = Math.sqrt(cSum);
                        var bSum = ((handler.sx - handler.tx) * (handler.sx - handler.tx)) + ((handler.sy - handler.ty) * (handler.sy - handler.ty));
                        var b = Math.sqrt(bSum);
                        var aSum = ((handler.fx - handler.sx) * (handler.fx - handler.sx)) + ((handler.fy - handler.sy) * (handler.fy - handler.sy));
                        var a = Math.sqrt(aSum);
                        var ang = Math.acos(((a * a) + (b * b) - (c * c)) / (2 * a * b));
                        handler.rm = ang *(180 / Math.PI);

                        $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (handler.sy + 5) +'px; left: '+ (handler.sx + 5) +'px;">'+ handler.rm.toFixed(2) +'º</span></h5>');

                        ctx.beginPath();
                        ctx.moveTo(handler.sx, handler.sy);
                        ctx.lineTo(handler.fx, handler.fy);	
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#d58512';
                        ctx.stroke();
                        ctx.closePath();

                        ctx.beginPath();	
                        ctx.arc(handler.sx, handler.sy, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath(); 

                        ctx.beginPath();
                        ctx.arc(handler.fx, handler.fy, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath();

                        ctx.beginPath();
                        ctx.moveTo(handler.sx, handler.sy);
                        ctx.lineTo(handler.tx, handler.ty);		
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#d58512';
                        ctx.stroke();
                        ctx.closePath();
                    });
                }
            });	

            $('#mAngleMobile').bind('touchend', function (event) {
                $(this).unbind('touchmove');                
                if (!match) {
                    if (handler.rClicks === 1) {
                        ctx.beginPath();	
                        ctx.arc(handler.sx, handler.sy, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath(); 
                    } else if (handler.rClicks === 2) {
                        ctx.beginPath();	
                        ctx.arc(handler.tx, handler.ty, 3, 0, Math.PI * 2, true);
                        ctx.fillStyle = '#d58512';
                        ctx.fill();
                        ctx.closePath();

                        handler.infoData = {
                            fx: handler.fx, fy: handler.fy, 
                            sx: handler.sx, sy: handler.sy,
                            tx: handler.tx, ty: handler.ty, 
                            cAngle: handler.rm
                        };
                        handler.regInfo.push(handler.infoData); 

                        handler.rClicks = 0;
                        match = false;
                        handler.regCount = 0;
                    }
                } else {
                    handler.infoData = {
                        fx: handler.fx, fy: handler.fy, 
                        sx: handler.sx, sy: handler.sy,
                        tx: handler.tx, ty: handler.ty, 
                        cAngle: handler.rm
                    };
                    handler.regInfo.push(handler.infoData); 

                    handler.rClicks = 0;
                    match = false;
                    handler.regCount = 0;
                }
            });
        }
    },

    paintRegAngle: function (c, ctx) {
        for (var i = 0; i < handler.regInfo.length; i++) {
            $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (handler.regInfo[i].sy + 5) +'px; left: '+ (handler.regInfo[i].sx + 5) +'px;">'+ handler.regInfo[i].cAngle.toFixed(2) +'º</span></h5>');
                
            ctx.beginPath();
            ctx.moveTo(handler.regInfo[i].sx, handler.regInfo[i].sy);
            ctx.lineTo(handler.regInfo[i].fx, handler.regInfo[i].fy);	
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#d58512';
            ctx.stroke();
            ctx.closePath();
    		
            ctx.beginPath();
            ctx.moveTo(handler.regInfo[i].sx, handler.regInfo[i].sy);
            ctx.lineTo(handler.regInfo[i].tx, handler.regInfo[i].ty);		
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#d58512';
            ctx.stroke();
            ctx.closePath();
            
            ctx.beginPath();
            ctx.arc(handler.regInfo[i].fx, handler.regInfo[i].fy, 3, 0, Math.PI * 2, true);
            ctx.fillStyle = '#d58512';
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();	
            ctx.arc(handler.regInfo[i].sx, handler.regInfo[i].sy, 3, 0, Math.PI * 2, true);
            ctx.fillStyle = '#d58512';
            ctx.fill();
            ctx.closePath();  

            ctx.beginPath();	
            ctx.arc(handler.regInfo[i].tx, handler.regInfo[i].ty, 3, 0, Math.PI * 2, true);
            ctx.fillStyle = '#d58512';
            ctx.fill();
            ctx.closePath();
        }
    },

    area: function () {
        var t = this;
        handler.regInfo = new Array();
        if (!handler.mobileEnvironment.isMobile()) {
            var c = document.createElement('canvas');
            var ctx = c.getContext('2d');
            c.setAttribute('id', 'mArea');
            document.getElementById('scene').appendChild(c);
            c.width = $('#myCanvas').width();
            c.height = $('#myCanvas').height();
            c.style.zIndex = 10;
            c.style.position = 'absolute';
            c.style.left = 0;
            c.style.top = 0;
            var match = false;
            var newMeasuring = false;
            var ax = 0, ay = 0, cx= 0, cy = 0;
            handler.aRadius = 1;
            
            $('#mArea').on('mousedown', function (event) { 
                handler.sx = event.offsetX;
                handler.sy = event.offsetY;
                cx = handler.sx;
                cy = handler.sy;
                handler.aRadius = 1;
                if (handler.regInfo.length > 0) {
                    while (!match && handler.regCount < handler.regInfo.length) {
                        if (((handler.regInfo[handler.regCount].sx - handler.regInfo[handler.regCount].radius) < handler.sx) && ((handler.regInfo[handler.regCount].sx + handler.regInfo[handler.regCount].radius) > handler.sx) &&
                            ((handler.regInfo[handler.regCount].sy - handler.regInfo[handler.regCount].radius) < handler.sy) && ((handler.regInfo[handler.regCount].sy + handler.regInfo[handler.regCount].radius) > handler.sy)) {
                            match = true;
                            handler.sx = handler.regInfo[handler.regCount].sx;
                            handler.sy  = handler.regInfo[handler.regCount].sy;                  
                            handler.rm = handler.regInfo[handler.regCount].cArea;
                            handler.aRadius = handler.regInfo[handler.regCount].radius;
                            handler.regInfo.splice(handler.regCount, 1);
                        }
                        
                        if (!match) {
                            handler.regCount++;
                        }
                    }
                    handler.regCount = 0;
                }
                
                if (event.which === 1) {
                    var sy = handler.sy;
                    newMeasuring = true;
                    $('#mArea').on('mousemove', function (event){
                        ctx.clearRect(0, 0, c.width, c.height);
                        $('#scene h5').remove();
                        if (handler.regInfo.length > 0) {
                            t.paintRegArea(c, ctx);
                        }

                        var my = event.offsetY;

                        var deltaY = sy - my;

                        deltaY < 0 ? handler.aRadius+=2: handler.aRadius-=2;

                        if (handler.aRadius <= 0) {
                            handler.aRadius = 1;
                        }

                        var a = Math.PI * (handler.aRadius * handler.aRadius * handler.pixelSpacing[0] * handler.pixelSpacing[1]);
                        handler.rm = a / handler.infoScale;
                        
                        $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (handler.sy + 10) +'px; left: '+ (handler.sx + 10) +'px;">'+ handler.rm.toFixed(0) +'[mm&sup2;]</span></h5>');

                        ctx.beginPath();	
                        ctx.arc(handler.sx, handler.sy, handler.aRadius, 0, Math.PI * 2, true);
                        ctx.fillStyle = 'rgba(213, 133, 18, 0.3)';
                        ctx.fill();
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#d58512';
                        ctx.stroke();  
                        sy = my; 		
                    });
                } else if (event.which === 3 && match) {
                    $('#mArea').on('mousemove', function (event){
                        ctx.clearRect(0, 0, c.width, c.height);
                        $('#scene h5').remove();
                        if (handler.regInfo.length > 0) {
                            t.paintRegArea(c, ctx);
                        }
                        
                        ax = event.offsetX;
                        ay = event.offsetY;  
                        
                        handler.sx += (ax - cx);
                        handler.sy += (ay - cy);

                        $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (handler.sy + 10) +'px; left: '+ (handler.sx + 10) +'px;">'+ handler.rm.toFixed(0) +'[mm&sup2;]</span></h5>');

                        ctx.beginPath();	
                        ctx.arc(handler.sx, handler.sy, handler.aRadius, 0, Math.PI * 2, true);
                        ctx.fillStyle = 'rgba(213, 133, 18, 0.3)';
                        ctx.fill();
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#d58512';
                        ctx.stroke(); 
                        cx = ax;
                        cy = ay;
                    });
                }
            });
            
            $('#mArea').on('mouseup', function () {                
                $('#mArea').unbind('mousemove');     
                if (match || newMeasuring) {
                    handler.infoData = {
                        sx: handler.sx, sy: handler.sy,
                        radius: handler.aRadius, 
                        cArea: handler.rm
                    };
                    handler.regInfo.push(handler.infoData); 
                    match = false;
                    newMeasuring = false;
                    handler.regCount = 0;
                }                
            });    
        } else {
            var c = document.createElement('canvas');
            var ctx = c.getContext('2d');
            c.setAttribute('id', 'mAreaMobile');
            document.getElementById('scene').appendChild(c);
            c.width = $('#myCanvas').width();
            c.height = $('#myCanvas').height();
            c.style.zIndex = 10;
            c.style.position = 'absolute';
            c.style.left = 0;
            c.style.top = 0;
            var match = false;
            var newMeasuring = false;
            var ax = 0, ay = 0, cx = 0, cy = 0;
            handler.aRadius = 1;
            
            $('#mAreaMobile').bind('touchstart', function (event) {
                if (event.originalEvent.touches.length === 1) {
                    handler.sx = event.originalEvent.touches[0].pageX - $(this).offset().left;
                    handler.sy = event.originalEvent.touches[0].pageY - $(this).offset().top;
                } else if (event.originalEvent.touches.length === 2) {
                    handler.sx = ((event.originalEvent.touches[0].pageX - $(this).offset().left) + (event.originalEvent.touches[1].pageX - $(this).offset().left)) / 2;
                    handler.sy = ((event.originalEvent.touches[0].pageY - $(this).offset().top) + (event.originalEvent.touches[1].pageY - $(this).offset().top)) / 2;
                }
                cx = handler.sx;
                cy = handler.sy;
                handler.aRadius = 1;
                
                if (handler.regInfo.length > 0) {
                    while (!match && handler.regCount < handler.regInfo.length) {
                        if (((handler.regInfo[handler.regCount].sx - handler.regInfo[handler.regCount].radius) < handler.sx) && ((handler.regInfo[handler.regCount].sx + handler.regInfo[handler.regCount].radius) > handler.sx) &&
                            ((handler.regInfo[handler.regCount].sy - handler.regInfo[handler.regCount].radius) < handler.sy) && ((handler.regInfo[handler.regCount].sy + handler.regInfo[handler.regCount].radius) > handler.sy)) {
                            match = true;
                            handler.sx = handler.regInfo[handler.regCount].sx;
                            handler.sy  = handler.regInfo[handler.regCount].sy;              
                            handler.rm = handler.regInfo[handler.regCount].cArea;
                            handler.aRadius = handler.regInfo[handler.regCount].radius;
                            handler.regInfo.splice(handler.regCount, 1);
                        }
                        
                        if (!match) {
                            handler.regCount++;
                        }
                    }
                    handler.regCount = 0;
                }
                
                if (event.originalEvent.touches.length === 1) {
                    var sy = handler.sy;
                    newMeasuring = true;
                    $('#mAreaMobile').bind('touchmove', function (event){
                        ctx.clearRect(0, 0, c.width, c.height);
                        $('#scene h5').remove();
                        if (handler.regInfo.length > 0) {
                            t.paintRegArea(c, ctx);
                        }

                        var my = event.originalEvent.touches[0].pageY - $(this).offset().top;

                        var deltaY = sy - my;

                        deltaY < 0 ? handler.aRadius+=2: handler.aRadius-=2;

                        if (handler.aRadius <= 0) {
                            handler.aRadius = 1;
                        }

                        var a = Math.PI * (handler.aRadius * handler.aRadius * handler.pixelSpacing[0] * handler.pixelSpacing[1]);
                        handler.rm = a / handler.infoScale;
                        
                        $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (handler.sy + 10) +'px; left: '+ (handler.sx + 10) +'px;">'+ handler.rm.toFixed(0) +'[mm&sup2;]</span></h5>');

                        ctx.beginPath();	
                        ctx.arc(handler.sx, handler.sy, handler.aRadius, 0, Math.PI * 2, true);
                        ctx.fillStyle = 'rgba(213, 133, 18, 0.3)';
                        ctx.fill();
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#d58512';
                        ctx.stroke();  
                        sy = my; 		
                    });
                } else if (event.originalEvent.touches.length === 2 && match) {
                    $('#mAreaMobile').on('touchmove', function (event){
                        ctx.clearRect(0, 0, c.width, c.height);
                        $('#scene h5').remove();
                        if (handler.regInfo.length > 0) {
                            t.paintRegArea(c, ctx);
                        }
                        
                        ax = ((event.originalEvent.touches[0].pageX - $(this).offset().left) + (event.originalEvent.touches[1].pageX - $(this).offset().left)) / 2;
                        ay = ((event.originalEvent.touches[0].pageY - $(this).offset().top) + (event.originalEvent.touches[1].pageY - $(this).offset().top)) / 2;
                        
                        handler.sx += (ax - cx);
                        handler.sy += (ay - cy);

                        $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ (handler.sy + 10) +'px; left: '+ (handler.sx + 10) +'px;">'+ handler.rm.toFixed(0) +'[mm&sup2;]</span></h5>');

                        ctx.beginPath();	
                        ctx.arc(handler.sx, handler.sy, handler.aRadius, 0, Math.PI * 2, true);
                        ctx.fillStyle = 'rgba(213, 133, 18, 0.3)';
                        ctx.fill();
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = '#d58512';
                        ctx.stroke();  	
                        cx = ax;
                        cy = ay;
                    });
                }
            });
            
            $('#mAreaMobile').bind('touchend', function () {                
                $('#mAreaMobile').unbind('touchmove'); 
                if (match || newMeasuring) {
                    handler.infoData = {
                        sx: handler.sx, sy: handler.sy,
                        radius: handler.aRadius, 
                        cArea: handler.rm
                    };
                    handler.regInfo.push(handler.infoData); 
                    match = false;
                    newMeasuring = false;
                    handler.regCount = 0;
                }
            });  
        }
    },

    paintRegArea: function (c, ctx) {
        for (var i = 0; i < handler.regInfo.length; i++) {
            $('#scene').append('<h5><span style="z-index: 20; color: #fff; background-color: rgba(0, 0, 0, 0.5); border-radius: 3px; border: 1px solid ##505050; position: absolute; top: '+ handler.regInfo[i].sy +'px; left: '+ handler.regInfo[i].sx +'px;">'+ handler.regInfo[i].cArea.toFixed(0) +'[mm&sup2;]</span></h5>');
            
            ctx.beginPath();	
            ctx.arc(handler.regInfo[i].sx, handler.regInfo[i].sy, handler.regInfo[i].radius, 0, Math.PI * 2, true);
            ctx.fillStyle = 'rgba(213, 133, 18, 0.3)';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#d58512';
            ctx.stroke();
        } 		 
    }
};