const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

const filesDir = path.join(__dirname, "files");

app.get("/files", (req, res) => {
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.status(200).json(files);
    }
  });
});

app.get("/files/:name", (req, res) => {
  const name = req.params.name;
  const filePath = path.join(filesDir, "/", name);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.status(404).json(err);
    } else {
      res.status(200).sendFile(filePath);
    }
  });
});

function started() {
  console.log("Server started on port 3000");
}

app.listen(3000, started);
