'use strict'

const { from } = require('env-var')
const { readFileSync, existsSync } = require('fs')
const { join } = require('path')

module.exports = (env) => {
  const { get } = from(env)
  const SHA_PATH = join(__dirname, 'sha.txt')

  return {
    HOSTNAME: get('HOSTNAME').default('default-hostname').asString(),
    VERSION_NUMBER: require('./package.json').version,

    // This file will be created during the container build process
    GIT_SHA: existsSync(SHA_PATH) ? readFileSync(SHA_PATH, 'utf-8') : 'unknown'
  }
}