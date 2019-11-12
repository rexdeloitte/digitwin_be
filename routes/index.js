const express = require("express");
const formidable = require("formidable");
const routes = new express.Router();
const path = require("path");
const XLSX = require("xlsx");
// const multer = require("multer");

// var options = multer.diskStorage({
//   destination: path.join(__dirname, "../tmp/uploads/"),
//   filename: function(req, file, cb) {
//     cb(null, (Math.random().toString(36) + "00000000000000000").slice(2, 10) + Date.now() + path.extname(file.originalname));
//   }
// });

// var upload = multer({ storage: options });

routes.get("/parsedExcel", function(req, res) {
  try {
    res.json({
      success: true,
      excel: "Excel JSON"
    });
  } catch (err) {
    throw err;
  }
});

routes.post("/parse", function(req, res, next) {
  if (req.files) {
    if (req.files.file.size === 0) {
      return next(new Error("Hey, first would you select a file?"));
    }
    let uploadedFile = req.files.file.data;
    console.log("uploadedFile: ", uploadedFile);
    const workbook = XLSX.read(uploadedFile, { type: "buffer" });
    console.log(workbook);
    res.end(JSON.stringify(workbook));
  }
});
module.exports = routes;
