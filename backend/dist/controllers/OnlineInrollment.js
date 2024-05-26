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
exports.deleteall = exports.updateonlinerollment = exports.deleteonlineEnrollment = exports.getallonlineenrollment = exports.getoneenrollment = exports.Registerenrollment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Registerenrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, StudentName, courseId } = req.body;
    try {
        const newonlineenrrollment = yield prisma.enrollment.create({
            data: {
                userId: +userId,
                StudentName,
                courseId: +courseId
            }
        });
        res.json(newonlineenrrollment);
    }
    catch (error) {
        console.log(error);
    }
});
exports.Registerenrollment = Registerenrollment;
const getoneenrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getone = yield prisma.oflineenrollment.findFirst({
            where: {
                id: +id
            }
        });
        res.json(getone);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getoneenrollment = getoneenrollment;
const getallonlineenrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findmany = yield prisma.enrollment.findMany();
        res.json({
            message: "Successfully found",
            result: [...findmany]
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getallonlineenrollment = getallonlineenrollment;
const deleteonlineEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getone = yield prisma.enrollment.findFirst({
            where: {
                id: +id
            }
        });
        if (!getone) {
            return res.json({
                message: "The oflineenrollment you are trying to get deos not exist"
            });
        }
        else if (getone) {
            const deleteone = yield prisma.enrollment.delete({
                where: {
                    id: +id
                }
            });
            res.json({
                message: "deleted successfully",
                deleteone
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteonlineEnrollment = deleteonlineEnrollment;
const updateonlinerollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, StudentName, courseId } = req.body;
        const { id } = req.params;
        const getone = yield prisma.enrollment.findFirst({
            where: {
                id: +id
            }
        });
        if (!getone) {
            return res.json({
                message: "it deosnot exist"
            });
        }
        if (getone) {
            const updating = yield prisma.enrollment.update({
                where: {
                    id: +id
                },
                data: {
                    courseId,
                    userId,
                    StudentName
                }
            });
            res.json({
                message: "Deleted successfully",
                updating
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateonlinerollment = updateonlinerollment;
const deleteall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const delet = yield prisma.enrollment.deleteMany();
        res.json(delet);
    }
    catch (error) {
    }
});
exports.deleteall = deleteall;
