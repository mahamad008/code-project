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
exports.restoreOflineenrollment = exports.trashoflineEnrollment = exports.updateoflinenrollment = exports.deleteOflineenrollment = exports.getallfolineenrollment = exports.getoneofllineenrollment = exports.RegisterOflineenrollment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const RegisterOflineenrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentId, StudentName, userId, OflinecourceId } = req.body;
    try {
        const newoflineenrrollment = yield prisma.oflineenrollment.create({
            data: {
                studentId: +studentId,
                StudentName,
                OflinecourceId: +OflinecourceId,
                userId: +userId
            }
        });
        res.json({
            message: "Created successfully",
            newoflineenrrollment
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.RegisterOflineenrollment = RegisterOflineenrollment;
const getoneofllineenrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.getoneofllineenrollment = getoneofllineenrollment;
const getallfolineenrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findmany = yield prisma.oflineenrollment.findMany();
        res.json({
            message: "Successfully found",
            result: [...findmany]
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getallfolineenrollment = getallfolineenrollment;
const deleteOflineenrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getone = yield prisma.oflineenrollment.findFirst({
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
            const deleteone = yield prisma.oflineenrollment.delete({
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
exports.deleteOflineenrollment = deleteOflineenrollment;
const updateoflinenrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, StudentName, OflinecourceId } = req.body;
        const { id } = req.params;
        const getone = yield prisma.oflineenrollment.findFirst({
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
            const updating = yield prisma.oflineenrollment.update({
                where: {
                    id: +id
                },
                data: {
                    OflinecourceId,
                    studentId,
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
exports.updateoflinenrollment = updateoflinenrollment;
const trashoflineEnrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.oflineenrollment.update({
            where: {
                id: +id
            },
            data: {
                isDeleted: true
            }
        });
    }
    catch (error) {
    }
});
exports.trashoflineEnrollment = trashoflineEnrollment;
const restoreOflineenrollment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.oflineenrollment.update({
            where: {
                id: +id
            },
            data: {
                isDeleted: false
            }
        });
    }
    catch (error) {
    }
});
exports.restoreOflineenrollment = restoreOflineenrollment;
