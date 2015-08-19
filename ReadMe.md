share.js
---

This is just a simple piece of Javascript code which allow us to share an URL using one or more of the supported social web sites.

The code is inspired and also based in the angular-socialshare project (https://github.com/720kb/angular-socialshare).

Basically share.js expose a function to the window object which we can call in order to simply share certain URL by opening a popup window with the right social web site request.

Currently the below social web sites are supported:

* VK
* Digg
* Buffer
* Reddit
* Tumblr
* Twitter
* Linkedin
* Facebook
* Google+
* Pinterest
* Delicious
* Stumbleupon

The usage of share.js is simple, just a call to the window.share() function with the appropiate configuration.

The configuration is an object which can contain these properties:

Shared properties:

* url = Mandatory. The URL we want to shared.
* via = Optional. For some sites like Twitter.
* text = Optional. For some sites shared title or description.
* media = Mandatory for Pinterest, optional for Tumblr. URL of an image.
* caption = Mandatory for Tumblr. A caption for the media image.
* hashtags = Optional. Used for Twitter. Comma separated tags/words.
* provider = Mandatory. One of the refered sites. "facebook" by default.

Shared window properties:

* width = Optional. Popup width. Default 500.
* height = Optional. Popup height. Default 500.
* toolbar = Optional. Popup toolbar. "yes" or "no". Default "yes".
* resizable = Optional. Popup resizable. "yes" or "no". Default "yes".
* scrollbars = Optional. Popup scrollbars. "yes" or "no". Default "yes".

A sample of share.js usage can be:

```javascript
window.share({url: 'https://github.com/dec/share'});
```

The above share the specified URL with Facebook.

Another possible call sample can be:

```javascript
window.share({provider: 'twitter', url: 'https://github.com/dec/share'});
```

The above share the specified URL with Twitter.

The window.share() returns a reference of the window popup. Such
popup window has named "shareWinRef" for our convenience.

---

(C) 2015 David Esperalta - http://www.davidesperalta.com/