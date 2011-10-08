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
      'number': 1,
      'selectGlyph': function (number)
      {
        var x, y;
        switch (number)
        {
          default:
          case 1: x =                   0; y =  0;                break;
          case 2: x = 2*options.glyphSize; y =  0;                break;
          case 3: x =   options.glyphSize; y =  0;                break;
          case 4: x =   options.glyphSize; y = options.glyphSize; break;
          case 5: x = 2*options.glyphSize; y = options.glyphSize; break;
          case 6: x =                   0; y = options.glyphSize; break;
        }
        $(m_this).css('backgroundPosition', x+'px '+y+'px');
      }
    };

    options = $.extend(defaults, options);

    $(this).css({
      'background': options.background+' url('+options.glyphSrc+')',
      'height': options.glyphSize,
      'width': options.glyphSize
    });

    $(this).click(function()
    {
      $.when($.Deferred(function(dfd)
      {
        var z = $(m_this).css('z-index');

        $(m_this).css('z-index', 1).animate(
        {
          'z-index': options.juggleTimeout
        }, {
          step: function(now, fx)
          {
            options.selectGlyph(Math.floor(Math.random() * 6) + 1);
          },
          duration: options.juggleTimeout,
          complete: dfd.resolve
        }).css('z-index', z);

        return dfd.promise();
      })).done(function() {
        options.number = (Math.floor(Math.random() * 6) + 1);
        $(this).stop();
        options.selectGlyph(options.number);

        if (options.callback
            && typeof(options.callback) === "function")
          options.callback(options.number);
      });
    });

    $(this).click();
  }
})(jQuery);
