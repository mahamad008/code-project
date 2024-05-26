"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TeacherCantroller_1 = require("../controllers/TeacherCantroller");
const TeacherRouter = (0, express_1.Router)();
TeacherRouter.post('/create', TeacherCantroller_1.Createteacher);
TeacherRouter.get('/get/all', TeacherCantroller_1.getallteacher);
TeacherRouter.get('/get/one/:id', TeacherCantroller_1.getoneteacher);
TeacherRouter.get('/get/:phone/:password', TeacherCantroller_1.TeacherOfflineStudent);
TeacherRouter.get('/get/salary/:id', TeacherCantroller_1.TeacherSalary);
TeacherRouter.put('/update/:id', TeacherCantroller_1.updateteacher);
TeacherRouter.put('/restore/:id', TeacherCantroller_1.restoreteacher);
TeacherRouter.put('/trash/:id', TeacherCantroller_1.trashteacher);
TeacherRouter.delete('/delete/:id', TeacherCantroller_1.deleteteacher);
exports.default = TeacherRouter;