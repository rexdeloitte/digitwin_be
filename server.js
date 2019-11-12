const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const config = require("./config");

const routes = require("./routes");

const NODE_ENV = process.env.NODE_ENV;

const app = express();
const PORT = config.PORT;
const DB_URL = config.DB_URL;

const corsOptions = {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"]
};

// /**
//  * Connect to MongoDB
//  * @method connectToDB
//  */
// function connectToDB() {
//   mongoose.Promise = global.Promise;
//   mongoose.set("debug", true);
//   mongoose.connect(DB_URL);
//   mongoose.connection
//     .once("open", function() {
//       console.log("MongoDB running");
//     })
//     .on("error", function(err) {
//       console.error("MongoDB faileddd to connect " + err);
//     });
// }

/** Middleware configuration **/
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extend: true }));
app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname + "/public")));

app.use("/api", routes);
/** Global error handler **/
app.use(function(err, req, res, next) {
  if (err) {
    console.error("Global error " + err);
    res.status(500).json({
      success: false,
      message: err || "Something went wrong"
    });
  }
});

// app.get("/*", function(req, res) {
//   res.sendFile(path.join(__dirname + "/public/index.html"));
// });

function start() {
  // connectToDB();

  app.listen(PORT, function(err) {
    if (err) {
      console.error("Could not start on PORT: " + PORT + " - " + err);
    } else {
      console.log("Listening on PORT " + PORT);
    }
  });
}
start();
if (NODE_ENV === "prod") {
  start();
}

module.exports = {
  start: start
};
