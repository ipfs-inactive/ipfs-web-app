# ipfs-web-app tool

Ipfs web apps are html5 web pages with ipfs api access.

## example app

in /examples/home you will find the 'node info' simple example app. To test this, you will need a ipfs daemon running in unrestricted mode. 

```bash
$ ipfs daemon --unrestricted-api
```

IPFS Web apps also depend on browserify, and this example also needs less to compile its stylesheets.

```bash
$ sudo npm install -g less browserify ipfs-web-app
$ cd examples/home
$ npm install
$ ipfs-web-app run
```

This will open a browser with your node info showing.

