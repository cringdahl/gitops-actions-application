'use strict'

const humanize = require("humanize-duration");

module.exports = async function (fastify, opts) {
  const {
    HOSTNAME,
    VERSION_NUMBER,
    GIT_SHA
  } = opts.config

  fastify.get('/', async function (request, reply) {
    return reply.view('index.hbs', {
      version: VERSION_NUMBER,
      hostname: HOSTNAME,
      sha: GIT_SHA,
      uptime: humanize(process.uptime() * 1000, { maxDecimalPoints: 3 })
    })
  })
}
