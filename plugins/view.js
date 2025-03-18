'use strict'

const fp = require('fastify-plugin')
const path = require('node:path')

/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/view'), {
    engine: {
      handlebars: require('handlebars'),
    },
    root: path.join(__dirname, '../views/'),
    layout: 'layout.hbs',
    viewExt: 'hbs'
  })
})
