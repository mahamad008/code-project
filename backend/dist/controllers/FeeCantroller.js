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
exports.getfeeReportByMonthYear = exports.retorefee = exports.trashfee = exports.updatefee = exports.deletefee = exports.getonefee = exports.getallfee = exports.Createfee = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Createfee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amountPaid, userId, feeMonthId, Balance, studentPhone, studentName, Amountneed, studentId } = req.body;
        // Calculate the balance
        const balance = Amountneed - amountPaid;
        const fee = yield prisma.fee.create({
            data: {
                amountPaid,
                // feeMonthId:+feeMonthId,
                Balance: balance,
                studentPhone,
                studentName,
                Amountneed,
                studentId: +studentId,
                userId: +userId,
                feeMonthId: +feeMonthId
            },
        });
        res.json(fee);
    }
    catch (error) {
        console.error(error);
        // res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.Createfee = Createfee;
const getallfee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getnowallfee = yield prisma.fee.findMany();
        res.json({
            message: "Found successfully",
            result: [...getnowallfee]
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.getallfee = getallfee;
const getonefee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.fee.findFirst({
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
exports.getonefee = getonefee;
const deletefee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { id } = req.params;
        const getonejust = yield prisma.fee.findFirst({
            where: {
                id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the fee you applied"
            });
        }
        const justdeleteit = yield prisma.fee.delete({
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
exports.deletefee = deletefee;
const updatefee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { amountPaid, Balance, feeMonthId, Amountneed, studentId } = req.body;
        const { id } = req.params;
        const balance = Amountneed - amountPaid;
        const justupdateit = yield prisma.fee.update({
            where: {
                id: +id
            },
            data: {
                amountPaid, feeMonthId,
                Balance: balance,
                Amountneed,
                studentId,
                //    isDeleted:true
            }
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.updatefee = updatefee;
const trashfee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.fee.update({
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
exports.trashfee = trashfee;
const retorefee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.fee.update({
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
exports.retorefee = retorefee;
const getfeeReportByMonthYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, year } = req.query;
        // Validate and parse the month and year parameters
        const parsedMonth = parseInt(month, 10);
        const parsedYear = parseInt(year, 10);
        if (isNaN(parsedMonth) || isNaN(parsedYear)) {
            return res.status(400).json({ message: "Invalid month or year" });
        }
        // Fetch fees for the specified month and year
        const fees = yield prisma.fee.findMany({
            where: {
                PaidAt: {
                    gte: new Date(parsedYear, parsedMonth - 1, 1),
                    lt: new Date(parsedYear, parsedMonth, 1),
                },
            },
        });
        res.json({
            message: "Exam report retrieved successfully",
            fees,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getfeeReportByMonthYear = getfeeReportByMonthYear;
