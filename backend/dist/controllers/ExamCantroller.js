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
exports.Examdetail = exports.getExamReportByDayDate = exports.getExamReportByMonthYear = exports.restoreexam = exports.trashexam = exports.updateexam = exports.deleteexam = exports.getoneexam = exports.getallexam = exports.Createexam = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Createexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { userId, SubcourceId, CourceName, Total, studentPhone, Studentname, Totalscore, studentId } = req.body;
        const addtoexam = yield prisma.exam.create({
            data: {
                studentId: +studentId,
                userId: +userId,
                Total: +Total,
                CourceName,
                Totalscore,
                studentPhone,
                Studentname,
                SubcourceId: +SubcourceId,
            }
        });
        res.json({
            message: "Created successfully",
            addtoexam
        });
    }
    catch (error) {
        // return res.json({
        //     message:"something went wrong"
        // })
        console.log(error);
    }
});
exports.Createexam = Createexam;
const getallexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getnowallexam = yield prisma.exam.findMany();
        res.json({
            message: "Found successfully",
            result: [...getnowallexam]
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.getallexam = getallexam;
const getoneexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentPhone } = req.params;
        const data = yield prisma.exam.findFirst({
            where: {
                studentPhone
            }
        });
        res.json(data);
    }
    catch (error) {
        return res.json({
            message: 'something went wrong'
        });
    }
});
exports.getoneexam = getoneexam;
const deleteexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteexam = yield prisma.exam.delete({
            where: {
                id: +id
            }
        });
        res.json({
            message: "Deleted successfully",
            deleteexam
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteexam = deleteexam;
const updateexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { courseId, Total, Totalscore, CourceName, Studentname, SubcourceId, studentPhone, studentId } = req.body;
        const { id } = req.params;
        const getonejust = yield prisma.exam.findFirst({
            where: {
                id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the exam you applied"
            });
        }
        const justupdateit = yield prisma.exam.update({
            where: {
                id: +id
            },
            data: {
                studentId,
                Total,
                CourceName,
                Studentname,
                studentPhone,
                SubcourceId: +SubcourceId,
                Totalscore
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
exports.updateexam = updateexam;
const trashexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.exam.update({
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
exports.trashexam = trashexam;
const restoreexam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.exam.update({
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
exports.restoreexam = restoreexam;
const getExamReportByMonthYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { month, year } = req.query;
        // Validate and parse the month and year parameters
        const parsedMonth = parseInt(month, 10);
        const parsedYear = parseInt(year, 10);
        if (isNaN(parsedMonth) || isNaN(parsedYear)) {
            return res.status(400).json({ message: "Invalid month or year" });
        }
        // Fetch exams for the specified month and year
        const exams = yield prisma.exam.findMany({
            where: {
                TakeDate: {
                    gte: new Date(parsedYear, parsedMonth - 1, 1),
                    lt: new Date(parsedYear, parsedMonth, 1),
                },
            },
        });
        res.json({
            message: "Exam report retrieved successfully",
            exams,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getExamReportByMonthYear = getExamReportByMonthYear;
const getExamReportByDayDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { day, month, year } = req.query;
        // Validate and parse the day, month, and year parameters
        const parsedDay = parseInt(day, 10);
        const parsedMonth = parseInt(month, 10);
        const parsedYear = parseInt(year, 10);
        if (isNaN(parsedDay) ||
            isNaN(parsedMonth) ||
            isNaN(parsedYear) ||
            parsedDay < 1 ||
            parsedDay > 31 ||
            parsedMonth < 1 ||
            parsedMonth > 12 ||
            parsedYear < 1900 ||
            parsedYear > 2100) {
            return res.status(400).json({ message: "Invalid date" });
        }
        // Fetch exams for the specified day, month, and year
        const exams = yield prisma.exam.findMany({
            where: {
                TakeDate: new Date(parsedYear, parsedMonth - 1, parsedDay),
            },
        });
        res.json({
            message: "Exam report retrieved successfully",
            exams,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.getExamReportByDayDate = getExamReportByDayDate;
const Examdetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const find = yield prisma.exam.findFirst({
            where: {
                id: +id
            }
        });
        res.json(find);
    }
    catch (error) {
        return res.json({
            message: "something went wrong please try again"
        });
    }
});
exports.Examdetail = Examdetail;
