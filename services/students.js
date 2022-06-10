const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Student = require("../models/Student");
let passingMarks = 35;

const createStudentResult = async (studentResultData) => {
    return await Student.create(studentResultData);
};

const getStudentResult = async (studentId) => {
    return await Student.findOne({
        where: {
            id: studentId,
            marks1: { [Op.gt]: passingMarks, },
            marks2: { [Op.gt]: passingMarks },
            marks3: { [Op.gt]: passingMarks },
        }
    });
};

const getStudentsResultByStatus = async (resultStatus) => {
    if (resultStatus == 'passed') {
        return await Student.findAll({
            where: {
                [Op.and]: [
                    { marks1: { [Op.gt]: passingMarks, } },
                    { marks2: { [Op.gt]: passingMarks } },
                    { marks3: { [Op.gt]: passingMarks } }
                ]
            }
        })
    } else {
        return await Student.findAll({
            where: {
                [Op.or]: [
                    { marks1: { [Op.lte]: passingMarks, } },
                    { marks2: { [Op.lte]: passingMarks } },
                    { marks3: { [Op.lte]: passingMarks } }
                ]
            }
        });
    }
};

module.exports = {
    getStudentResult,
    getStudentsResultByStatus,
    createStudentResult
}