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
exports.UnpaidStudents = exports.paidStudents = exports.StudentOwemoney = exports.GetstudentEnrollments = exports.balanceStudent = exports.FeeStudent = exports.GetoneExamStudent = exports.restorestudent = exports.trashstudent = exports.updatestudent = exports.deletestudentdata = exports.student = exports.getonestudent = exports.getonlyonestudent = exports.getallstudent = exports.Createstudent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Createstudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, userId, Address, phone, } = req.body;
        if (!Name) {
            return res.json({
                message: "please provide valid data"
            });
        }
        const justdoing = yield prisma.student.create({
            data: {
                Address,
                Name,
                phone,
                userId: +userId
            }
        });
        res.json({
            message: "Created successfully",
            justdoing
        });
    }
    catch (error) {
    }
});
exports.Createstudent = Createstudent;
const getallstudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getnowallstudent = yield prisma.student.findMany();
        res.json({
            message: "Found successfully",
            result: [...getnowallstudent]
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.getallstudent = getallstudent;
const getonlyonestudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const finding = yield prisma.student.findFirst({
            where: {
                Id: +id
            }
        });
        res.json(finding);
    }
    catch (error) {
    }
});
exports.getonlyonestudent = getonlyonestudent;
const getonestudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.params;
        const data = yield prisma.student.findFirst({
            where: {
                phone: phone
            },
            include: {
                Exam: {
                    select: {
                        CourceName: true,
                        Total: true,
                        Studentname: true,
                        // SubcourceId:true,
                        Totalscore: true,
                        studentPhone: true,
                    }
                }
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
exports.getonestudent = getonestudent;
const student = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.params;
        const finding = yield prisma.student.findFirst({
            where: {
                phone: phone
            }
        });
        res.json(finding);
    }
    catch (error) {
    }
});
exports.student = student;
const deletestudentdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const justdeleteit = yield prisma.student.delete({
            where: {
                Id: parseInt(id), // Convert Id to an integer
            },
        });
        res.json(justdeleteit);
    }
    catch (error) {
        return res.json({
            message: "something went wrong",
        });
    }
});
exports.deletestudentdata = deletestudentdata;
const updatestudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Address, Name, phone, } = req.body;
        const { id } = req.params;
        const getonejust = yield prisma.student.findFirst({
            where: {
                Id: +id
            }
        });
        const justupdateit = yield prisma.student.update({
            where: {
                Id: +id
            },
            data: {
                Name,
                phone,
                Address,
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
exports.updatestudent = updatestudent;
const trashstudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.student.update({
            where: {
                Id: +id
            },
            data: {
                isDeleted: true
            }
        });
    }
    catch (error) {
    }
});
exports.trashstudent = trashstudent;
const restorestudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.student.update({
            where: {
                Id: +id
            },
            data: {
                isDeleted: false
            }
        });
    }
    catch (error) {
    }
});
exports.restorestudent = restorestudent;
const GetoneExamStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getonejust = yield prisma.student.findFirst({
            where: {
                Id: +id
            },
            include: {
                Exam: true
            }
        });
        res.json(getonejust === null || getonejust === void 0 ? void 0 : getonejust.Exam);
    }
    catch (error) {
    }
});
exports.GetoneExamStudent = GetoneExamStudent;
const FeeStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const find = yield prisma.student.findFirst({
            where: {
                Id: +id
            },
            include: {
                Fee: true
            }
        });
        res.json(find === null || find === void 0 ? void 0 : find.Fee);
    }
    catch (error) {
        return res.status(401).json({ message: "something went wrong please try again" });
    }
});
exports.FeeStudent = FeeStudent;
const balanceStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const find = yield prisma.student.findFirst({
            where: {
                Id: +id,
                Fee: {
                    some: {
                        Balance: {
                            gt: 0
                        }
                    }
                }
            },
            include: {
                Fee: true
            }
        });
        res.json(find === null || find === void 0 ? void 0 : find.Fee);
    }
    catch (error) {
        return res.status(401).json({ message: "something went wrong please try again" });
    }
});
exports.balanceStudent = balanceStudent;
const GetstudentEnrollments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const search = yield prisma.student.findFirst({
            where: {
                Id: +id
            },
            include: {
                oflineenrollment: true
            }
        });
        res.json(search === null || search === void 0 ? void 0 : search.oflineenrollment);
    }
    catch (error) {
        return res.status(401).json({
            message: "something went wrong please try again"
        });
    }
});
exports.GetstudentEnrollments = GetstudentEnrollments;
const StudentOwemoney = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield prisma.student.findMany({
            where: {
                isDeleted: false,
                Fee: {
                    some: {
                        Balance: {
                            gt: 0
                        }
                    }
                }
            },
            include: {
                Fee: {
                    select: {
                        Balance: true
                    }
                }
            }
        });
        res.json(find);
    }
    catch (error) {
        return res.status(404).json({ message: "something went wrong please try again" });
    }
});
exports.StudentOwemoney = StudentOwemoney;
const paidStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { FeeId, courceId } = req.params;
        const find = yield prisma.student.findMany({
            where: {
                Fee: {
                    some: {
                        feeMonthId: +FeeId
                    }
                },
                oflineenrollment: {
                    some: {
                        OflinecourceId: +courceId
                    }
                }
            }
        });
        res.json(find);
    }
    catch (error) {
        return res.status(404).json({ message: "someting went wrong please try agin" });
    }
});
exports.paidStudents = paidStudents;
const UnpaidStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { FeeId, courceId } = req.params;
        const find = yield prisma.student.findMany({
            where: {
                Fee: {
                    none: {
                        feeMonthId: +FeeId
                    }
                },
                oflineenrollment: {
                    some: {
                        OflinecourceId: +courceId
                    }
                }
            }
        });
        res.json(find);
    }
    catch (error) {
        return res.status(404).json({ message: "someting went wrong please try agin" });
    }
});
exports.UnpaidStudents = UnpaidStudents;
