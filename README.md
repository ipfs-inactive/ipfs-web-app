## This repository has been archived!
*This IPFS-related repository has been archived, and all issues are therefore frozen.* If you want to ask a question or open/continue a discussion related to this repo, please visit the [official IPFS forums](https://discuss.ipfs.io).

We archive repos for one or more of the following reasons:
- Code or content is unmaintained, and therefore might be broken
- Content is outdated, and therefore may mislead readers
- Code or content evolved into something else and/or has lived on in a different place
- The repository or project is not active in general

Please note that in order to keep the primary IPFS GitHub org tidy, most archived repos are moved into the [ipfs-inactive](https://github.com/ipfs-inactive) org.

If you feel this repo should **not** be archived (or portions of it should be moved to a non-archived repo), please [reach out](https://ipfs.io/help) and let us know. Archiving can always be reversed if needed.


# ipfs-web-app tool

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPFS-blue.svg?style=flat-square)](http://ipfs.io/)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> ipfs web app interface

IPFS web apps are html5 web pages with IPFS API access.

## Install

In `/examples/home`, you will find the `node info` simple example app. To test this, you will need an [ipfs daemon](https://github.com/ipfs/go-ipfs) running in unrestricted mode.

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

## Usage

For now, there is only one example here. You can access it through the browser.

More apps would be great! Feel free to add them here.

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipfs/ipfs-web-app/issues)!

This repository falls under the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

[![](https://cdn.rawgit.com/jbenet/contribute-ipfs-gif/master/img/contribute.gif)](https://github.com/ipfs/community/blob/master/contributing.md)

## License

[MIT](LICENSE)
