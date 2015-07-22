#!/usr/bin/env node
'use strict'

var opn = require('opn')
var cmd = require('comandante')
var fs = require('fs')
var _ = require('lodash')
var Q = require('kew')
var sink = require('stream-sink')

var run = function (command) {
  var split = command.split(' ')
  return cmd(split[0], split.slice(1))
}

// var LOADER = (fs.readFileSync(__dirname + '/loader-hash').toString()).trim()

var pack = function (cb) {
  var conf = {main: 'index.js'}
  var buildsteps = {}

  try {
    conf = JSON.parse(fs.readFileSync(process.cwd() + '/package.json'))
  } catch (e) {
    console.log(e)
  }
  try {
    buildsteps = conf['ipfs-web-app'].build
  } catch (e) {}

  if (typeof buildsteps === 'string') {
    buildsteps = [buildsteps]
  }

  Q.all(_.map(buildsteps, function (command, file) {
    console.log(command + ' > ' + file)
    var def = Q.defer()
    var writestream = fs.createWriteStream(file)
      .on('error', cb)
      .on('close', function () {
        def.resolve(true)
      })
    run(command).pipe(writestream)
    return def.promise
  })).then(function () {
    run('ipfs add -r dist')
      .pipe(sink())
      .on('error', cb)
      .on('data', function (data) {
        var rows = data.split('\n')
        if (rows.length > 1) {
          var hash = rows[rows.length - 2].split(' ')[1]
          cb(null, hash)
        } else {
          console.log('missing `dist` directory')
          process.exit(1)
        }
      })
  })
}

var main = function (argv) {
  if (argv[0] === 'run') {
    pack(function (err, hash) {
      if (err) throw err
      var url = 'http://localhost:5001/ipfs/' + hash
      opn(url)
    })
  } else if (argv[0] === 'publish') {
    pack(function (err, hash) {
      if (err) throw err
      console.log('app published as ' + hash)
    })
  } else {
    console.log()
    console.log('USAGE:')
    console.log()
    console.log('  ipfs-app run')
    console.log('   - spins up a browser with your app running')
    console.log()
    console.log('  ipfs-app publish')
    console.log('   - builds your app and returns its hash')
    console.log()
  }
}

main(process.argv.slice(2))
