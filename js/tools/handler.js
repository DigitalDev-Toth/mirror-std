/* Handlers
 * --------  
 * Created by:
 * - Toth (http://www.toth.cl)
 * - DigitalDev (http://www.digitaldev.org)	
 *
 * © Copyright 2014
 */

var handler = { 	
    canvas: null, context: null, img: {}, tempCanvas: null, tempContext: null,
    resize: false,
    resized: false,
    canvasSize: {w: 0, h: 0},
    canvasPos: {x: 0, y: 0},
    imgSize: {w: 0, h: 0},
    imgLastSize: {w: 0, h: 0},
    imgStartPos: {x: 0, y: 0},
    scale: 1, ratio: 1.001, zoomRatio: 1,
    infoScale: 0, respScale: 0,
    lastX: 0, lastY: 0,
    origin: {x: 0, y: 0},
    lastOrigin: {x: 0, y: 0},
    ctxRatioW: 0, ctxRatioH: 0,
    mClickPos: {x: 0, y: 0},
    fTime: 0,
    ba: 1, b: 1, c: 1, // bright and contrast adjustment values
    isNegative: false,
    sources: {}, records: 0, pixelSpacing: 0, set: 0,
    charged: false, intervalLoad: null,
    countImages: 0,
    numImages: 0,
    numImg: 1,
    tool: 1,
    runAnimation: false,
    rClicks: 0, // ruler clicks
    rm: 0, // ruler measuring
    infoData: {bx: 0, by: 0, fx: 0, fy: 0, sx: 0, sy: 0, tx: 0, ty: 0, radius: 1, cRuler: 0, cAngle: 0, cArea: 0},
    regInfo: null, regCount: 0, cRuler: 0, cAngle: 0, cArea: 0,
    bx: 0, by: 0, fx: 0, fy: 0, sx: 0, sy: 0, tx: 0, ty: 0, // begin, final/first, start/second, third
    rScroll: 0, rScrollL: 0, rScrollP: 0, // ratio scroll
    aRadius: 0,
    asx: 0, asy: 0, match: false,
    /*******************************************************/
    /******************Mobile properties********************/
    orientation: null,
    posStartTwoFingers: {x: 0, y: 0}, posMoveTwoFingers: {x: 0, y: 0}, posDiffTwoFingers: {x: 0, y: 0}, posScaleTwoFingers: {x: 0, y: 0}, 
    lastDrag : {x: 0, y: 0}, posMoveLast: {x: 0, y: 0}, posOrigin: {x: 0, y: 0}, posTranslate: {x: 0, y: 0}, posMoveFix: {x: 0, y: 0},
    mscale: 1, mlastScale: 1, mb : 1, mc: 1, mn: 0, morigin: '', mtranslate: '',
    posStartOneFinger: {x: 0, y: 0}, posMoveOneFinger: {x: 0, y: 0},
    posStartThreeFingers: {x: 0, y: 0}, posMoveThreeFingers: {x: 0, y: 0},
    deltaX: 1, deltaY: 1, deltaYSet: 0,
    /*******************************************************/

    init: function () {
        var t = this;   
        if (t.mobileEnvironment.isMobile()) { 
            if ($(window).width() >= $(window).height()) {
                t.orientation = 'landscape';
            } else {
                t.orientation = 'portrait';
            }
        }
        t.workspace();      
        t.toolbox();
        t.infoScene();
        t.infoTooSmall();
        t.screenTooSmall();
        t.configCanvas();
        t.chargeSets(); 
        t.dontDiagnostic();
    },

    workspace: function () {
        var t = this;        
        if (!t.mobileEnvironment.isMobile()) {
            var workspace = '<div class="row">'
                                +'<div class="col-xs-2 center-block">'
                                    +'<div id="toolbox" class="text-center">'
                                        +'<div id="containerTitle" style="width: 100%; background-color: #f69322; border-top: 5px solid rgb(68, 68, 68); border-bottom: 5px solid rgb(68, 68, 68); color: #fff"><span id="toolboxTitle">'+ lang.toolboxTitle +'</span></div>'
                                        +'<button id="play" type="button" class="btn btn-default btn-size" title="'+ lang.buttonPlayset +'"><span class="glyphicon glyphicon-play"></span></button>'
                                        +'<button id="negative" type="button" class="btn btn-default btn-size" title="'+ lang.buttonNegative +'"><span class="glyphicon glyphicon-adjust"></span></button>'
                                        +'<button id="magGlass" type="button" class="btn btn-default btn-size" title="'+ lang.buttonLens +'"><span class="icon-magnifier"></span></button>'                                    
                                        +'<div id="separator" style="width: 100%; height: 20px; background-color: rgb(68, 68, 68); border-top: 5px solid rgb(68, 68, 68); border-bottom: 5px solid rgb(68, 68, 68);"></div>'                                    
                                        +'<button id="ruler" type="button" class="btn btn-default btn-size" title="'+ lang.buttonRuler +'"><span class="icon-ruler"></span></button>'
                                        +'<button id="angle" type="button" class="btn btn-default btn-size" title="'+ lang.buttonAngle +'"><span class="icon-ruler2"></span></button>'
                                        +'<button id="area" type="button" class="btn btn-default btn-size" title="'+ lang.buttonArea +'"><span class="icon-circle"></span></button>'
                                        +'<div id="separator" style="width: 100%; height: 20px; background-color: rgb(68, 68, 68); border-top: 5px solid rgb(68, 68, 68); border-bottom: 5px solid rgb(68, 68, 68);"></div>'
                                        +'<button id="reset" type="button" class="btn btn-default btn-size" title="'+ lang.buttonReset +'"><span class="icon-rotate"></span></button>'
                                        +'<button id="info" type="button" class="btn btn-warning btn-size" title="'+ lang.buttonInfo +'"><span class="glyphicon glyphicon-list-alt"></span></button>'
                                        +'<button id="report" type="button" class="btn btn-default btn-size" title="'+ lang.buttonReport +'" data-toggle="modal" data-target="#reportModal"><span class="icon-clipboard"></span></button>'
                                        +'<div id="separator" style="width: 100%; height: 20px; background-color: rgb(68, 68, 68); border-top: 5px solid rgb(68, 68, 68); border-bottom: 5px solid rgb(68, 68, 68);"></div>'
                                        +'<button id="close" type="button" class="btn btn-default btn-size" title="'+ lang.buttonClose +'"><span class="glyphicon glyphicon-remove"></span></button>'
                                        +'<button id="send" type="button" class="btn btn-default btn-size" title="'+ lang.buttonSend +'" data-toggle="modal" data-target="#sendModal"><span class="glyphicon glyphicon-send"></span></button>'
                                        +'<div id="separator" style="width: 100%; height: 20px; background-color: rgb(68, 68, 68); border-top: 5px solid rgb(68, 68, 68); border-bottom: 5px solid rgb(68, 68, 68);"></div>'
                                        +'<button id="sets" class="btn btn-default btn-size" title="'+ lang.buttonSets +'" data-toggle="modal" data-target="#setsModal"><span class="glyphicon glyphicon-picture"></span></button>'
                                        +'<div id="contSetlist" style="position: relative">'
                                            +'<div id="setlist" style="height: 400px; overflow: auto;"></div>'
                                            +'<div id="waitSet" style="width: 100%; height: 100%; position: absolute; left: 0px; top: 0px; z-index: 30; background-color: rgba(68, 68, 68, 0.8); display: table">'
                                                +'<div style="height: 50px; display: table-cell; vertical-align: middle"><img src="img/waiting.gif" /></div>'
                                            +'</div>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                                +'<div class="col-xs-9">'
                                    +'<div id="infoMedical">'
                                        +'<p id="infoPatientName"></p>'
                                        +'<p id="infoPatientId"></p>'
                                        +'<p id="infoPatientSex"></p>'
                                        +'<p id="infoSerieBodyPart"></p>'
                                        +'<p id="infoInstitutionName"></p>'
                                    +'</div>'
                                    +'<div id="scene" class="center-block"></div>'
                                    +'<div id="dontDiagnostic">'+ lang.msgDontDiagnostic +'</div>'
                                    +'<div id="infoScene">'
                                        +'<p id ="infoScale"></p>'
                                        +'<p id ="infoBC"></p>'
                                        +'<p id ="infoIMG"></p>'
                                    +'</div>'
                                +'</div>'
                                +'<div class="col-xs-1">'
                                    +'<div id="progressbar"><div id="scroll"></div></div>'
                                +'</div>'
                            +'</div>'
                            +'<div class="modal fade" id="setsModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
                                +'<div class="modal-dialog modal-sm modal-setlist">'
                                    +'<div class="modal-content">'
                                        +'<div class="modal-header">'
                                            +'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                                            +'<h4 class="modal-title" id="myModalLabel">'+ lang.titleSetsModal +'</h4>'
                                        +'</div>'
                                        +'<div class="modal-body">'
                                            +'<div id="contSetlistModal" style="position: relative">'
                                                +'<div id="setlistModal" style="width: 200px; height: 400px; overflow: auto"></div>'
                                                +'<div id="waitSetModal" style="width: 200px; height: 100%; position: absolute; left: 0px; top: 0px; z-index: 30; background-color: rgba(68, 68, 68, 0.8); display: table">'
                                                    +'<div style="width: 200px; height: 50px; display: table-cell; vertical-align: middle" class="text-center"><img src="img/waiting.gif" /></div>'
                                                +'</div>'
                                            +'</div>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
                            +'<div class="modal fade" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">'
                                +'<div class="modal-dialog modal-lg modal-report">'
                                    +'<div class="modal-content">'
                                        +'<div class="modal-header">'
                                            +'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                                            +'<h4 class="modal-title" id="myModalLabel1">'+ lang.titleReportModal +'</h4>'
                                        +'</div>'
                                        +'<div class="modal-body">'  
                                            +'<div id="report-pdf"></div>'                                        
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
                            +'<div class="modal fade" id="sendModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">'
                                +'<div class="modal-dialog modal-lg modal-report">'
                                    +'<div class="modal-content">'
                                        +'<div class="modal-header">'
                                            +'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                                            +'<h4 class="modal-title" id="myModalLabel1">'+ lang.titleSendModal +'</h4>'
                                        +'</div>'
                                        +'<div class="modal-body">'  
                                            +'<div id="sendForm"><iframe id="sendFrame" src="php/send.php?study='+study+'" width="100% height="100%" frameborder="0"></iframe></div>'                                        
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
                            ;
        } else {         
            var workspace = '<div class="row">'
                                +'<div id="contToolbox" class="col-xs-1 center-block">'
                                    +'<div id="toolbox" class="text-center">'
                                        +'<div id="containerTitle" class="separator" style="width: 100%; height: 20px; background-color: #f69322; border-top: 5px solid rgb(68, 68, 68); border-bottom: 5px solid rgb(68, 68, 68); color: #fff; display: table;">'
                                            +'<span id="toolboxTitle" style="display: table-cell; vertical-align: middle;">'+ lang.toolboxTitle +'</span>'
                                        +'</div>'
                                        +'<button id="playMobile" type="button" class="btn btn-default btn-size" title="'+ lang.buttonPlayset +'"><span class="glyphicon glyphicon-play"></span></button>'
                                        +'<button id="negativeMobile" type="button" class="btn btn-default btn-size" title="'+ lang.buttonNegative +'"><span class="glyphicon glyphicon-adjust"></span></button>'
                                        +'<div class="separator" style="width: 100%; height: 20px; background-color: rgb(68, 68, 68); border-top: 5px solid rgb(68, 68, 68); border-bottom: 5px solid rgb(68, 68, 68);"></div>'                                    
                                        +'<button id="rulerMobile" type="button" class="btn btn-default btn-size" title="'+ lang.buttonRuler +'"><span class="icon-ruler"></span></button>'
                                        +'<button id="angleMobile" type="button" class="btn btn-default btn-size" title="'+ lang.buttonAngle +'"><span class="icon-ruler2"></span></button>'
                                        +'<button id="areaMobile" type="button" class="btn btn-default btn-size" title="'+ lang.buttonArea +'"><span class="icon-circle"></span></button>'
                                        +'<div class="separator" style="width: 100%; height: 20px; background-color: rgb(68, 68, 68); border-top: 5px solid rgb(68, 68, 68); border-bottom: 5px solid rgb(68, 68, 68);"></div>'
                                        +'<button id="resetMobile" type="button" class="btn btn-default btn-size" title="'+ lang.buttonReset +'"><span class="icon-rotate"></span></button>'
                                        +'<button id="infoMobile" type="button" class="btn btn-warning btn-size" title="'+ lang.buttonInfo +'"><span class="glyphicon glyphicon-list-alt"></span></button>'
                                        +'<button id="reportMobile" type="button" class="btn btn-default btn-size" title="'+ lang.buttonReport +'" data-toggle="modal" data-target="#reportModalMobile"><span class="icon-clipboard"></span></button>'
                                        +'<div class="separator" style="width: 100%; height: 20px; background-color: rgb(68, 68, 68); border-top: 5px solid rgb(68, 68, 68); border-bottom: 5px solid rgb(68, 68, 68);"></div>'
                                        +'<button id="setsMobile" class="btn btn-default btn-size" title="'+ lang.buttonSets +'" data-toggle="modal" data-target="#setsModalMobile"><span class="glyphicon glyphicon-picture"></span></button>'
                                    +'</div>'
                                +'</div>'
                                +'<div id="contScene" class="col-xs-10">'
                                    +'<div id="infoMedical">'
                                        +'<p id="infoPatientName"></p>'
                                        +'<p id="infoPatientId"></p>'
                                        +'<p id="infoPatientSex"></p>'
                                        +'<p id="infoSerieBodyPart"></p>'
                                        +'<p id="infoInstitutionName"></p>'
                                    +'</div>'
                                    +'<div id="scene" class="center-block"></div>'
                                    +'<div id="dontDiagnostic">'+ lang.msgDontDiagnostic +'</div>'
                                    +'<div id="infoScene">'
                                        +'<p id ="infoScale"></p>'
                                        +'<p id ="infoBC"></p>'
                                        +'<p id ="infoIMG"></p>'
                                    +'</div>'
                                +'</div>'
                                +'<div id="contProgressbar" class="col-xs-1">'
                                    +'<div id="progressbarMobileL"><div id="scrollMobileL"></div></div>'
                                    +'<div id="progressbarMobileP"><div id="scrollMobileP"></div></div>'
                                +'</div>'
                            +'</div>'
                            +'<div class="modal fade" id="setsModalMobile" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
                                +'<div class="modal-dialog modal-sm modal-setlist">'
                                    +'<div class="modal-content">'
                                        +'<div class="modal-header">'
                                            +'<button type="button" class="close closeMobile" data-dismiss="modal" aria-hidden="true">&times;</button>'
                                            +'<h4 class="modal-title" id="myModalLabel">'+ lang.titleSetsModal +'</h4>'
                                        +'</div>'
                                        +'<div class="modal-body">'
                                            +'<div id="contSetlistModal" style="position: relative">'
                                                +'<div id="setlistModal" style="height: 400px; width: 200px; display: block; overflow: scroll; -webkit-overflow-scrolling: touch;"></div>'
                                                +'<div id="waitSetModal" style="width: 200px; height: 100%; position: absolute; left: 0px; top: 0px; z-index: 30; background-color: rgba(68, 68, 68, 0.8); display: table">'
                                                    +'<div style="width: 200px; height: 50px; display: table-cell; vertical-align: middle" class="text-center"><img src="img/waiting.gif" /></div>'
                                                +'</div>'
                                            +'</div>'
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>'
                            +'<div class="modal fade" id="reportModalMobile" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1" aria-hidden="true">'
                                +'<div class="modal-dialog modal-lg modal-report">'
                                    +'<div class="modal-content">'
                                        +'<div class="modal-header">'
                                            +'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
                                            +'<h4 class="modal-title" id="myModalLabel1">'+ lang.titleReportModal +'</h4>'
                                        +'</div>'
                                        +'<div class="modal-body">'  
                                            +'<div id="reportMobile-pdf"></div>' 
                                        +'</div>'
                                    +'</div>'
                                +'</div>'
                            +'</div>';
        }
        $('.container-fluid').html(workspace);
        if (t.mobileEnvironment.isMobile()) {
            t.changeWorkspace();
        }
    },

    changeWorkspace: function () {
        var t = this;
        if (t.orientation === 'landscape') {
            $('.row').css('height', '');
            $('#toolboxTitle').css('display', 'block');
            $('#contToolbox').removeClass('col-xs-12').addClass('col-xs-1');
            $('#contScene').removeClass('col-xs-12').addClass('col-xs-10');
            $('#contProgressbar').removeClass('col-xs-12').addClass('col-xs-1');
            $('#infoMedical').css('display', 'block');
            $('#infoScene').css('display', 'block');
            $('#infoMobile').removeAttr('disabled');
            $('#infoMobile').removeClass('btn-default').addClass('btn-warning');
            $('#progressbarMobileL').css('display', 'block');
            $('#progressbarMobileP').css('display', 'none');
            $('#toolboxTitle').css('display', 'none');
            $('#containerTitle').css({'display': 'block', 'width': '50px ', 'height': '100px'});
            $('.separator').css({
                'width': '100%', 
                'height': '20px', 
                'float': '',
                'border-left': '0px solid rgb(68, 68, 68)', 
                'border-right': '0px solid rgb(68, 68, 68)', 
                'border-top': '5px solid rgb(68, 68, 68)',
                'border-bottom': '5px solid rgb(68, 68, 68)'
            });
            $('#playMobile').css('float', '');
            $('#negativeMobile').css('float', '');
            $('#rulerMobile').css('float', '');
            $('#angleMobile').css('float', '');
            $('#areaMobile').css('float', '');
            $('#resetMobile').css('float', '');
            $('#infoMobile').css('float', '');
            $('#reportMobile').css('float', '');  
            $('#reportMobile-pdf').css('height', ($(window).height() - 150) +'px');          
        } else {            
            $('.row').css('height', '50px');
            $('#contToolbox').removeClass('col-xs-1').addClass('col-xs-12');
            $('#contScene').removeClass('col-xs-10').addClass('col-xs-12');
            $('#contProgressbar').removeClass('col-xs-1').addClass('col-xs-12');
            $('#infoMedical').css('display', 'none');
            $('#infoScene').css('display', 'none');
            $('#infoMobile').attr('disabled', 'disabled');
            $('#infoMobile').removeClass('btn-warning').addClass('btn-default');
            $('#progressbarMobileL').css('display', 'none');
            $('#progressbarMobileP').css('display', 'block');  
            $('#containerTitle').css({'display': 'block', 'width': '50px ', 'height': '100px'});          
            $('.separator').css({
                'width': '20px', 
                'height': '100%', 
                'float': 'left', 
                'border-left': '5px solid rgb(68, 68, 68)', 
                'border-right': '5px solid rgb(68, 68, 68)', 
                'border-top': '0px solid rgb(68, 68, 68)',
                'border-bottom': '0px solid rgb(68, 68, 68)'
            });
            $('#containerTitle').css({'width': '100px', 'display': 'table'});
            $('#toolboxTitle').css('display', 'table-cell');
            $('#playMobile').css('float', 'left');
            $('#negativeMobile').css('float', 'left');
            $('#rulerMobile').css('float', 'left');
            $('#angleMobile').css('float', 'left');
            $('#areaMobile').css('float', 'left');
            $('#resetMobile').css('float', 'left');
            $('#infoMobile').css('float', 'left');
            $('#reportMobile').css('float', 'left');
            $('#reportMobile-pdf').css('height', ($(window).height() - 150) +'px');    
        }
    },

    screenTooSmall: function () {
        var t = this;
        if (t.mobileEnvironment.isMobile()) { 
            if ($(window).width() <= 480 && t.orientation === 'portrait') {
                $('#toolboxTitle').css('display', 'none');
                $('#infoMobile').css({'float': 'left', 'display': 'none'});
                $('.separator').css({'width': '5px', 'border': '0px solid', 'height': '28px'});
                $('.btn-size').css('font-size', '10px');
                $('#progressbarMobileP').height(28);
                $('#scrollMobileP').height(28);
                $('#toolbox').height(28);
                $('#containerTitle').css({'display': 'block', 'width': '5px ', 'height': '28px'});
            }
            if ($(window).width() <= 640 && t.orientation === 'landscape') {
                $('#toolboxTitle').css('display', 'none');
                $('.separator').css({'width': '100%', 'border': '0px solid', 'height': '5px'});
                $('.btn-size').css('font-size', '8px');
                $('#toolbox').css({'min-width': '20px', 'padding': '0px', 'width': '37px'});
                $('#contToolbox').css('padding-left', '0px');
                $('#infoMobile').css({'float': 'left', 'display': 'none'});
                $('#contProgressbar').css('padding-right', '0px');
                $('#progressbarMobileL').height($(window).height());
                $('#toolbox').height($(window).height());
            }
        }
    },

    toolbox: function () {
        var t = this;
        if (!t.mobileEnvironment.isMobile()) { 
            $('#report-pdf').css('height', ($(window).height() - 200) +'px');
            $('#toolbox').css({
                /*'width': $('.col-xs-2').width(),*/
                'height': $(window).height()
            });
            if ($('.col-xs-2').width() <= 90) {
                $('#toolboxTitle').css('display', 'none');
                $('#containerTitle').height(20);
            } else {
                $('#toolboxTitle').css('display', 'block');
                $('#containerTitle').height(20);
            }
            if ($('#toolbox').width() < 190) {
                $('#setlist').css({
                    'width': '150px',
                    'display': 'none'
                });
                $('#waitSet').css('display', 'none');
                $('#setlistModal').css({
                    'width': '200px',
                    'height': $('#toolbox').height() - 200
                });
                $('#sets').css('display', 'inline');             
            } else {                         
                $('#setlist').css({
                    'width': $('#toolbox').width(),
                    'display': 'block',
                    'height': $('#toolbox').height() - ($('#play').height() * 3) - ($('#separator').height() * 4) - 110
                });
                $('#sets').css('display', 'none'); 
                if (!t.charged) {
                    $('#waitSet').height($('#setlist').height());
                    $('#waitSet').css('display', 'table');
                }       
            }            
        } else {
            if (t.orientation === 'landscape') {
                $('#toolbox').css({
                    'width': '52px',
                    'height': $(window).height()
                });
            } else {
                $('#toolbox').css({
                    'width': '100%',
                    'height': '44px'
                });
            } 
            $('#setlistModal').css({
                'width': '200px',
                'height': $(window).height() - 150
            });           
        }
    },
    
    dontDiagnostic: function () {
        var t = this;
        if (!t.mobileEnvironment.isMobile()) { 
            $('#dontDiagnostic').css('top', $(window).height() - 30);
        } else {
            if (t.orientation === 'landscape') {
                $('#dontDiagnostic').css({
                    'top': $(window).height() - 30,
                    'display': 'block'
                });
            } else {
                $('#dontDiagnostic').css('display', 'none');
            }
        }
    },

    sets: function () {
        var t = this; 
        var sets = ''; 
        var setsModal = '';       
        for (var i = 0; i < t.records.length; i++) {            
            var d = t.records[i].series.url.split(',');
            if (d.length === 1) {
                var m = 0;
            } else {
                var m = parseInt((d.length / 2).toFixed(0));
            }            

            if (t.records[i].series.series_body_part !== null) {
                sets += '<p style="font-size: 10px; color: #fff">'+ t.records[i].series.series_body_part +'</p>';
                setsModal += '<p style="font-size: 10px; color: #fff">'+ t.records[i].series.series_body_part +'</p>';
            }
            if (t.records[i].series.series_desc !== null) {
                sets += '<p style="font-size: 10px; color: #fff">'+ t.records[i].series.series_desc +'</p>';
                setsModal += '<p style="font-size: 10px; color: #fff">'+ t.records[i].series.series_desc +'</p>';
            }
            
            sets += '<p><a href="javascript: handler.loadSet('+ i +')"><img id="set'+ i +'" src="../wado.php?requestType=WADO'+ d[m] +'&columns=150" class="setBorder"  style="margin-bottom: 5px" /></a></p>';
            setsModal += '<p><a href="javascript: handler.loadSet('+ i +')"><img id="setModal'+ i +'" src="../wado.php?requestType=WADO'+ d[m] +'&columns=150" class="setBorder" style="margin-bottom: 5px" /></a></p>';
        }

        $('#setlist').html(sets);
        $('#setlistModal').html(setsModal);
    },

    progressbar: function () {
        var t = this;
        if (!t.mobileEnvironment.isMobile()) { 
            if (t.resize) {
                $('#progressbar').height($(window).height());
            }
            t.rScroll = $(window).height() / t.numImages;
            if (t.rScroll === 0 || t.rScroll < 0) {
                t.rScroll = 1;
            }
            var d = 1;
            $('#scroll').height(d * t.rScroll);
            if (t.rScroll < 10) {
                $('#scroll').css({
                    'border-top': '5px solid #f69322',
                    'border-bottom': '5px solid #f69322'
                });
            } 
            if (t.numImages < 10) {
                $('#play').attr('disabled', 'disabled');
            } else {
                $('#play').removeAttr('disabled');
            }  

            if (t.numImages === 1) {
                $('#progressbar').css('display', 'none');
            } else {
                $('#progressbar').css('display', 'block');
            } 
        } else {
            $('#progressbarMobileL').height($(window).height());
            $('#progressbarMobileP').height(50);
            t.rScrollL = $(window).height() / t.numImages;
            t.rScrollP = window.screen.width / t.numImages;
            if (t.rScrollL === 0 || t.rScrollL < 0) {
                t.rScrollL = 1;
            }
            if (t.rScrollP === 0 || t.rScrollP < 0) {
                t.rScrollP = 1;
            }
            var d = 1;
            $('#scrollMobileL').height(d * t.rScrollL);
            $('#scrollMobileP').width(d * t.rScrollP);
            if (t.rScrollL < 10) {
                $('#scrollMobileL').css({
                    'border-top': '5px solid #f69322',
                    'border-bottom': '5px solid #f69322'
                });
            } 
            if (t.rScrollP < 10) {
                $('#scrollMobileP').css({
                    'border-left': '5px solid #f69322',
                    'border-right': '5px solid #f69322'
                });
            } 
            if (t.numImages < 10) {
                $('#playMobile').attr('disabled', 'disabled');
            }  
            if (t.numImages === 1) {
                $('#progressbarMobileL').css('display', 'none');
                $('#progressbarMobileP').css('display', 'none');
            } else {
                if (t.orientation === 'landscape') {
                    $('#progressbarMobileL').css('display', 'block');
                    $('#progressbarMobileP').css('display', 'none');
                } else {
                    $('#progressbarMobileL').css('display', 'none');
                    $('#progressbarMobileP').css('display', 'block');
                }                
            }             
        }  
    },

    configCanvas: function () {
        var t = this;
        t.canvas = document.createElement('canvas');
        t.canvas.setAttribute('id', 'myCanvas');
        document.getElementById('scene').appendChild(t.canvas);
        t.context = t.canvas.getContext('2d');
        t.tempCanvas = document.createElement('canvas');
        t.tempContext = t.tempCanvas.getContext('2d');
    },

    chargeSets: function () {
        var t = this;  
        $('#waitSet').height($('#setlist').height());
        $('#waitSetModal').height($('#setlistModal').height());
        $.post('php/studies.php', {pk: study}, function(data, textStatus, xhr) {
            t.records = eval('('+ data +')');

            $('#report-pdf').css('height', ($(window).height() - 200) +'px');     
            $('#reportMobile-pdf').css('height', ($(window).height() - 200) +'px');   

            if (t.records[0].series.reports != null) {
                $('#report-pdf').append('<iframe style="width: 100%; height: 100%" src="../wado.php?requestType=WADO'+ t.records[0].series.reports +'"></iframe>');
                $('#reportMobile-pdf').append('<iframe style="width: 100%; height: 100%" src="../wado.php?requestType=WADO'+ t.records[0].series.reports +'"></iframe>');
            }           

            var d = t.records[0].series.url.split(',');
            for (var i = 1; i <= d.length; i++) {
                t.sources[i] = d[i - 1];
            }
            var ps = t.records[0].series.pixelSpacing;
            if (ps === '') {
                $('#ruler').attr('disabled', 'disabled');
                $('#area').attr('disabled', 'disabled');
                $('#rulerMobile').attr('disabled', 'disabled');
                $('#areaMobile').attr('disabled', 'disabled');
            } else {
                $('#ruler').removeAttr('disabled');
                $('#area').removeAttr('disabled');
                $('#rulerMobile').removeAttr('disabled');
                $('#areaMobile').removeAttr('disabled');
            }
            ps = ps.replace('[', '');
            ps = ps.replace(']', '');
            t.pixelSpacing = ps.split('\\');
            t.pixelSpacing[0] = parseFloat(t.pixelSpacing[0]);
            t.pixelSpacing[1] = parseFloat(t.pixelSpacing[1]);
            if (t.records[0].series.patient_name != null) {
                $('#infoPatientName').html(lang.patientName +': '+ t.records[0].series.patient_name);
            }
            if (t.records[0].series.patient_rut != null) {
                $('#infoPatientId').html(lang.patientAge +': '+ t.records[0].series.patient_rut);
            }
            if (t.records[0].series.patient_sex != null) {
                if (t.records[0].series.patient_sex === 'M') {
                    $('#infoPatientSex').html(lang.patientSex +': '+ lang.patientMale);
                } else {
                    $('#infoPatientSex').html(lang.patientSex +': '+ lang.patientFemale);
                }
            }
            if (t.records[0].series.institution != null) {
                $('#infoInstitutionName').html(lang.institution +': '+t.records[0].series.institution);
            }       
            
            t.sets();
            $('.setBorder').css('border', '2px solid rgb(68, 68, 68)');
            $('#set0').css('border', '2px solid #f69322');
            $('#setModal0').css('border', '2px solid #f69322');            
            t.loadImages(t.sources, function (images) {
                if (t.mobileEnvironment.isMobile()) {
                    clearInterval(t.intervalLoad);
                } 
                t.charged = true;
                $('#waitSet').css('display', 'none');
                $('#waitSetModal').css('display', 'none');
            });
        }); 
    },

    loadSet: function (set) {
        var t = this;
        t.set = set;
        t.charged = true;
        if (t.charged) {
            $('#waitSet').height($('#setlist').height());
            $('#waitSetModal').height($('#setlistModal').height());
            if ($('#toolbox').width() >= 190) {
                $('#waitSet').css('display', 'table');
            } else {
                $('#waitSetModal').css('display', 'table');
            }
            t.charged = false;
            var d = t.records[set].series.url.split(',');
            t.sources = {};
            for (var i = 1; i <= d.length; i++) {
                t.sources[i] = d[i - 1];
            }
            var ps = t.records[set].series.pixelSpacing;
            if (ps === '') {
                $('#ruler').attr('disabled', 'disabled');
                $('#area').attr('disabled', 'disabled');
                $('#rulerMobile').attr('disabled', 'disabled');
                $('#areaMobile').attr('disabled', 'disabled');
            } else {
                $('#ruler').removeAttr('disabled');
                $('#area').removeAttr('disabled');
                $('#rulerMobile').removeAttr('disabled');
                $('#areaMobile').removeAttr('disabled');
            }
            ps = ps.replace('[', '');
            ps = ps.replace(']', '');
            t.pixelSpacing = ps.split('\\');
            t.pixelSpacing[0] = parseFloat(t.pixelSpacing[0]);
            t.pixelSpacing[1] = parseFloat(t.pixelSpacing[1]);
            if (t.records[0].series.patient_name != null) {
                $('#infoPatientName').html(lang.patientName +': '+ t.records[0].series.patient_name);
            }
            if (t.records[0].series.patient_rut != null) {
                $('#infoPatientId').html(lang.patientAge +': '+ t.records[0].series.patient_rut);
            }
            if (t.records[0].series.patient_sex != null) {
                if (t.records[0].series.patient_sex === 'M') {
                    $('#infoPatientSex').html(lang.patientSex +': '+ lang.patientMale);
                } else {
                    $('#infoPatientSex').html(lang.patientSex +': '+ lang.patientFemale);
                }
            }
            if (t.records[0].series.institution != null) {
                $('#infoInstitutionName').html(lang.institution +': '+t.records[0].series.institution);
            } 
            t.numImages = 0;
            t.countImages = 0;
            t.numImg = 1;            
            t.reset();
            t.img = {};
            if (!t.mobileEnvironment.isMobile()) {
                $('#scroll').css('top', '0px');
            } else {
                $('#scrollMobileL').css('top', '0px');
                $('#scrollMobileP').css('left', '0px');
            }
            $('.setBorder').css('border', '2px solid rgb(68, 68, 68)');
            $('#set'+ set).css('border', '2px solid #f69322');
            $('#setModal'+ set).css('border', '2px solid #f69322');
            t.loadImages(t.sources, function (images) {
                if (t.mobileEnvironment.isMobile()) {
                    clearInterval(t.intervalLoad);
                }                
                t.charged = true;
                $('#waitSet').css('display', 'none');
                $('#waitSetModal').css('display', 'none');
                if (t.numImages === t.countImages) {
                    $('#playMobile').removeAttr('disabled');
                }  
            });  
        } else {
            $('#waitSet').height($('#setlist').height());
            if ($('#toolbox').width() >= 190) {
                $('#waitSet').css('display', 'table');
            } else {
                $('#waitSetModal').css('display', 'table');
            }
        }        
    },

    loadImages: function (sources, callback) {        
        var t = this;
        $('.modal').modal('hide');
        $(window).bind('touchmove', function (event) {
            event.preventDefault();
        });
        var images = {};
        var loadedImages = 0;    
        var i = 1;    
        var charged = false;
        for (var j in sources) {
            t.numImages++;
        }
        t.progressbar();
        t.screenTooSmall();     
        var d = 1;
        if (!t.mobileEnvironment.isMobile()) {
            for (var src = 1; src <= t.numImages; src++) {
                images[src] = new Image();
                t.img[src] = images[src];
                images[src].onload = (function (j) { 
                    return function () {
                        if (j === 1) {  
                            t.respScene(); 
                            t.drawScene(1);                            
                            if (!t.mobileEnvironment.isMobile()) { 
                                $('#progressbar').height(d * t.rScroll);
                                $('#scroll').css('display', 'block');
                            } else {
                                $('#progressbarMobileL').height(d * t.rScrollL);
                                $('#scrollMobileL').css('display', 'block');
                                $('#progressbarMobileP').width(d * t.rScrollP);
                                $('#scrollMobileP').css('display', 'block');
                            }                    
                        } else {
                            if (!t.mobileEnvironment.isMobile()) { 
                                $('#progressbar').height(d * t.rScroll);
                            } else {
                                $('#progressbarMobileL').height(d * t.rScrollL);
                                $('#progressbarMobileP').width(d * t.rScrollP);
                            }
                        }
                        d++; 
                        t.countImages++; 
                        $('#infoIMG').html(lang.NumImages +': '+ t.numImg +' '+ lang.ofImages +' '+ t.countImages);                 
                        if (++loadedImages >= t.numImages) {                                       
                            callback(images);
                        }
                    };
                })(src);
                images[src].src = '../wado.php?requestType=WADO'+ sources[src];
            }
        } else {
            var src = 1;    
            t.intervalLoad = setInterval(function () {
                images[src] = new Image();
                t.img[src] = images[src];
                images[src].onload = (function (j) { 
                    return function () {
                        if (j === 1 || j === 2) {  
                            t.respScene(); 
                            t.drawScene(1);                            
                            if (!t.mobileEnvironment.isMobile()) { 
                                $('#progressbar').height(d * t.rScroll);
                                $('#scroll').css('display', 'block');
                            } else {
                                $('#progressbarMobileL').height(d * t.rScrollL);
                                $('#scrollMobileL').css('display', 'block');
                                $('#progressbarMobileP').width(d * t.rScrollP);
                                $('#scrollMobileP').css('display', 'block');
                            }                    
                        } else {
                            if (!t.mobileEnvironment.isMobile()) { 
                                $('#progressbar').height(d * t.rScroll);
                            } else {
                                $('#progressbarMobileL').height(d * t.rScrollL);
                                $('#progressbarMobileP').width(d * t.rScrollP);
                            }
                        }
                        d++; 
                        t.countImages++;
                        $('#infoIMG').html(lang.NumImages +': '+ t.numImg +' '+ lang.ofImages +' '+ t.countImages);                 
                        if (++loadedImages >= t.numImages) {                                       
                            callback(images);
                        }
                    };
                })(src);
                images[src].src = '../wado.php?requestType=WADO'+ sources[src];
                src++;
            }, 75);
        }        
    },

    respScene: function () { // responsive scene
        var t = this;
        var imgRatio = t.img[t.numImg].width / t.img[t.numImg].height; 

        if (!t.mobileEnvironment.isMobile()) { 
            t.canvasSize.w = $('.col-xs-9').width();
            t.canvasSize.h = $(window).height();
        } else {
            if (t.orientation === 'landscape') {
                t.canvasSize.w = $('.col-xs-10').width();
                t.canvasSize.h = $(window).height();
            } else {
                t.canvasSize.w = $('.col-xs-12').width();
                t.canvasSize.h = $(window).height();
            }
        }

        if (t.canvasSize.w / t.canvasSize.h > imgRatio) {
            t.imgSize.h = t.canvasSize.h;
            t.imgSize.w = t.imgSize.h * imgRatio;
        } else {
            t.imgSize.w = t.canvasSize.w;
            t.imgSize.h = t.imgSize.w / imgRatio;
        }             
        
        if (t.resize) {
            t.respScale = t.imgSize.w / t.img[t.numImg].width;
            t.infoScale = (t.respScale * t.scale);
            $('#infoScale').html(lang.scale +': '+ t.infoScale.toFixed(2));  
            t.ctxRatioW = 1;
            t.ctxRatioH = 1;
            
            if (!t.mobileEnvironment.isMobile()) { 
                t.canvas.width = $('.col-xs-9').width();
            } else {
                if (t.orientation === 'landscape') {
                    t.canvas.width = $('.col-xs-10').width();
                } else {
                    t.canvas.width = $('.col-xs-12').width(); 
                }
            }
            t.canvas.height = $(window).height();
            
            if (!t.mobileEnvironment.isMobile() && t.scale != 1) {
                zoom.lastTransformImage();     
            }                   
           
            t.origin.x = t.origin.x / t.ctxRatioW;
            t.origin.y = t.origin.y / t.ctxRatioH; 
            t.context.scale(t.ctxRatioW, t.ctxRatioH);      
        } else {
            if (!t.mobileEnvironment.isMobile()) { 
                t.respScale = t.imgSize.w / t.img[t.numImg].width;
                t.infoScale = t.respScale;
                $('#infoScale').html(lang.scale +': '+ t.infoScale.toFixed(2)); 
                t.canvas.width = $('.col-xs-9').width();
                t.canvas.height = $(window).height();    
            } else {
                t.respScale = t.imgSize.w / t.img[t.numImg].width;
                t.infoScale = (t.respScale * t.mscale);
                $('#infoScale').html(lang.scale +': '+ t.infoScale.toFixed(2));  
                
                if (t.orientation === 'landscape') {
                    t.canvas.width = $('.col-xs-10').width();
                    t.canvas.height = t.imgSize.h;    
                } else {
                    t.canvas.width = $('.col-xs-12').width();
                    t.canvas.height = t.imgSize.h;    
                }
            }      
        } 
        
        t.imgLastSize.w = t.imgSize.w;
        t.imgLastSize.h = t.imgSize.h;
        
        if (!t.mobileEnvironment.isMobile()) { 
            $('#myCanvas').width($('.col-xs-9').width());
            $('#myCanvas').height($(window).height()); 
            $('#scene').width($('.col-xs-9').width());
            $('#scene').height($(window).height());
        } else {
            if (t.orientation === 'landscape') {
                $('#myCanvas').width($('.col-xs-10').width());
                $('#myCanvas').height(t.imgSize.h); 
                $('#scene').width($('.col-xs-10').width());
                $('#scene').height(t.imgSize.h);
            } else {
                $('#myCanvas').width($('.col-xs-12').width());
                $('#myCanvas').height(t.imgSize.h); 
                $('#scene').width($('.col-xs-12').width());
                $('#scene').height(t.imgSize.h);
            }
        }       
        
        if (t.resize) {
            t.imgStartPos.x = (($('#scene').width() - t.imgSize.w) / 2) / t.ctxRatioW;
        } else {
            t.imgStartPos.x = ($('#scene').width() - t.imgSize.w) / 2;
        }        
        
        t.drawScene(t.numImg);      
    },

    drawScene: function (i) { // drawing pictures        
        var t = this;   
        $('#infoIMG').html(lang.NumImages +': '+ t.numImg +' '+ lang.ofImages +' '+ t.countImages);           
        t.context.save();
        t.context.setTransform(1, 0, 0, 1, 0, 0);
        t.context.clearRect(0, 0, t.canvas.width, t.canvas.height);        
        t.context.restore();        
        if (!handler.mobileEnvironment.isMobile()) {    
            t.context.drawImage(t.img[i], t.imgStartPos.x, t.imgStartPos.y, t.imgSize.w, t.imgSize.h);            
            t.tempCanvas.width = t.canvas.width;
            t.tempCanvas.height = t.canvas.height;        
            t.tempContext.drawImage(t.canvas, 0, 0);
            filter.filtered();                                  
        } else {
            if (handler.mobileEnvironment.isIOS()) {  
                t.drawSceneMobile(t.imgStartPos.x, t.imgStartPos.y, t.imgSize.w, t.imgSize.h);
            } else {                
                t.context.drawImage(t.img[i], t.imgStartPos.x, t.imgStartPos.y, t.imgSize.w, t.imgSize.h); 
            }            
        }         
    },

    zoomEffect: function () { // zoom
        $('#myCanvas').on('mousemove', zoom.on);
    },

    dragEffect: function () { // drag
        $('#myCanvas').on('mousemove', drag.on);
    },

    filter: function () { // brightness, contrast and negative
        $('#myCanvas').on('mousemove', filter.on);         
    },

    negative: function () {
        var t = this;
        if (!t.mobileEnvironment.isMobile()) { 
            t.canvas.style.backgroundColor = '#fff';
            $('.col-xs-9').css('background-color', '#fff');
            handler.isNegative = true;
            filter.negative();
        } else {
            t.mn = 1;
            if (t.orientation === 'landscape') {
                $('.col-xs-10').css('background-color', '#fff');
            } else {
                $('#contScene').css('background-color', '#fff');
            }            
            $('#myCanvas').css('-webkit-filter', 'contrast('+ t.mc +') brightness('+ t.mb +') invert('+ t.mn +')');
        }
    },

    rmNegative: function () {
        var t = this;
        if (!t.mobileEnvironment.isMobile()) { 
            t.canvas.style.backgroundColor = '#000';
            $('.col-xs-9').css('background-color', '#000');
            handler.isNegative = false;
            filter.negative();
        } else {
            t.mn = 0;
            if (t.orientation === 'landscape') {
                $('.col-xs-10').css('background-color', '#000');
            } else {
                $('#contScene').css('background-color', '#000');
            }
            
            $('#myCanvas').css('-webkit-filter', 'contrast('+ t.mc +') brightness('+ t.mb +') invert('+ t.mn +')');
        }
    },

    magnifyingGlass: function () {
        zoom.magnifyingGlass();        
    },

    rmMagnifyingGlass: function () {
        $('#scene').unbind('mousemove');
        var c = document.getElementById('magnifyingGlass');
        c.parentNode.removeChild(c);
    },

    playset: function (event) {
        animation.on(event);
    },

    ruler: function () {
        measuring.ruler();
    },

    rmRuler: function () {
        if (!handler.mobileEnvironment.isMobile()) { 
            var c = document.getElementById('mRuler');
            c.parentNode.removeChild(c);
            $('#scene h5').remove();
        } else {
            var c = document.getElementById('mRulerMobile');
            c.parentNode.removeChild(c);
            $('#scene h5').remove();
        }
    },

    angle: function () {
        measuring.angle();
    },

    rmAngle: function () {
        if (!handler.mobileEnvironment.isMobile()) { 
            var c = document.getElementById('mAngle');
            c.parentNode.removeChild(c);
            $('#scene h5').remove();
        } else {
            var c = document.getElementById('mAngleMobile');
            c.parentNode.removeChild(c);
            $('#scene h5').remove();
        }
    },

    area: function () {
        measuring.area();   
    },

    rmArea: function () {
        if (!handler.mobileEnvironment.isMobile()) { 
            var c = document.getElementById('mArea');
            c.parentNode.removeChild(c);
            $('#scene h5').remove();
        } else {
            var c = document.getElementById('mAreaMobile');
            c.parentNode.removeChild(c);
            $('#scene h5').remove();
        }
    },

    reset: function () {
        var t = this;
        if (!t.mobileEnvironment.isMobile()) { 
            if ($('#negative').hasClass('btn-warning')) {
                $('#negative').removeClass('btn-warning').addClass('btn-default');
                t.rmNegative();
            }
            if ($('#ruler').hasClass('btn-warning')) {
                $('#ruler').removeClass('btn-warning').addClass('btn-default');
                t.rmRuler();
            }
            if ($('#angle').hasClass('btn-warning')) {
                $('#angle').removeClass('btn-warning').addClass('btn-default');
                t.rmAngle();
            }
            if ($('#area').hasClass('btn-warning')) {
                $('#area').removeClass('btn-warning').addClass('btn-default');
                t.rmArea();
            }
            if ($('#magGlass').hasClass('btn-warning')) {
                $('#magGlass').removeClass('btn-warning').addClass('btn-default');
                t.rmMagnifyingGlass();
            }
            if ($('#info').hasClass('btn-default')) {
                $('#info').removeClass('btn-default').addClass('btn-warning');
                t.info();
            }
            if ($('#report').hasClass('btn-warning')) {
                $('#report').removeClass('btn-warning').addClass('btn-default');
                t.rmReport();
            }
            if ($('#play').hasClass('btn-warning')) {
                $('#play').removeClass('btn-warning').addClass('btn-default');
                $('#play').children().removeClass('glyphicon-pause').addClass('glyphicon-play');
                t.playset();
            }      
            t.tool = 1;
            t.ba = 1;
            t.b = 1;
            t.c = 1;
            $('#infoBC').html(lang.brightness +': '+ t.b.toFixed(2) +' | '+ lang.contrast +': '+ t.c.toFixed(2));
            t.scale = 1;
            t.origin.x = 0;
            t.origin.y = 0;      
            t.canvas.width = t.canvas.width;
            t.resize = false;
            t.respScene();
        } else {
            if ($('#negativeMobile').hasClass('btn-warning')) {
                $('#negativeMobile').removeClass('btn-warning').addClass('btn-default');
                t.rmNegative();
            }
            if ($('#rulerMobile').hasClass('btn-warning')) {
                $('#rulerMobile').removeClass('btn-warning').addClass('btn-default');
                t.rmRuler();
            }
            if ($('#angleMobile').hasClass('btn-warning')) {
                $('#angleMobile').removeClass('btn-warning').addClass('btn-default');
                t.rmAngle();
            }
            if ($('#areaMobile').hasClass('btn-warning')) {
                $('#areaMobile').removeClass('btn-warning').addClass('btn-default');
                t.rmArea();
            }
            if ($('#infoMobile').hasClass('btn-default')) {
                $('#infoMobile').removeClass('btn-default').addClass('btn-warning');
                if (t.orientation === 'landscape') {
                    t.info();
                }
            }
            if ($('#reportMobile').hasClass('btn-warning')) {
                $('#reportMobile').removeClass('btn-warning').addClass('btn-default');
                t.rmReport();
            }
            if ($('#playMobile').hasClass('btn-warning')) {
                $('#playMobile').removeClass('btn-warning').addClass('btn-default');
                $('#playMobile').children().removeClass('glyphicon-pause').addClass('glyphicon-play');
                t.playset();
            }      
            t.tool = 1;
            t.mb = 1;
            t.mc = 1;
            t.mn = 0;
            t.deltaX = 1;
            t.deltaY = 1;
            $('#myCanvas').css('-webkit-filter', 'contrast('+ t.mc +') brightness('+ t.mb +') invert('+ t.mn +')');
            $('#infoBC').html(lang.brightness +': '+ t.mb.toFixed(2) +' | '+ lang.contrast +': '+ t.mc.toFixed(2));
            t.mscale = 1;
            t.posStartTwoFingers = {x: 0, y: 0}; 
            t.posMoveTwoFingers = {x: 0, y: 0}; 
            t.posDiffTwoFingers = {x: 0, y: 0}; 
            t.posScaleTwoFingers = {x: 0, y: 0}; 
            t.lastDrag = {x: 0, y: 0}; 
            t.posMoveLast = {x: 0, y: 0}; 
            t.posOrigin = {x: 0, y: 0}; 
            t.posTranslate = {x: 0, y: 0}; 
            t.posMoveFix = {x: 0, y: 0};
            t.mlastScale = 1; 
            t.morigin = t.posOrigin.x +'px '+ t.posOrigin.y +'px';  
            t.mtranslate = t.posTranslate.x +'px, '+ t.posTranslate.y +'px';           
            
            $('#myCanvas').css('-webkit-transform', 'scale('+ t.mscale +') translate('+ t.mtranslate +')');
            $('#myCanvas').css('-webkit-transform-origin', t.morigin);      

            $('#myCanvas').css({'left': t.posDiffTwoFingers.x, 'top': t.posDiffTwoFingers.y});
        }
    },

    report: function () {

    },

    rmReport: function () {

    },

    info: function () {
        $('#infoMedical').css('display', 'block');
        $('#infoScene').css('display', 'block');
    },

    rmInfo: function () {
        $('#infoMedical').css('display', 'none');
        $('#infoScene').css('display', 'none');
    },

    infoScene: function () {
        var t = this;
        if (!t.mobileEnvironment.isMobile()) { 
            $('#infoScene').css({
                'left': $('.col-xs-9').width() + 30 - $('#infoScene').width() - 20
            });
            $('#infoBC').html(lang.brightness +': '+ t.b.toFixed(2) +' | '+ lang.contrast +': '+ t.c.toFixed(2));  
        } else {
            $('#infoScene').css({
                'left': $('.col-xs-10').width() + 30 - $('#infoScene').width() - 20
            });
            $('#infoBC').html(lang.brightness +': '+ t.mb.toFixed(2) +' | '+ lang.contrast +': '+ t.mc.toFixed(2));
        }   
    },

    infoTooSmall: function () {
        var t = this;
        if (!t.mobileEnvironment.isMobile()) { 
            if (($('#infoMedical').width() + $('#infoScene').width() + 40) >= $('.col-xs-9').width()) {
                t.rmInfo();
                $('#info').attr('disabled', 'disabled');
            } else {
                t.info();
                $('#info').removeAttr('disabled');
            }
        } else {
            if (($('#infoMedical').width() + $('#infoScene').width() + 40) >= $('.col-xs-10').width()) {
                t.rmInfo();
                $('#info').attr('disabled', 'disabled');
            } else {
                t.info();
                $('#info').removeAttr('disabled');
            }
        }
    },
    
    resizeMeasuring: function () {
        var t = this;
        if ($('#ruler').hasClass('btn-warning')) {
            $('#ruler').removeClass('btn-warning').addClass('btn-default');
            t.rmRuler();
        }
        if ($('#angle').hasClass('btn-warning')) {
            $('#angle').removeClass('btn-warning').addClass('btn-default');
            t.rmAngle();
        }
        if ($('#area').hasClass('btn-warning')) {
            $('#area').removeClass('btn-warning').addClass('btn-default');
            t.rmArea();
        }
        t.tool = 1;
    },
    
    resizeMeasuringMobile: function () {
        var t = this;
        if ($('#rulerMobile').hasClass('btn-warning')) {
            $('#rulerMobile').removeClass('btn-warning').addClass('btn-default');
            t.rmRuler();
        }
        if ($('#angleMobile').hasClass('btn-warning')) {
            $('#angleMobile').removeClass('btn-warning').addClass('btn-default');
            t.rmAngle();
        }
        if ($('#areaMobile').hasClass('btn-warning')) {
            $('#areaMobile').removeClass('btn-warning').addClass('btn-default');
            t.rmArea();
        }
        t.tool = 1;
    },

    removeBeforeTool: function (event) {
        var t = this;
        if (!handler.mobileEnvironment.isMobile()) {
            switch (handler.tool) {
                case 1:
                    break;
                case 2:
                    $('#magGlass').removeClass('btn-warning').addClass('btn-default');
                    t.rmMagnifyingGlass();
                    break;
                case 3:
                    break;
                case 4:
                    $('#play').removeClass('btn-warning').addClass('btn-default');
                    $('#play').children().removeClass('glyphicon-pause').addClass('glyphicon-play');
                    t.playset(event);
                    break;
                case 5:
                    $('#ruler').removeClass('btn-warning').addClass('btn-default');
                    t.rmRuler();
                    break;
                case 6:
                    $('#angle').removeClass('btn-warning').addClass('btn-default');
                    t.rmAngle();
                    break;
                case 7:
                    $('#area').removeClass('btn-warning').addClass('btn-default');
                    t.rmArea();
                    break;
                case 8:
                    break;
                case 9:
                    break;
                case 10:
                    break;
            }
        } else {
            switch (handler.tool) {
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    break;
                case 4:
                    $('#playMobile').removeClass('btn-warning').addClass('btn-default');
                    $('#playMobile').children().removeClass('glyphicon-pause').addClass('glyphicon-play');
                    t.playset(event);
                    break;
                case 5:
                    $('#rulerMobile').removeClass('btn-warning').addClass('btn-default');
                    t.rmRuler();
                    break;
                case 6:
                    $('#angleMobile').removeClass('btn-warning').addClass('btn-default');
                    t.rmAngle();
                    break;
                case 7:
                    $('#areaMobile').removeClass('btn-warning').addClass('btn-default');
                    t.rmArea();
                    break;
                case 8:
                    break;
                case 9:
                    break;
            }
        }
    },

    progressbarScroll: function () {
        var t = this;
        if (!t.mobileEnvironment.isMobile()) {             
            $('#progressbar').on('mousemove', function (event) {
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
                var my = event.clientY;
                var r = (my / t.rScroll).toFixed(0);
                var n = (my / t.rScroll).toFixed(2);
                if (r < n) {
                    r++;
                } 
                if (r > t.numImages) {
                    r = t.numImages;
                }                    
                handler.numImg = r;
                if (t.numImg > t.numImages) {
                    t.numImg = t.numImages;
                } else if (t.numImg < 1) {
                    t.numImg = 1;
                }

                if ((t.countImages * t.rScroll) > ((r - 1) * t.rScroll)) {
                    $('#scroll').css('top', (r - 1) * t.rScroll);             
                    t.drawScene(t.numImg);
                }
                
            });
        } else {
            $('#progressbarMobileL').bind('touchmove', function (event) {
                var my = event.originalEvent.touches[0].pageY - $(this).offset().top;
                var r = (my / t.rScrollL).toFixed(0);
                var n = (my / t.rScrollL).toFixed(2);
                if (r < n) {
                    r++;
                } 
                if (r > t.numImages) {
                    r = t.numImages;
                }                    
                handler.numImg = r;
                if (t.numImg > t.numImages) {
                    t.numImg = t.numImages;
                } else if (t.numImg < 1) {
                    t.numImg = 1;
                }

                if ((t.countImages * t.rScrollL) > ((r - 1) * t.rScrollL)) {
                    $('#scrollMobileL').css('top', (r - 1) * t.rScrollL); 
                    $('#scrollMobileP').css('left', (r - 1) * t.rScrollP);                
                    t.drawScene(t.numImg);
                }
                
            });
            $('#progressbarMobileP').bind('touchmove', function (event) {
                var mx = event.originalEvent.touches[0].pageX - $(this).offset().left;
                var r = (mx / t.rScrollP).toFixed(0);
                var n = (mx / t.rScrollP).toFixed(2);
                if (r < n) {
                    r++;
                } 
                if (r > t.numImages) {
                    r = t.numImages;
                }                    
                handler.numImg = r;
                if (t.numImg > t.numImages) {
                    t.numImg = t.numImages;
                } else if (t.numImg < 1) {
                    t.numImg = 1;
                }

                if ((t.countImages * t.rScrollP) > ((r - 1) * t.rScrollP)) {
                    $('#scrollMobileL').css('top', (r - 1) * t.rScrollL); 
                    $('#scrollMobileP').css('left', (r - 1) * t.rScrollP);             
                    t.drawScene(t.numImg);
                }
                
            });
        }
    },

    detectBrowser: {
        objappVersion: navigator.appVersion,
        objAgent: navigator.userAgent,

        isFirefox: function () {
            b = this;
            if (b.objAgent.indexOf("Firefox") != -1) {
                return true;
            } else {
                return false;
            }
        },
        isMSIE: function () {
            b = this;
            if (b.objAgent.indexOf("MSIE") != -1) { 
                return true; 
            } else {
                return false;
            }
        }      
    },

    /*******************************************************/
    /*****************Mobile properties*********************/
    detectVerticalSquash: function () { // fix squash drawing for mobile dispositives
        var t = this;
        var c = document.createElement('canvas'),
            ctx = c.getContext('2d');

        c.width = 1;
        c.height = t.img[1].height;
        
        ctx.drawImage(t.img[1], 0, 0);

        var data = ctx.getImageData(0, 0, 1, t.img[1].height).data,
            sy = 0,
            ey = t.img[1].height,
            py = t.img[1].height;

        while (py > sy) {
            var alpha = data[(py - 1) * 4 + 3];
            if (alpha === 0) {
                ey = py;
            } else {
                sy = py;
            }
            py = (ey + sy) >> 1;
        }

        var ratio = (py / t.img[1].height);

        return (ratio === 0) ? 1 : ratio;
    },

    drawSceneMobile: function (sx, sy, sw, sh) { // drawing solution to squash for mobile dispositives
        var t = this;
        var vertSquashRatio = handler.detectVerticalSquash(); 
        t.context.drawImage(t.img[t.numImg], sx, sy, sw, sh / vertSquashRatio);
    }, 

    mobileEnvironment: { // detect mobile dispositives
        isMobile: function () {
            if (handler.mobileEnvironment.isIOS() || handler.mobileEnvironment.isAndroid()) {  
                return true;
            } else {
                return false;
            }         
        },
        isAndroid: function () {
            if (navigator.userAgent.match(/Android/i) == 'Android') {
                return true;
            } else {
                return false;
            }
        },
        isIOS: function () {
            if ((navigator.userAgent.match(/iPhone|iPad|iPod/i) == 'iPhone')
                || (navigator.userAgent.match(/iPhone|iPad|iPod/i) == 'iPad') 
                || (navigator.userAgent.match(/iPhone|iPad|iPod/i) == 'iPod')) {
                return true;
            } else {
                return false;
            }   
        }
    }
    /*******************************************************/
};