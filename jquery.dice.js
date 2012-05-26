/**  
 * Copyright (c) 2011-2012, Stefan Graupner. All rights reserved.
 *  
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer. Redistributions in binary
 * form must reproduce the above copyright notice, this list of conditions and
 * the following disclaimer in the documentation and/or other materials provided
 * with the distribution. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
 * CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
 * BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 **/

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
