const students = require('../services/students')
const fastcsv = require("fast-csv");

const getStudentResultById = async (req, res) => {
    try {
        let studentId = req.params.id;
        let data = await students.getStudentResult(studentId);
        result = data ? 'passed' : 'failed';
        return res.status(200).json({ data: result, })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error" });
    }
}

const getStudentsResult = async (req, res) => {
    try {
        let resultStatus = req.query.resultStatus;
        let data = await students.getStudentsResultByStatus(resultStatus);
        res.status(200).json({ msg: "ok", result: data, });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "server error" });
    }
}

const uploadResult = async function (req, res) {
    let csvData = [];
    let stream = req.file;
    let csvStream = fastcsv
        .parse({ headers: true })
        .on("data", data => csvData.push(data))
        .on("end", function () {
            for (let index = 0; index < csvData.length; index++) {
                let row = csvData[index];
                await students.createStudentResult(row);
            }
        });
    stream.pipe(csvStream);
    return res.status(200).json({ msg: "file uploaded successfully" });
}

module.exports = {
    getStudentResultById,
    getStudentsResult,
    uploadResult
}