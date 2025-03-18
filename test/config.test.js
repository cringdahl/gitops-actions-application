'use strict'

const t = require('tap')
const getConfig = require('../config')
const { writeFileSync, unlinkSync, existsSync } = require('fs')
const { join } = require('path')
const SHA = '282e70d0'
const SHA_PATH = join(__dirname, '../sha.txt')

t.afterEach(() => {
  if (existsSync(SHA_PATH)) {
    unlinkSync(SHA_PATH)
  }
})

t.beforeEach(() => {
  writeFileSync(SHA_PATH, SHA)
})

t.test('config should be loaded from environment variables', (t) => {
  unlinkSync(SHA_PATH)

  const HOSTNAME = 'test'
  const isSemver = new RegExp('^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?$')
  const config = getConfig({
    HOSTNAME
  })

  t.equal(config.HOSTNAME, HOSTNAME)
  t.equal(config.GIT_SHA, 'unknown')
  t.ok(isSemver.test(config.VERSION_NUMBER))
  t.end()
})

t.test('config should load SHA from file', (t) => {
  const config = getConfig({})

  t.equal(config.GIT_SHA, SHA)
  t.end()
})
