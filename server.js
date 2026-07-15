const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: "*"
}));
app.use(express.json());

// Temporary Array Database
let students = [];

// Home
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Server is running"
    });
});

// CREATE
app.post("/students", (req, res) => {

    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        department: req.body.department
    };

    students.push(student);

    res.json({
        message: "Student Added Successfully",
        student
    });
});

// READ - Get All Students
app.get("/students", (req, res) => {

    res.json(students);
});

// READ - Get One Student
app.get("/students/:id", (req, res) => {

    const student = students.find(
        s => s.id == req.params.id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    res.json(student);
});

// UPDATE
app.put("/students/:id", (req, res) => {

    const student = students.find(
        s => s.id == req.params.id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student Not Found"
        });
    }

    student.name = req.body.name;
    student.age = req.body.age;
    student.department = req.body.department;

    res.json({
        message: "Updated Successfully",
        student
    });
});

// DELETE
app.delete("/students/:id", (req, res) => {

    students = students.filter(
        s => s.id != req.params.id
    );

    res.json({
        message: "Deleted Successfully",
        students
    });
});

module.exports = app;
