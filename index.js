#!/usr/bin/env node

if (module.parent) {
  console.log('rcg should be installed globally')
} else {
  require('./src')
}
