// CARD HOVER
jQuery(document).ready(function() {

    $('.card').mouseover(function() {
        $(this).children('.card-hover').fadeIn(80);
        $(this).mouseleave(function() {
            $('.card-hover').fadeOut(120);
        });
    });

});

// SUBMENUS
jQuery(document).ready(function() {

    $('li#nav-select').mouseover(function() {
        $(this).find('div#nav-hidden-sub').addClass('block');
        $(this).children('a').addClass('current');
    });
    $(this).find('div#nav-hidden-sub').mouseleave(function() {
        $(this).removeClass('block');
        $('#nav-select a').removeClass('current');
    });
    $('li#nav-select').mouseleave(function() {
        $(this).find('div#nav-hidden-sub').removeClass('block');
        $(this).children('a').removeClass('current');
    });

});

// MENU RESPONSIVE
jQuery(document).ready(function() {

    $('.nav-res-btn').click(function() {
        $('.nav-res').slideToggle("fast");
        $('body').toggleClass('translate-3d-menu');
        $('body').toggleClass('bg-darkgray');
    });
    $('.icon-egg').click(function() {
        $('.nav-res').slideToggle("fast");
        $('body').removeClass('translate-3d-menu');
        $('body').removeClass('bg-darkgray');
    });
});

// WIDGET SIDEBAR TABS
jQuery(document).ready(function() {

    $('.widget-content ul').hide().eq(0).show();
    $('.widget-tabs li').click(function(e) {
        e.preventDefault();
        $('.widget-content ul').hide();
        $('.widget-tabs li a').removeClass("current-tab");

        var id = $(this).find("a").attr("href");
        $(id).fadeToggle();
        $(this).children("a").addClass("current-tab");
    });

});

// HOY EN TV FOOTER
jQuery(document).ready(function() {

    $('.hoy-tv-action').click(function() {
        $('.prg-footer-inside').toggle();
        $('.hoy-tv-action i').toggleClass("icon-arrow-down");
    });

});

// MESSAGES
jQuery(document).ready(function() {

    $('i#close-msg').click(function() {
        $('.msg').hide();
    });

});

// VIDEO RECIPES
(function( $ ){

  "use strict";

    $.fn.videoRecipe = function( options ) {
        var settings = {
          customSelector: null,
          ignore: null
        };

        if(!document.getElementById('video-recipe-style')) {

          var head = document.head || document.getElementsByTagName('head')[0];
          var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
          var div = document.createElement('div');
          div.innerHTML = '<p>x</p><style id="video-recipe-style">' + css + '</style>';
          head.appendChild(div.childNodes[1]);
        }

        if ( options ) {
          $.extend( settings, options );
        }

        return this.each(function(){ // Add here your video code server
          var selectors = [
            "iframe[src*='player.vimeo.com']",
            "iframe[src*='youtube.com']",
            "iframe[src*='youtube-nocookie.com']",
            "object",
            "embed"
          ];

          if (settings.customSelector) {
            selectors.push(settings.customSelector);
          }

          var ignoreList = '.videoRecipeignore';

          if(settings.ignore) {
            ignoreList = ignoreList + ', ' + settings.ignore;
          }

          var $allVideos = $(this).find(selectors.join(','));
          $allVideos = $allVideos.not("object object"); // SwfObj conflict patch
          $allVideos = $allVideos.not(ignoreList); // Disable responvive video on this video.

          $allVideos.each(function(){
            var $this = $(this);
            if($this.parents(ignoreList).length > 0) {
              return; // Disable responvive video on this video.
            }
            if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
            if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
            {
              $this.attr('height', 9);
              $this.attr('width', 16);
            }
            var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
                width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                aspectRatio = height / width;
            if(!$this.attr('id')){
              var videoID = 'videorecipe' + Math.floor(Math.random()*999999);
              $this.attr('id', videoID);
            }
            $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
            $this.removeAttr('height').removeAttr('width');
          });
        });
    };

})( window.jQuery || window.Zepto );
