/**
 * Because sometimes all you need is a dice.
 *
 * @author Stefan Graupner <stefan.graupner@gmail.com>
 **/
(function($) {
  $.fn.dice = function(options)
  {
    var m_this = this;
    var defaults = {
      'background': '#ffffff',
      'callback': null,
      'glyphSize': 40,
      'glyphSrc': 'dice.gif',
      'juggleTimeout': 300,
      'number': 1
    };

    var functions = {
      'setTo': function (number)
      {
        var x, y;
        switch (number)
        {
          default:
          case 1: x =  0; y =  0; break;
          case 2: x = 80; y =  0; break;
          case 3: x = 40; y =  0; break;
          case 4: x = 40; y = 40; break;
          case 5: x = 80; y = 40; break;
          case 6: x =  0; y = 40; break;
        }
        $(m_this).css('backgroundPosition', x+'px '+y+'px');
      },

      'juggle' : function()
      {
        var z = $(m_this).css('z-index');
        $(m_this).css('z-index', 1).animate(
        {
          'z-index':options.juggleTimeout
        },{
          duration: options.juggleTimeout,
          step: function(now, fx) {
            functions.setTo((parseInt(now) % 6 || Math.random() * 6) + 1);
          }
        });
        $(m_this).css('z-index', z);
        window.setTimeout($.noop, options.juggleTimeout);
      }
    }

    options = $.extend(defaults, options);

    $(this).css({
      'background': options.background+' url('+options.glyphSrc+')',
      'height': options.glyphSize,
      'width': options.glyphSize
    });

    $(this).click(function()
    {
      functions.juggle();

      options.number = (Math.floor(Math.random() * 2011) % 6) + 1;
      $(this).stop();
      functions.setTo(options.number);

      if (options.callback
          && typeof(options.callback) === "function")
        options.callback(options.number);
    });

    $(this).click();
  }
})(jQuery);
