const fastcsv = require("fast-csv");
const fs = require("fs");
let stream = fs.createReadStream("student.csv");
let csvData = [];
let csvStream = fastcsv
    .parse({ headers: true })
    .on("data", function (data) {
        csvData.push(data);
    })
    .on("end", function () {
        // console.log(csvData)
        // // remove the first line: header
        // csvData.shift();
        for (let index = 0; index < csvData.length; index++) {
            const row = csvData[index];
            let studentResultData = {
                id:1,
                name: row.name,
                age: row.age,
                marks1: row.marks1,
                marks2: row.marks2,
                marks3: row.marks3
            }
            console.log(studentResultData);
        }
    });
stream.pipe(csvStream)
console.log({ msg: "file uploaded successfully" });