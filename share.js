/*!
 * share.js
 *
 * https://github.com/dec/share
 *
 * This code is subject to MIT license.
 *
 * Copyright (c) 2016 David Esperalta - http://www.davidesperalta.com/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
 * Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */
(function(window) {
  var
    setDefault = function(config) {
      var
        config = config || {};

      config.via = config.via || '';
      config.media = config.media || '';
      config.caption = config.caption || '';
      config.hashtags = config.hashtags || '';
      config.url = config.url || window.location.href;
      config.provider = config.provider || 'facebook';
      config.text = config.text || window.document.title;

      config.width = config.width || 500;
      config.height = config.height || 500;
      config.toolbar = config.toolbar || 'yes';
      config.resizable = config.resizable || 'yes';
      config.scrollbars = config.scrollbars || 'yes';

      return config;
    },

    encode = function(str, ampersand) {
      if (ampersand === false) {
        return encodeURIComponent(str);
      } else {
        return encodeURIComponent(str) + '&amp;';
      }
    },

    getGooglePlusUrl = function(config) {

      return 'https://plus.google.com/share?' +
             'url=' + encode(config.url);
    },

    getFacebookUrl = function(config) {
      return 'https://www.facebook.com/sharer/sharer.php?' +
             'u=' + encode(config.url, false);
    },

    getTwitterUrl = function(config) {
      var
        url = 'https://www.twitter.com/intent/tweet?';

      url += 'url=' + encode(config.url);

      if (config.via !== '') {
        url += 'via=' + encode(config.via);
      }

      if (config.text !== '') {
        url += 'text=' + encode(config.text);
      }

      if (config.hashtags !== '') {
        url += 'hashtags=' + encode(config.hashtags, false);
      }

      return url;
    },

    getRedditUrl = function(config) {
      var
        url = 'https://www.reddit.com/';

      if (config.subreddit !== '') {
        url += 'r/' + config.subreddit + '/submit?url='
      } else {
        url += 'submit?url=';
      }

      url += encode(config.url, false);

      return url;
    },

    getStumbleuponUrl = function(config) {
      var
        url = 'https://www.stumbleupon.com/submit?';

      url += 'url=' + encode(config.url);
      url += 'title=' + encode(config.text, false);

      return url;
    },

    getLinkedinUrl = function(config) {
      var
        url = 'https://www.linkedin.com/shareArticle?mini=true&amp;';

      url += 'url=' + encode(config.url);
      url += 'title=' + encode(config.text, false);

      return url;
    },

    getPinterestUrl = function(config) {
      var
        url = 'https://www.pinterest.com/pin/create/button/?';

      url += 'url=' + encode(config.url);
      url += 'description=' + encode(config.text);
      url += 'media=' + encode(config.media);

      return url;
    },

    getDiggUrl = function(config) {
      var
        url = 'https://www.digg.com/submit?';

      url += 'url=' + encode(config.url);
      url += 'title=' + encode(config.text);

      return url;
    },

    getTumblrUrl = function(config) {
      var
        url = '';

      if (config.media !== '') {
        url = 'https://www.tumblr.com/share/photo?';
        url += 'source=' + encode(config.media);
        if (config.caption !== '') {
          url += 'caption' + encode(config.caption, false);
        }
      } else {
        url = 'https://www.tumblr.com/share/link?';
        url += 'url=' + encode(config.url);
        url += 'description=' + encode(config.text);
      }

      return url;
    },

    getVkUrl = function(config) {
      var
        url = 'https://www.vk.com/share.php?';

      url += 'url=' + encode(config.url, false);

      return url;
    },

    getDeliciousUrl = function(config) {
      var
        url = 'https://www.delicious.com/save?v=5&amp;noui&amp;jump=close&amp;';

      url += 'url=' + encode(config.url);
      url += 'title=' + encode(config.text, false);

      return url;
    },

    getBufferUrl = function(config) {
      var
        url = 'https://bufferapp.com/add?';

      if (config.via !== '') {
        url += 'via=' + encode(config.via);
      }

      if (config.text !== '') {
        url += 'text=' + encode(config.text);
      }

      url += 'url=' + encode(config.url, false);

      return url;
    },

    getMeneameUrl = function(config) {
      var
        url = 'http://www.meneame.net/submit.php?';

      url += 'url=' + encode(config.url, false);

      return url;
    },

    getWindowOptions = function(config) {
      return 'width=' + config.width + ', ' +
             'height=' + config.height + ', ' +
             'toolbar=' + config.toolbar + ', ' +
             'resizable=' + config.resizable + ', ' +
             'scrollbars=' + config.scrollbars;
    },

    providers = [
      {id: 'vk', url: getVkUrl},
      {id: 'digg', url: getDiggUrl},
      {id: 'buffer', url: getBufferUrl},
      {id: 'reddit', url: getRedditUrl},
      {id: 'tumblr', url: getTumblrUrl},
      {id: 'meneame', url: getMeneameUrl},
      {id: 'twitter', url: getTwitterUrl},
      {id: 'linkedin', url: getLinkedinUrl},
      {id: 'facebook', url: getFacebookUrl},
      {id: 'google+', url: getGooglePlusUrl},
      {id: 'pinterest', url: getPinterestUrl},
      {id: 'delicious', url: getDeliciousUrl},
      {id: 'stumbleupon', url: getStumbleuponUrl}
    ],

    getProvider = function(id) {
      for (var i = 0; i < providers.length; i++) {
        if (providers[i].id === id.toLowerCase()) {
          return providers[i];
          break;
        }
      }
    };

  window.share = function(config) {
    var
      config = setDefault(config);
    return window.open(getProvider(config.provider).url(config),
     'shareWinRef', getWindowOptions(config));
  };
})(window);