const dayjs = require("dayjs");
const morgan = require("morgan");
const logger = require("./logger");

module.exports = morgan(
  (tokens, req, res) =>
    [
      `[${dayjs(new Date()).format("DD/MM/YYYY HH:mm:ss")}]`,
      `${req.socket.remoteAddress}:${req.socket.remotePort}`,
      tokens.url(req, res),
      tokens.method(req, res),
      tokens.status(req, res),
      res.statusMessage,
    ].join(" -"),
  { stream: logger.stream }
);
