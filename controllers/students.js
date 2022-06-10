const students = require("../services/students");
const fastcsv = require("fast-csv");
const fs = require('streamifier');

const getStudentResultById = async (req, res) => {
  try {
    let studentId = req.params.id;
    if (!studentId) throw new Error('studentId is required')
    let data = await students.getStudentResult(studentId);
    result = data ? "passed" : "failed";
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

const getStudentsResult = async (req, res) => {
  try {
    let resultStatus = req.query.resultStatus;
    if (!resultStatus) throw new Error('resultStatus is required')
    let data = await students.getStudentsResultByStatus(resultStatus);
    res.status(200).json({ msg: "ok", result: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

const uploadResult = async function (req, res) {
  try {
    let csvData = [];
    let stream = fs.createReadStream(req.file.buffer);
    let csvStream = fastcsv
      .parse({ headers: true })
      .on("data", (data) => {
        console.log(data);
        csvData.push(data);
      })
      .on("end", function () {
        for (let index = 0; index < csvData.length; index++) {
          let row = csvData[index];
          students.createStudentResult(row);
        }
      });
    stream.pipe(csvStream);
    return res.status(200).json({ msg: "file uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "server error" });
  }
};

module.exports = {
  getStudentResultById,
  getStudentsResult,
  uploadResult,
};
