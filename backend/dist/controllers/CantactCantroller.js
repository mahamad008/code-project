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
exports.restorecontact = exports.trashcontact = exports.updatecontact = exports.deletecontact = exports.getonecontact = exports.getallcontact = exports.Createcontact = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Createcontact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, email, message } = req.body;
        const addtocontact = yield prisma.contact.create({
            data: {
                email,
                message,
                Name
            }
        });
        res.json({
            messages: "Created successfully",
            addtocontact
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.Createcontact = Createcontact;
const getallcontact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getnowallcontact = yield prisma.contact.findMany();
        res.json({
            isSuccess: true,
            result: [...getnowallcontact],
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.getallcontact = getallcontact;
const getonecontact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getonejust = yield prisma.contact.findFirst({
            where: {
                id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the contact you applied"
            });
        }
        if (getonejust) {
            res.json({
                message: "found Successfully",
                getonecontact: exports.getonecontact
            });
        }
    }
    catch (error) {
        return res.json({
            message: 'something went wrong'
        });
    }
});
exports.getonecontact = getonecontact;
const deletecontact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getonejust = yield prisma.contact.findFirst({
            where: {
                id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the contact you applied"
            });
        }
        const justdeleteit = yield prisma.contact.delete({
            where: {
                id: +id
            }
        });
        res.json({
            message: "Deleted successfully",
            justdeleteit
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.deletecontact = deletecontact;
const updatecontact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, Name, message } = req.body;
        const { id } = req.params;
        const getonejust = yield prisma.contact.findFirst({
            where: {
                id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the contact you applied"
            });
        }
        const justupdateit = yield prisma.contact.update({
            where: {
                id: +id
            },
            data: {
                email,
                Name,
                message
            }
        });
        res.json({
            message: "Updated successfully",
            justupdateit
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.updatecontact = updatecontact;
const trashcontact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.contact.update({
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
exports.trashcontact = trashcontact;
const restorecontact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.contact.update({
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
exports.restorecontact = restorecontact;
