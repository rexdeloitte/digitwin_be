const ENV = process.env.NODE_ENV || "prod";
const DB_URL = ENV === "prod" ? "mongodb://0.0.0.0:27017/digitalTwin" : "mongodb://localhost:27017/digitalTwin";

const LOGS = ENV === "prod" ? "logs/production.log" : "logs/development.log";
const PORT = process.env.PORT || "8083";
const URL = ENV === "development" ? "http://localhost:3000" : "";

module.exports = {
  DB_URL: DB_URL,
  LOGS: LOGS,
  PORT: PORT,
  URL: URL
};
