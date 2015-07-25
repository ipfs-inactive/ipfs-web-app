'use strict'

var ipfs = require('ipfs-api').apply(null, window.location.host.split(':'))
var $ = require('jquery')

module.exports = {
  define: function (conf) {
    var isChild = (window.location.hash === '#child')

    // make this a function to make `this` work in app definition
    var app = function () {
      var self = this

      // both
      window.addEventListener('message', function (event) {
        if (event.data[0] === 'follow' && self.follow) {
          self.follow(event.data[1])
        }

        // if the parent gets passed a relative link, we need to resolve it
        if (event.data[0] === 'resolve') {
          if (typeof self.resolve === 'function') {
            window.postMessage(['link', self.resolve(event.data[1])], '*')
          } else {
            throw new Error('App missing .resolve implementatiton')
          }
        }
      }, false)

      // toplevel
      if (!isChild) {
        window.addEventListener('hashchange', function (event) {
          if (self.follow) self.follow(window.location.hash.substr(1))
        }, false)

        // toplevel messages
        window.addEventListener('message', function (event) {
          if (event.data[0] === 'link') {
            window.location.hash = event.data[1]
          }
        }, false)

        // at toplevel we just call init directly
        self.init(ipfs, window.location.hash.substr(1))

      } else {
        // request init parameters from parent
        window.postMessage(['request-init'], '*')

        // when we get the response, we initialize
        window.addEventListener('message', function (event) {
          if (event.data[0] === 'init') {
            self.init(ipfs, event.data[1])
          }
        }, false)
      }
    }
    app.call(conf)
  },
  load: function (hash, path, ipfs, mountpoint) {

    var iframe = document.createElement('iframe')
    var iframestyle = 'margin: 0; border:0; width:100%; overflow: hidden;'

    iframe.setAttribute('scrolling', 'no')
    // adapt height of iframe to content
    setInterval(function () {
      if (iframe.contentWindow) {
        var height = $(iframe.contentWindow.document.body).height()
        $(iframe).height(height)
      }
    }, 100)

    iframe.setAttribute('style', iframestyle)
    iframe.setAttribute('src', 'http://' + window.location.host + hash + '#child')

    mountpoint.appendChild(iframe)

    var child = iframe.contentWindow
    var parent = window

    child.addEventListener('message', function (event) {
      if (event.data[0] === 'request-init') {
        child.postMessage(['init', path], '*')
      }

      // if the child got a link, optionally resolve it and pass it on to the parent
      if (event.data[0] === 'link') {
        var link = event.data[1]
        if (link[0] !== '/') {
          // relative links need to let parent prepend its path
          parent.postMessage(['resolve', link], '*')
        } else {
          // absolute links are just passed on upwards
          parent.postMessage(['link', link], '*')
        }
      }
    }, false)

    return iframe
  },
  link: function (path) {
    window.postMessage(['link', path], '*')
  }
}
