module.exports = comp => `
export { default } from ${comp}
`.substr(1)
