const winston = require("winston");
const path = require("path");
const rfs = require("rotating-file-stream");

var options = {
  console: {
    level: "debug",
    handleExceptions: true,
    json: true,
    colorize: true,
  },
};

const rfsStream = rfs.createStream(path.join("./", "logs/log.txt"), {
  size: "10M",
  interval: "1d",
  compress: "gzip",
});

var logger = new winston.createLogger({
  transports: [
    new winston.transports.File(rfsStream),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write: (message, encoding) => {
    const portMatch = message.match(/(\d+)$/);
    const port = portMatch ? portMatch[1] : "-";
    logger.info(`${message} - Port: ${port}`);
  },
};

global.logger = logger;
module.exports = logger;
