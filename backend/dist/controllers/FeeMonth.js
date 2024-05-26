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
exports.GetFeemonth = exports.retorefeeMonth = exports.trashfeeMonth = exports.updatefeeMonth = exports.deletefeeMonth = exports.getonefeeMonth = exports.getallfeeMonth = exports.CreatefeeMonth = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const CreatefeeMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Amount, FeeTitle } = req.body;
        const checkMonth = yield prisma.feeMonth.findFirst({
            where: {
                FeeTitle
            }
        });
        if (checkMonth) {
            return res.status(401).json({
                message: "Title Already exist please change title"
            });
        }
        const feeMonth = yield prisma.feeMonth.create({
            data: {
                Amount,
                FeeTitle
            },
        });
        res.json(feeMonth);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.CreatefeeMonth = CreatefeeMonth;
const getallfeeMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getnowallfeeMonth = yield prisma.feeMonth.findMany();
        res.json({
            message: "Found successfully",
            result: [...getnowallfeeMonth]
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.getallfeeMonth = getallfeeMonth;
const getonefeeMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.feeMonth.findFirst({
            where: {
                id: +id
            }
        });
        return res.json(data);
    }
    catch (error) {
        return res.json({
            message: 'something went wrong'
        });
    }
});
exports.getonefeeMonth = getonefeeMonth;
const deletefeeMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { id } = req.params;
        const getonejust = yield prisma.feeMonth.findFirst({
            where: {
                id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the feeMonth you applied"
            });
        }
        const justdeleteit = yield prisma.feeMonth.delete({
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
exports.deletefeeMonth = deletefeeMonth;
const updatefeeMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { Amount, FeeTitle } = req.body;
        const { id } = req.params;
        const justupdateit = yield prisma.feeMonth.update({
            where: {
                id: +id
            },
            data: {
                Amount,
                FeeTitle
                //    isDeleted:true
            }
        });
        res.json(justupdateit);
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.updatefeeMonth = updatefeeMonth;
const trashfeeMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.feeMonth.update({
            where: {
                id: +id
            },
            data: {
                isDeleted: true
            }
        });
        res.json(upd);
    }
    catch (error) {
    }
});
exports.trashfeeMonth = trashfeeMonth;
const retorefeeMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.feeMonth.update({
            where: {
                id: +id
            },
            data: {
                isDeleted: false
            }
        });
        res.json(upd);
    }
    catch (error) {
    }
});
exports.retorefeeMonth = retorefeeMonth;
const GetFeemonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.feeMonth.findFirst({
            where: {
                id: +id
            }
        });
        res.json(data);
    }
    catch (error) {
        return res.status(401).json({ message: "something went wrong please try again" });
    }
});
exports.GetFeemonth = GetFeemonth;
