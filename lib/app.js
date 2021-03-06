var async = require('async')
var merge = require('lodash.merge')
var get = require('lodash.get')

module.exports = function(options) {

    var express = get(options, 'express') || require('express')
    var config
    var logger

    function init(dependencies, cb) {
        config = merge({
            settings: { 'x-powered-by': false, 'etag': false }
        }, dependencies.config)
        logger = dependencies.logger || console
        cb()
    }

    function start(cb) {
        var app = express()
        app.locals.logger = logger
        for (var key in config.settings) {
            app.set(key, config.settings[key])
        }
        cb(null, app)
    }

    return {
        start: async.seq(init, start)
    }
}