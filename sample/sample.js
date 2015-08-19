
(function(window) {

  var
    config = {
      subreddit: 'gadgets',
      via: 'davidesperalta',
      hashtags: 'Javascript, Share',
      caption: 'App Builder screenshot',
      url: 'https://github.com/dec/share',
      text: 'A simple Javascript to share URLs',
      media: 'http://www.davidesperalta.com/padfiles/appbuilder/screenshot.png'
    },
    buttons = document.getElementsByClassName('shareButton');

  for(var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(e) {
      config.provider = e.target.id;
      window.share(config);
    }, false);
  }

})(window);