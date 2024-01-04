function logError(msg) {
  console.error("\x1b[31m", msg, "\x1b[0m")
}

function logSuccess(msg) {
  console.error("\x1b[32m", msg, "\x1b[0m")
}

module.exports = { logError, logSuccess }