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
exports.restoresalary = exports.trashsalary = exports.updatesalary = exports.deletesalary = exports.getonesalary = exports.getallsalary = exports.Createsalary = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Createsalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { Amount, userId, teacherId, method, TeacherPhone, TeacherName } = req.body;
        if (!Amount || !teacherId || !TeacherPhone || !TeacherName) {
            return res.json({
                Message: "Failed to create new salary please check your Data"
            });
        }
        const addtosalary = yield prisma.salary.create({
            data: {
                Amount,
                teacherId: +teacherId,
                TeacherPhone,
                TeacherName,
                method,
                userId: +userId,
            }
        });
        res.json({
            message: "Created successfully",
            addtosalary
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
        // console.log(error)
    }
});
exports.Createsalary = Createsalary;
const getallsalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getnowallsalary = yield prisma.salary.findMany();
        res.json({
            message: "Found successfully",
            result: [...getnowallsalary]
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.getallsalary = getallsalary;
const getonesalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.salary.findFirst({
            where: {
                id: +id
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
exports.getonesalary = getonesalary;
const deletesalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { id } = req.params;
        const getonejust = yield prisma.salary.findFirst({
            where: {
                id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the salary you applied"
            });
        }
        const justdeleteit = yield prisma.salary.delete({
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
exports.deletesalary = deletesalary;
const updatesalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const { Amount, method, TeacherPhone, TeacherName, teacherId } = req.body;
        const { id } = req.params;
        const getonejust = yield prisma.salary.findFirst({
            where: {
                id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the salary you applied"
            });
        }
        const justupdateit = yield prisma.salary.update({
            where: {
                id: +id
            },
            data: {
                Amount,
                teacherId,
                TeacherPhone,
                TeacherName,
                method
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
exports.updatesalary = updatesalary;
const trashsalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.salary.update({
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
exports.trashsalary = trashsalary;
const restoresalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.salary.update({
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
exports.restoresalary = restoresalary;
