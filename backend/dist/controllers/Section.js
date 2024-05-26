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
exports.findisection = exports.manysections = exports.updating = exports.deleteonesection = exports.getonsesection = exports.newsection = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const newsection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, courseId } = req.body;
        const newing = yield prisma.section.create({
            data: {
                title,
                courseId,
                description,
            }
        });
        res.json({
            message: "Created successfully",
            newing
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.newsection = newsection;
const getonsesection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { secId } = req.params;
        const finding = yield prisma.section.findFirst({
            where: {
                id: +secId
            }
        });
        res.json(finding);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getonsesection = getonsesection;
const deleteonesection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const finding = yield prisma.section.findFirst({
            where: {
                id: +id
            }
        });
        if (finding) {
            const deletenow = yield prisma.section.delete({
                where: {
                    id: +id
                }
            });
            res.json({
                message: "Deleted successfully",
                deletenow
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteonesection = deleteonesection;
const updating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, courseId } = req.body;
        const { id } = req.params;
        const finding = yield prisma.section.findFirst({
            where: {
                id: +id
            }
        });
        if (finding) {
            const nowupdate = yield prisma.section.update({
                where: {
                    id: +id
                },
                data: {
                    courseId,
                    description,
                    title,
                }
            });
            res.json({
                message: "Deleted successfully",
                nowupdate
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updating = updating;
const manysections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getall = yield prisma.section.findMany();
        res.json({
            message: "Found successfully",
            result: [...getall]
        });
    }
    catch (error) {
    }
});
exports.manysections = manysections;
const findisection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const find = yield prisma.section.findUnique({
            where: {
                id: +id
            }
        });
        res.json(find);
    }
    catch (error) {
    }
});
exports.findisection = findisection;
