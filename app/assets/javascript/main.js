// ES6 or Vanilla JavaScript

// Load appropriate JS.
let head = document.getElementsByTagName('head')[0];
let js = document.createElement('script');
js.type = 'text/javascript';
if (document.URL.indexOf('/v1/') >= 0) { 
    js.src = '/js/v1.js';
} else if (document.URL.indexOf('/v2/') >= 0) { 
    js.src = '/js/v2.js';
}
head.appendChild(js);