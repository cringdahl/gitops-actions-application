'use strict'

const { test } = require('tap')
const Fastify = require('fastify')
const Support = require('../../plugins/view')

test('support works standalone', async (t) => {
  const fastify = Fastify()
  fastify.register(Support)

  await fastify.ready()
  t.hasProp(fastify, 'view')
})