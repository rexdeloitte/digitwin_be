const express = require("express");
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
  console.log(req.body);
  if (req.files) {
    console.log(util.inspect(req.files));
    if (req.files.myFile.size === 0) {
      return next(new Error("Hey, first would you select a file?"));
    }
    // const workbook = XLSX.read(data, { type: "buffer" });
    // console.log(workbook);
    // res.end(workbook);

    // fs.exists(req.files.myFile.path, function(exists) {
    //   if (exists) {
    //     res.end("Got your file!");
    //   } else {
    //     res.end("Well, there is no magic for those who don’t believe in it!");
    //   }
    // });

    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      const f = files[Object.keys(files)[0]];
      const workbook = XLSX.readFile(f.path);
      /* DO SOMETHING WITH workbook HERE */
      console.log(workbook);
      res.end(JSON.stringify(workbook));
    });
  }
});
module.exports = routes;
