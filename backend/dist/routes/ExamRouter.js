"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ExamCantroller_1 = require("../controllers/ExamCantroller");
const ExamRouter = (0, express_1.Router)();
ExamRouter.post('/create', ExamCantroller_1.Createexam);
ExamRouter.get('/get/all', ExamCantroller_1.getallexam);
ExamRouter.get('/get/one/:id', ExamCantroller_1.getoneexam);
ExamRouter.get('/:id', ExamCantroller_1.Examdetail);
ExamRouter.delete('/delete/:id', ExamCantroller_1.deleteexam);
ExamRouter.put('/update/:id', ExamCantroller_1.updateexam);
ExamRouter.put('/trash/:id', ExamCantroller_1.trashexam);
// ExamRouter.get('/report',getExamReportByMonthYear)
ExamRouter.get('/reportday', ExamCantroller_1.getExamReportByDayDate);
ExamRouter.put('/restore/:id', ExamCantroller_1.restoreexam);
exports.default = ExamRouter;
