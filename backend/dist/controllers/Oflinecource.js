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
exports.restoreoflinecource = exports.trashoflinecource = exports.getoneoflinecource = exports.getalloflinecources = exports.deleteoflinecource = exports.updateoflinecource = exports.Regiteroflinecource = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Regiteroflinecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, shift, OflineCategoryId, teacherId, userId, Description } = req.body;
        const newregiter = yield prisma.oflinecources.create({
            data: {
                Name,
                Description,
                teacherId: +teacherId,
                OflineCategoryId: +OflineCategoryId,
                shift,
                userId: +userId
            }
        });
        res.json({
            message: "creqated successfully",
            newregiter
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.Regiteroflinecource = Regiteroflinecource;
const updateoflinecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { Name, shift, OflineCategoryId, teacherId, Description } = req.body;
        const finding = yield prisma.oflinecources.findFirst({
            where: {
                id: +id
            }
        });
        if (finding) {
            const updating = yield prisma.oflinecources.update({
                where: {
                    id: +id
                },
                data: {
                    Description,
                    Name,
                    teacherId,
                    OflineCategoryId,
                    shift
                }
            });
            res.json({
                message: "updated successfully",
                updating
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateoflinecource = updateoflinecource;
const deleteoflinecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findingdeletinId = yield prisma.oflinecources.findFirst({
            where: {
                id: +id
            }
        });
        if (findingdeletinId) {
            const deleteoflinecources = yield prisma.oflinecources.delete({
                where: {
                    id: +id
                }
            });
            res.json({
                message: "Deleted successfully",
                deleteoflinecources
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteoflinecource = deleteoflinecource;
const getalloflinecources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const oflinecources = yield prisma.oflinecources.findMany();
        res.json({
            isSuccess: true,
            result: [...oflinecources],
        });
    }
    catch (error) {
        res.json({
            isSuccess: false,
            message: 'Failed to fetch the categories data',
        });
    }
});
exports.getalloflinecources = getalloflinecources;
const getoneoflinecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const searchingoneoflinecource = yield prisma.oflinecources.findFirst({
            where: {
                id: +id
            }
        });
        if (!searchingoneoflinecource) {
            return res.json({
                message: "The oflinecource your are searching doesn't exist"
            });
        }
        if (searchingoneoflinecource) {
            return res.json(searchingoneoflinecource);
        }
    }
    catch (error) {
        return res.json({
            message: "Something went Wrong"
        });
    }
});
exports.getoneoflinecource = getoneoflinecource;
const trashoflinecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.oflinecources.update({
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
exports.trashoflinecource = trashoflinecource;
const restoreoflinecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.oflinecources.update({
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
exports.restoreoflinecource = restoreoflinecource;
