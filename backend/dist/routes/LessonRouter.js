"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LessonCantroller_1 = require("../controllers/LessonCantroller");
const Lessonrouter = (0, express_1.Router)();
Lessonrouter.get('/get/:id', LessonCantroller_1.getonelesson);
Lessonrouter.delete('/delete/:id', LessonCantroller_1.deleteonelesson);
Lessonrouter.get('/get/all', LessonCantroller_1.findmanylesson);
exports.default = Lessonrouter;
