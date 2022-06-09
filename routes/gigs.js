const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Gig = require("../models/Gig");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const fs = require("fs");

const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");
let stream = fs.createReadStream("student.csv");
router.post("/upload", function (req, res) {
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();
      // create a new connection to the database
      const pool = new Pool({
        host: "localhost",
        user: "postgres",
        database: "student",
        password: "task#123",
        port: 5432,
      });
      const query =
        "INSERT INTO students (id, name, age, marks1,marks2,marks3) VALUES ($1, $2, $3, $4, $5, $6)";
      pool.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach((row) => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err.stack);
              } else {
                console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          });
        } finally {
          done();
        }
      });
    });
  stream.pipe(csvStream);

  return res.status(200).json({ msg: "file uploaded successfully" });
});

router.get("/result/:id", async (req, res) => {
  let idToken = req.params.id;
  try {
    let data = await Gig.findOne({ where: { id: idToken } });
    console.log(data);
    for (const a in data) {
      console.log(data[a].marks1);
      let result;
      if (data[a].marks1 > 35 && data[a].marks2 > 35 && data[a].marks3 > 35) {
        result = "pass";
        return res.status(200).json({
          data: result,
        });
      } else {
        result = "fail";
        return res.status(200).json({
          data: result,
        });
      }
    }

    res.status(200).json({
      msg: "ok",
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/result", async (req, res) => {
  try {
    let data = await Gig.findAll({
      where: {
        marks1: {
          [Op.gt]: 35,
        },
        marks2: {
          [Op.gt]: 35,
        },
        marks3: {
          [Op.gt]: 35,
        },
      },
    });
    res.status(200).json({
      msg: "ok",
      result: data,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
