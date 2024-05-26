"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
});
const CourceCantroller_1 = require("../controllers/CourceCantroller");
const uploadRouter = (0, express_1.Router)();
uploadRouter.get('/get/all', CourceCantroller_1.cources);
uploadRouter.get('/all', CourceCantroller_1.courList);
uploadRouter.get('/al', CourceCantroller_1.couceDeletedList);
uploadRouter.get('/get/latest', CourceCantroller_1.Latestcources);
uploadRouter.put('/publish/:idcource', CourceCantroller_1.PuplishCource);
uploadRouter.put('/trash/:id', CourceCantroller_1.trashcource);
uploadRouter.put('/restore/:id', CourceCantroller_1.restorecource);
uploadRouter.delete('/delete/:id', CourceCantroller_1.deletecource);
uploadRouter.get('/get/one/:idcource', CourceCantroller_1.getoncource);
uploadRouter.get('/get/:id', CourceCantroller_1.courceONLINE);
uploadRouter.post('/upload', upload.fields([{ name: 'videoUrl' }, { name: 'imageUrl' }]), CourceCantroller_1.CreateCourceOnline);
exports.default = uploadRouter;
