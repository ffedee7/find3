"use strict";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
var AWS = require("aws-sdk");

// Constants
const PORT = 8080;

// App
const app = express();

var wrap = fn => (...args) => fn(...args).catch(args[2]);

// Configure Morgan
app.use(morgan("short"));

// App configu
app.use(bodyParser.json({ limit: "50mb" }));
// Configure CORS
app.use(cors());
app.options("*", cors()); // include before other routes

app.post(
  "/data",
  wrap(async (req, res) => {
    var Bucket = process.env.BUCKET;
    var s3 = new AWS.S3({
      accessKeyId: process.env.USER_KEY,
      secretAccessKey: process.env.USER_SECRET,
      region: "sa-east-1"
    });
    var date = new Date().toISOString();
    var Key = `mnav/${req.body.place}/${req.body.task}/${date}.json`;
    var data = req.body;
    console.log("Storing data on S3");

    try {
      await s3
        .putObject({
          Bucket,
          Key,
          Body: JSON.stringify(data)
        })
        .promise();
    } catch (err) {
      throw err;
    }
    console.log(`Successfully uploaded data to ${Bucket}/${Key}`);

    res.status(200).send("ok");
  })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
