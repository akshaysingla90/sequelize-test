const express = require("express");
const router = express.Router();
const students = require('../controllers/students')

//middleware
const multer = require('multer');
const uploadMiddleware = multer();

//student result  APIs
router.post("/upload", uploadMiddleware.single('file'), students.uploadResult);
router.get("/result/:id", students.getStudentResultById);
router.get("/result", students.getStudentsResult);

module.exports = router;
