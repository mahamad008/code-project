"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getallRequestTeacher = exports.getOnereques = exports.deleteRequest = exports.NewrequestTeacher = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const NewrequestTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phoneNumber, message, teacherId } = req.body;
        const create = yield prisma.teacherRequest.create({
            data: {
                phoneNumber,
                message,
                teacherId: +teacherId
            }
        });
        res.json(create);
    }
    catch (error) {
        return res.status(400).json(error);
    }
});
exports.NewrequestTeacher = NewrequestTeacher;
const deleteRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteRequest = yield prisma.teacherRequest.delete({
            where: {
                id: +id
            }
        });
        res.json(deleteRequest);
    }
    catch (error) {
        return res.status(400).json({
            messaage: "something went wrong please try again",
        });
    }
});
exports.deleteRequest = deleteRequest;
const getOnereques = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const find = yield prisma.teacherRequest.findFirst({
            where: {
                id: +id
            }
        });
        res.json(find);
    }
    catch (error) {
        return res.status(400).json({
            messaage: "something went wrong please try again",
        });
    }
});
exports.getOnereques = getOnereques;
const getallRequestTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findman = yield prisma.teacherRequest.findMany();
        res.json(findman);
    }
    catch (error) {
        return res.status(400).json({
            messaage: "something went wrong please try again",
        });
    }
});
exports.getallRequestTeacher = getallRequestTeacher;
