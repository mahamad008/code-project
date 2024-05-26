"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CourceCantroller_1 = require("../controllers/CourceCantroller");
// import { uploadController } from '../controllers/CourceCantroller';
// import { uploadController } from './uploadController';
const express_1 = require("express");
const QuizRouter = (0, express_1.Router)();
QuizRouter.get('/get/all', CourceCantroller_1.cources);
QuizRouter.put('/puplish/:courceId', CourceCantroller_1.PuplishCource);
QuizRouter.put('/trash/:id', CourceCantroller_1.trashcource);
QuizRouter.put('/restore/:id', CourceCantroller_1.restorecource);
QuizRouter.delete('/delete/:id', CourceCantroller_1.deletecource);
QuizRouter.get('/get/one/:Courceid', CourceCantroller_1.getoncource);
QuizRouter.get('/get/:id', CourceCantroller_1.courceONLINE);
const QuizController_1 = require("../controllers/QuizController");
// Configure multer for file uplo
// Upload endpoint
QuizRouter.post('/new', QuizController_1.createQuiz);
QuizRouter.post('/new/quesion', QuizController_1.createQuestion);
QuizRouter.post('/new/option', QuizController_1.createOption);
exports.default = QuizRouter;
