  /* Actions
 * --------  
 * Created by:
 * - Toth (http://www.toth.cl)
 * - DigitalDev (http://www.digitaldev.org)	
 *
 * © Copyright 2014
 */

var action = {
	init: function () {
        
        handler.init();       	

        $(window).on('resize', function (event) {            
            if (!handler.mobileEnvironment.isMobile()) { 
                handler.resize = true;  
                handler.toolbox();  
                handler.resizeMeasuring();
                handler.infoScene();
                handler.infoTooSmall();
                handler.progressbar(); 
                handler.respScene();  
                handler.dontDiagnostic();
            } else {
                if ($(window).width() >= $(window).height()) {
                    handler.orientation = 'landscape';
                } else {
                    handler.orientation = 'portrait';
                }
                handler.changeWorkspace();
                handler.toolbox();                 
                handler.resizeMeasuringMobile();
                handler.infoScene();
                handler.infoTooSmall();
                handler.screenTooSmall();
                handler.respScene();
                handler.dontDiagnostic();
            }               
        }); 

        $('#play').on('click', function (event) {
            if (handler.countImages === handler.numImages) {
                if ($(this).hasClass('btn-warning')) {
                    $(this).removeClass('btn-warning').addClass('btn-default');
                    $(this).children().removeClass('glyphicon-pause').addClass('glyphicon-play');
                    handler.tool = 1;
                    handler.playset(event);
                } else {
                    handler.removeBeforeTool(event);
                    if ($('#magGlass').hasClass('btn-warning')) {
                        handler.tool = 2;
                        handler.removeBeforeTool(event);
                    } else if ($('#ruler').hasClass('btn-warning')) {
                        handler.tool = 5;
                        handler.removeBeforeTool(event);
                    } else if ($('#angle').hasClass('btn-warning')) {
                        handler.tool = 6;
                        handler.removeBeforeTool(event);
                    } else if ($('#area').hasClass('btn-warning')) {
                        handler.tool = 7;
                        handler.removeBeforeTool(event);
                    }
                    $(this).removeClass('btn-default').addClass('btn-warning');
                    $(this).children().removeClass('glyphicon-play').addClass('glyphicon-pause');
                    handler.tool = 4;
                    handler.playset(event);
                }         
            }               
        });

        $('#negative').on('click', function () {            
            if ($(this).hasClass('btn-warning')) {
                $(this).removeClass('btn-warning').addClass('btn-default');
                handler.tool = 1;
                handler.rmNegative();
            } else {
                $(this).removeClass('btn-default').addClass('btn-warning');
                handler.tool = 3;
                handler.negative();
            }
        });

        $('.modal-backdrop').on('click', function () {            
            $('#sets').removeClass('btn-warning').addClass('btn-default');
        });

        $('#magGlass').on('click', function (event) {            
            if ($(this).hasClass('btn-warning')) {
                $(this).removeClass('btn-warning').addClass('btn-default');
                handler.tool = 1;
                handler.rmMagnifyingGlass();
            } else {
                handler.removeBeforeTool(event);
                if ($('#play').hasClass('btn-warning')) {
                    handler.tool = 4;
                    handler.removeBeforeTool(event);
                } else if ($('#ruler').hasClass('btn-warning')) {
                    handler.tool = 5;
                    handler.removeBeforeTool(event);
                } else if ($('#angle').hasClass('btn-warning')) {
                    handler.tool = 6;
                    handler.removeBeforeTool(event);
                } else if ($('#area').hasClass('btn-warning')) {
                    handler.tool = 7;
                    handler.removeBeforeTool(event);
                }
                $(this).removeClass('btn-default').addClass('btn-warning');
                handler.tool = 2;
                handler.magnifyingGlass();
            }            
        });

        $('#ruler').on('click', function (event) {
            if ($(this).hasClass('btn-warning')) {
                $(this).removeClass('btn-warning').addClass('btn-default');
                handler.tool = 1;
                handler.rmRuler();
            } else {
                handler.removeBeforeTool(event);
                if ($('#play').hasClass('btn-warning')) {
                    handler.tool = 4;
                    handler.removeBeforeTool(event);
                } else if ($('#magGlass').hasClass('btn-warning')) {
                    handler.tool = 2;
                    handler.removeBeforeTool(event);
                } else if ($('#angle').hasClass('btn-warning')) {
                    handler.tool = 6;
                    handler.removeBeforeTool(event);
                } else if ($('#area').hasClass('btn-warning')) {
                    handler.tool = 7;
                    handler.removeBeforeTool(event);
                }
                $(this).removeClass('btn-default').addClass('btn-warning');
                handler.tool = 5;
                handler.ruler();
            }
        });

        $('#angle').on('click', function (event) {
            if ($(this).hasClass('btn-warning')) {
                $(this).removeClass('btn-warning').addClass('btn-default');
                handler.tool = 1;
                handler.rmAngle();
            } else {
                handler.removeBeforeTool(event);
                if ($('#play').hasClass('btn-warning')) {
                    handler.tool = 4;
                    handler.removeBeforeTool(event);
                } else if ($('#magGlass').hasClass('btn-warning')) {
                    handler.tool = 2;
                    handler.removeBeforeTool(event);
                } else if ($('#ruler').hasClass('btn-warning')) {
                    handler.tool = 5;
                    handler.removeBeforeTool(event);
                } else if ($('#area').hasClass('btn-warning')) {
                    handler.tool = 7;
                    handler.removeBeforeTool(event);
                }
                $(this).removeClass('btn-default').addClass('btn-warning');
                handler.tool = 6;
                handler.angle();
            }
        });

        $('#area').on('click', function (event) {
            if ($(this).hasClass('btn-warning')) {
                $(this).removeClass('btn-warning').addClass('btn-default');
                handler.tool = 1;
                handler.rmArea();
            } else {
                handler.removeBeforeTool(event);
                if ($('#play').hasClass('btn-warning')) {
                    handler.tool = 4;
                    handler.removeBeforeTool(event);
                } else if ($('#magGlass').hasClass('btn-warning')) {
                    handler.tool = 2;
                    handler.removeBeforeTool(event);
                } else if ($('#ruler').hasClass('btn-warning')) {
                    handler.tool = 5;
                    handler.removeBeforeTool(event);
                } else if ($('#angle').hasClass('btn-warning')) {
                    handler.tool = 6;
                    handler.removeBeforeTool(event);
                }
                $(this).removeClass('btn-default').addClass('btn-warning');
                handler.tool = 7;
                handler.area();
            }
        });

        $('#reset').on('click', function () {           
            handler.reset();
        });

        $('#report').on('click', function () {            
            handler.tool = 1;
        });

        $('#info').on('click', function () {            
            if ($(this).hasClass('btn-warning')) {
                $(this).removeClass('btn-warning').addClass('btn-default');
                handler.tool = 1;
                handler.rmInfo();
            } else {
                $(this).removeClass('btn-default').addClass('btn-warning');
                handler.tool = 9;
                handler.info();
            }
        });

        $('#progressbar').on('click', function (event) {
            if ($('#ruler').hasClass('btn-warning')) {
                $('#ruler').removeClass('btn-warning').addClass('btn-default');
                handler.rmRuler();
                handler.tool = 1;
            }
            if ($('#angle').hasClass('btn-warning')) {
                $('#angle').removeClass('btn-warning').addClass('btn-default');
                handler.rmAngle();
                handler.tool = 1;
            }
            if ($('#area').hasClass('btn-warning')) {
                $('#area').removeClass('btn-warning').addClass('btn-default');
                handler.rmArea();
                handler.tool = 1;
            }
            var cy = event.clientY;
            var r = (cy / handler.rScroll).toFixed(0);
            var n = (cy / handler.rScroll).toFixed(2);
            if (r < n) {
                r++;
            }
            $('#scroll').css('top', (r - 1) * handler.rScroll);             
            handler.numImg = r;
            handler.drawScene(handler.numImg);

        });

        $('#scroll').on('mousedown', function () {           
            handler.progressbarScroll();
        });

        $('#progressbar').on('mouseup', function () {
            $('#progressbar').unbind('mousemove');
        });

        $('#myCanvas').on('mousedown', function (event) {        	
            handler.mClickPos.x = event.clientX - $(this).offset().left;
            handler.mClickPos.y = event.clientY - $(this).offset().top;	
            handler.lastY = handler.mClickPos.y;

            switch (event.which) {
                case 1:
                    if (handler.tool === 1 || handler.tool === 3 || handler.tool === 8 || handler.tool === 9) {
                        handler.filter();
                    }                	
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

        $('#scene').on('mousewheel', function (event) {
            if ($('#ruler').hasClass('btn-warning')) {
                $('#ruler').removeClass('btn-warning').addClass('btn-default');
                handler.rmRuler();
                handler.tool = 1;
            }
            if ($('#angle').hasClass('btn-warning')) {
                $('#angle').removeClass('btn-warning').addClass('btn-default');
                handler.rmAngle();
                handler.tool = 1;
            }
            if ($('#area').hasClass('btn-warning')) {
                $('#area').removeClass('btn-warning').addClass('btn-default');
                handler.rmArea();
                handler.tool = 1;
            }
            if (handler.tool != 4) {
                if (event.deltaY >= 1) {
                    if (handler.numImg >= 1) {
                        handler.numImg--;  
                    }               
                    if (handler.numImg < 1) {
                        handler.numImg = 1;    
                    } 
                } else {
                    if (handler.numImg <= handler.countImages) {
                        handler.numImg++;                   
                    }    
                    if (handler.numImg > handler.countImages) {
                        handler.numImg = handler.countImages;                       
                    }             
                }  
                $('#scroll').css('top', (handler.numImg - 1) * handler.rScroll); 
                handler.drawScene(handler.numImg);  
            }               
        });   

        $(window).bind('contextmenu', function () {
            /*event.preventDefault();*/
            return false;
        });  

        /*******************************************************/
        /******************Mobile properties********************/
        if (handler.mobileEnvironment.isMobile()) {
            $('#playMobile').bind('touchstart', function (event) {
                if (handler.countImages === handler.numImages) {
                    if ($(this).hasClass('btn-warning')) {
                        $(this).removeClass('btn-warning').addClass('btn-default');
                        $(this).children().removeClass('glyphicon-pause').addClass('glyphicon-play');
                        handler.tool = 1;
                        handler.playset(event);
                    } else {
                        handler.removeBeforeTool(event);
                        if ($('#rulerMobile').hasClass('btn-warning')) {
                            handler.tool = 5;
                            handler.removeBeforeTool(event);
                        } else if ($('#angleMobile').hasClass('btn-warning')) {
                            handler.tool = 6;
                            handler.removeBeforeTool(event);
                        } else if ($('#areaMobile').hasClass('btn-warning')) {
                            handler.tool = 7;
                            handler.removeBeforeTool(event);
                        }
                        $(this).removeClass('btn-default').addClass('btn-warning');
                        $(this).children().removeClass('glyphicon-play').addClass('glyphicon-pause');
                        handler.tool = 4;
                        handler.playset(event);
                    }         
                }               
            });

            $('#negativeMobile').bind('touchstart', function () {            
                if ($(this).hasClass('btn-warning')) {
                    $(this).removeClass('btn-warning').addClass('btn-default');
                    handler.tool = 1;
                    handler.rmNegative();
                } else {
                    $(this).removeClass('btn-default').addClass('btn-warning');
                    handler.tool = 3;
                    handler.negative();
                }
            });

            $('#rulerMobile').on('touchstart', function (event) {
                if ($(this).hasClass('btn-warning')) {
                    $(this).removeClass('btn-warning').addClass('btn-default');
                    handler.tool = 1;
                    handler.rmRuler();
                } else {
                    handler.removeBeforeTool(event);
                    if ($('#playMobile').hasClass('btn-warning')) {
                        handler.tool = 4;
                        handler.removeBeforeTool(event);
                    } else if ($('#angleMobile').hasClass('btn-warning')) {
                        handler.tool = 6;
                        handler.removeBeforeTool(event);
                    } else if ($('#areaMobile').hasClass('btn-warning')) {
                        handler.tool = 7;
                        handler.removeBeforeTool(event);
                    }
                    $(this).removeClass('btn-default').addClass('btn-warning');
                    handler.tool = 5;
                    handler.ruler();
                }
            });

            $('#angleMobile').bind('touchstart', function (event) {
                if ($(this).hasClass('btn-warning')) {
                    $(this).removeClass('btn-warning').addClass('btn-default');
                    handler.tool = 1;
                    handler.rmAngle();
                } else {
                    handler.removeBeforeTool(event);
                    if ($('#playMobile').hasClass('btn-warning')) {
                        handler.tool = 4;
                        handler.removeBeforeTool(event);
                    } else if ($('#rulerMobile').hasClass('btn-warning')) {
                        handler.tool = 5;
                        handler.removeBeforeTool(event);
                    } else if ($('#areaMobile').hasClass('btn-warning')) {
                        handler.tool = 7;
                        handler.removeBeforeTool(event);
                    }
                    $(this).removeClass('btn-default').addClass('btn-warning');
                    handler.tool = 6;
                    handler.angle();
                }
            });

            $('#areaMobile').bind('touchstart', function (event) {
                if ($(this).hasClass('btn-warning')) {
                    $(this).removeClass('btn-warning').addClass('btn-default');
                    handler.tool = 1;
                    handler.rmArea();
                } else {
                    handler.removeBeforeTool(event);
                    if ($('#playMobile').hasClass('btn-warning')) {
                        handler.tool = 4;
                        handler.removeBeforeTool(event);
                    } else if ($('#rulerMobile').hasClass('btn-warning')) {
                        handler.tool = 5;
                        handler.removeBeforeTool(event);
                    } else if ($('#angleMobile').hasClass('btn-warning')) {
                        handler.tool = 6;
                        handler.removeBeforeTool(event);
                    }
                    $(this).removeClass('btn-default').addClass('btn-warning');
                    handler.tool = 7;
                    handler.area();
                }
            });

            $('#resetMobile').bind('touchstart', function () {           
                handler.reset();
            });

            $('#reportMobile').bind('touchstart', function () {            
                handler.tool = 1;
            });

            $('#infoMobile').bind('touchstart', function () {            
                if ($(this).hasClass('btn-warning')) {
                    $(this).removeClass('btn-warning').addClass('btn-default');
                    handler.tool = 1;
                    handler.rmInfo();
                } else {
                    $(this).removeClass('btn-default').addClass('btn-warning');
                    handler.tool = 9;
                    handler.info();
                }
            });

            $('#setsMobile').on('click', function () {
                $(window).unbind('touchmove');
            });

            $('#setsModalMobile').on('click', function () {
                $(window).bind('touchmove', function (event) {
                    event.preventDefault();
                });
            });

            $('.closeMobile').on('click', function () {
                $(window).bind('touchmove', function (event) {
                    event.preventDefault();
                });
            });

            $('#progressbarMobileL').on('touchstart', function (event) {                   
                var cy = event.originalEvent.touches[0].pageY - $(this).offset().top;
                var r = (cy / handler.rScrollL).toFixed(0);
                var n = (cy / handler.rScrollL).toFixed(2);
                if (r < n) {
                    r++;
                }
                $('#scrollMobileL').css('top', (r - 1) * handler.rScrollL); 
                $('#scrollMobileP').css('left', (r - 1) * handler.rScrollP);     
                         
                handler.numImg = r;
                handler.drawScene(handler.numImg);

            });

            $('#progressbarMobileP').on('touchstart', function (event) {                   
                var cx = event.originalEvent.touches[0].pageX - $(this).offset().left;
                var r = (cx / handler.rScrollP).toFixed(0);
                var n = (cx / handler.rScrollP).toFixed(2);
                if (r < n) {
                    r++;
                }
                $('#scrollMobileL').css('top', (r - 1) * handler.rScrollL); 
                $('#scrollMobileP').css('left', (r - 1) * handler.rScrollP);   
                         
                handler.numImg = r;
                handler.drawScene(handler.numImg);

            });

            $('#scrollMobileL').bind('touchstart', function () {           
                handler.progressbarScroll();
            });

            $('#scrollMobileP').bind('touchstart', function () {           
                handler.progressbarScroll();
            });

            $('#myCanvas').bind('touchstart', function (event) {
                switch (event.originalEvent.touches.length) {
                    case 1: // One finger: brightness and contrast
                        $(this).unbind('touchmove');
                        handler.posStartOneFinger = {
                            x: event.originalEvent.touches[0].pageX,
                            y: event.originalEvent.touches[0].pageY
                        };
                        $(this).bind('touchmove', function (event) {
                            handler.posMoveOneFinger = {
                                x: event.originalEvent.touches[0].pageX,
                                y: event.originalEvent.touches[0].pageY
                            };
                            handler.deltaX += (handler.posMoveOneFinger.x - handler.posStartOneFinger.x) / 100;
                            handler.deltaY += (handler.posMoveOneFinger.y - handler.posStartOneFinger.y) / 100;
                            handler.mc = Math.max(1, Math.min(handler.deltaX, 10));
                            handler.mb = Math.max(0, Math.min(handler.deltaY, 10));                        

                            $('#infoBC').html('Brillo: '+ handler.mb.toFixed(2) +' | Contraste: '+ handler.mc.toFixed(2));
                            $(this).css('-webkit-filter', 'contrast('+ handler.mc +') brightness('+ handler.mb +') invert('+ handler.mn +')');       
                            
                            handler.posStartOneFinger.x = handler.posMoveOneFinger.x;
                            handler.posStartOneFinger.y = handler.posMoveOneFinger.y;
                        }); 
                        break;
                    case 2: // Two fingers: drag and zoom
                        $(this).unbind('touchmove');
                        handler.mlastScale = handler.mscale;    

                        handler.posStartTwoFingers = {
                            x: (event.originalEvent.touches[0].pageX + event.originalEvent.touches[1].pageX) / 2 - handler.lastDrag.x,
                            y: (event.originalEvent.touches[0].pageY + event.originalEvent.touches[1].pageY) / 2 - handler.lastDrag.y
                        };                 
                        
                        $(this).bind('touchmove', function (event) {
                            event.preventDefault();
                            handler.posMoveTwoFingers = {
                                x: (event.originalEvent.touches[0].pageX + event.originalEvent.touches[1].pageX) / 2,
                                y: (event.originalEvent.touches[0].pageY + event.originalEvent.touches[1].pageY) / 2
                            };

                            handler.posMoveFix = {
                                x: (handler.posMoveTwoFingers.x - $('#scene').offset().left - handler.lastDrag.x),
                                y: (handler.posMoveTwoFingers.y - $('#scene').offset().top - handler.lastDrag.y)
                            };

                            handler.posDiffTwoFingers = {
                                x: (handler.posMoveTwoFingers.x - handler.posStartTwoFingers.x),
                                y: (handler.posMoveTwoFingers.y - handler.posStartTwoFingers.y)
                            };   
                            
                            handler.posOrigin = {
                                x: handler.posOrigin.x + ((handler.posMoveFix.x - handler.posMoveLast.x) / handler.mscale),
                                y: handler.posOrigin.y + ((handler.posMoveFix.y - handler.posMoveLast.y) / handler.mscale)
                            };

                            if (handler.mobileEnvironment.isAndroid()) {
                                Hammer(document.getElementById('myCanvas')).on('transform', function(ev) {
                                    handler.mscale = Math.max(0.1, Math.min(handler.mlastScale * ev.gesture.scale, 100));
                                });
                            } else {
                                handler.mscale = Math.max(0.1, Math.min(handler.mlastScale * event.originalEvent.scale, 100));  
                            } 

                            handler.infoScale = (handler.respScale * handler.mscale).toFixed(2); 
                            $('#infoScale').html('Escala: '+ handler.infoScale);  

                            handler.posTranslate = {
                                x: ((handler.posMoveFix.x - handler.posOrigin.x) / handler.mscale),
                                y: ((handler.posMoveFix.y - handler.posOrigin.y) / handler.mscale)
                            };
   
                            handler.posMoveLast.x = handler.posMoveFix.x;
                            handler.posMoveLast.y = handler.posMoveFix.y;      

                            handler.morigin = handler.posOrigin.x +'px '+ handler.posOrigin.y +'px';  
                            handler.mtranslate = handler.posTranslate.x +'px, '+ handler.posTranslate.y +'px';           
                            
                            $(this).css('-webkit-transform', 'scale('+ handler.mscale +') translate('+ handler.mtranslate +')');
                            $(this).css('-webkit-transform-origin', handler.morigin);      

                            $(this).css({'left': handler.posDiffTwoFingers.x, 'top': handler.posDiffTwoFingers.y});

                            handler.lastDrag.x = handler.posDiffTwoFingers.x;
                            handler.lastDrag.y = handler.posDiffTwoFingers.y;
                        }); 
                        break;
                    case 3: // Three fingers: slider set
                        $(this).unbind('touchmove');
                        $('#fingers').html('three');
                        handler.posStartThreeFingers = {
                            x: event.originalEvent.touches[1].pageX,
                            y: event.originalEvent.touches[1].pageY
                        };
                        $(this).bind('touchmove', function (event) {
                            handler.posMoveThreeFingers = {
                                x: event.originalEvent.touches[1].pageX,
                                y: event.originalEvent.touches[1].pageY
                            };
                            handler.deltaYSet = handler.posMoveThreeFingers.y - handler.posStartThreeFingers.y;

                            if (handler.deltaYSet < 0) {
                                if (handler.numImg >= 1) {
                                    handler.numImg--;                                    
                                }               
                                if (handler.numImg < 1) {
                                    handler.numImg = 1;
                                } 
                            } else if (handler.deltaYSet > 0) {
                                if (handler.numImg <= handler.countImages) {
                                    handler.numImg++;                                   
                                }    
                                if (handler.numImg > handler.countImages) {
                                    handler.numImg = handler.countImages;
                                }  
                            }
                            $('#scrollMobileL').css('top', (handler.numImg - 1) * handler.rScrollL); 
                            $('#scrollMobileP').css('left', (handler.numImg - 1) * handler.rScrollP); 
                            handler.drawScene(handler.numImg); 
                            handler.posStartThreeFingers.y = handler.posMoveThreeFingers.y;
                        });
                        break;
                }
            });
            
            /*$('#myCanvas').bind('touchend', function () {
                $(this).unbind('touchstart');
                $(this).unbind('touchmove');
            });   */         
        }        

        $(window).bind('touchmove', function (event) {
            event.preventDefault();
        });

        $('#close').on('click', function (event) {
            window.close();
        });
    }
};