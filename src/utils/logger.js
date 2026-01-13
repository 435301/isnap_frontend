const isProd = process.env.NODE_ENV === "production";

const baseLog = (level, message, meta = {}) => {
  const logPayload = {
    level,
    message,
    meta,
    timestamp: new Date().toISOString(),
  };

  // Console logging (Dev only)
  if (!isProd) {
    console[level](message, meta);
  }

  // TODO: Send to backend (enable in prod)
  // sendLogToServer(logPayload);
};

const logger = {
  info: (message, meta) => baseLog("info", message, meta),
  warn: (message, meta) => baseLog("warn", message, meta),
  error: (message, meta) => baseLog("error", message, meta),
};

export default logger;
