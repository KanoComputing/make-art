if ('registerElement' in document && 'import' in document.createElement('link')) {
    // no polyfills needed
} else {
    let s = document.createElement('script');
    s.src = "bower_components/webcomponentsjs/webcomponents-lite.js",
        document.head.appendChild(s);
}
