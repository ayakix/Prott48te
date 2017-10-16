'use strict';

$(function(){
});

$(window).load(function(){
  var HAND_IMAGE_NUM = 7;
  var COOKIE_KEY_HAND_INDEX = "PROTT_KEY_HAND_INDEX";

  var BG_IMAGE_NUM = 4;
  var COOKIE_KEY_BG_INDEX = "PROTT_KEY_BG_INDEX";

  var isInited = false;
  var handIndex = 0;
  var bgIndex = 0;
  var cssElem = null;
  var originMarginLeft = null;
  var originMarginTop = null;

  function updateHandImage(handIndex) {
    var path = chrome.extension.getURL('css/override' + handIndex + '.css');
    var newCssElem = $('<link rel="stylesheet" href="' + path + '">');
    $('head link:last').after(newCssElem);
    if (cssElem) {
//      cssElem.remove();
    }
    cssElem = newCssElem;
    $.cookie(COOKIE_KEY_HAND_INDEX, handIndex, { expires: 30, path: '/' });

    if (originMarginLeft == null) {
      originMarginLeft = parseInt($('.hand-container.iphone6-hand').css('margin-left'), 10)
    }
    if (originMarginTop == null) {
      originMarginTop = parseInt($('.hand-container.iphone6-hand').css('margin-top'), 10)
    }
    var marginLeft = originMarginLeft;
    var marginTop = originMarginTop;
    var bringToFront = true;
    var bringToBack = false;

    switch (parseInt(handIndex)) {
      case 0:
        marginLeft = originMarginLeft * 1.83 + 'px';
        marginTop = originMarginTop * 1.02 + 'px';
        bringToFront = false;
        break;
      case 1:
        marginLeft = originMarginLeft * 2.575 + 'px';
        marginTop = originMarginTop * 4.6 + 'px';
        bringToBack = true;
        break;
      case 2:
        marginLeft = originMarginLeft * 1.83 + 'px';
        marginTop = originMarginTop * 1 + 'px';
        break;
      case 3:
        marginLeft = originMarginLeft * 1.835 + 'px';
        marginTop = originMarginTop * 4.5 + 'px';
        break;
      case 4:
        marginLeft = originMarginLeft * 1.8 + 'px';
        marginTop = originMarginTop * 2 + 'px';
        break;
      case 5:
        marginLeft = originMarginLeft * 1.75 + 'px';
        marginTop = originMarginTop * 5 + 'px';
        break;
      case 6:
        marginLeft = originMarginLeft * 1.9 + 'px';
        marginTop = originMarginTop * 6.5 + 'px';
        break;
    }

    $('.hand-container.iphone6-hand').css('margin-left', marginLeft);
    $('.hand-container.iphone6-hand').css('margin-top', marginTop);

    if (bringToBack) {
      $('.hand-container.iphone6-hand').css('z-index', '998');
      $('.device-frame').css('z-index', '999');
    } else if (bringToFront) {
      $('.hand-container.iphone6-hand').css('z-index', '1000');
      $('.prototype-menu').css('z-index', '999');
    } else {
      $('.hand-container.iphone6-hand').css('z-index', '999');
      $('.prototype-menu').css('z-index', '1000');
    }
  }

  function updateBgImage(bgIndex) {
    $('.presentation-bg').css('background-image', 'url(https://github.com/ayakix/Prott48te/raw/master/images/background' + bgIndex + '.png)');
    $('.presentation-bg.blur').css('filter', 'blur(0px)');
    $.cookie(COOKIE_KEY_BG_INDEX, bgIndex, { expires: 30, path: '/' });
  }

  function init() {
    if ($('.navs').length == 0) {
      return;
    }
    isInited = true;

    var nav = $('.prott-icon-back-ground-color').parent().parent().parent();
    $('.prott-icon-back-ground-color').parent().parent().remove();
    $('.prott-icon-preview-hand').parent().parent().remove();

    var bgNav =
      '<div class="nav-item">' +
        '<button class="nav-btn change-bg"><i class="prott-icon prott-icon-back-ground-color"></i></button>' +
      '</div>';
    nav.prepend(bgNav);

    var lastBgIndex = $.cookie(COOKIE_KEY_BG_INDEX);
    if (lastBgIndex != null) {
      bgIndex = lastBgIndex;
    }
    // updateBgImage(bgIndex);

    $('.change-bg').click(function() {
      bgIndex++;
      if (bgIndex == BG_IMAGE_NUM) {
        bgIndex = 0;
      }
      updateBgImage(bgIndex);
    })

    //////////////////////////////////////////

    var handNav =
      '<div class="nav-item">' +
        '<button class="nav-btn change-hand"><i class="prott-icon prott-icon-preview-hand"></i></button>' +
      '</div>';
    nav.append(handNav);

    var lastHandIndex = $.cookie(COOKIE_KEY_HAND_INDEX);
    if (lastHandIndex != null) {
      handIndex = lastHandIndex;
    }
    updateHandImage(handIndex);

    $('.change-hand').click(function() {
      handIndex++;
      if (handIndex == HAND_IMAGE_NUM) {
        handIndex = 0;
      }
      updateHandImage(handIndex);
    })
  }

  var timer = setInterval( function() {
    init();
    if (isInited) {
      clearInterval(timer);
    }
  }, 150);
});

