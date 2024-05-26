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
exports.TeacherOfflineStudent = exports.TeacherSalary = exports.restoreteacher = exports.trashteacher = exports.updateteacher = exports.deleteteacher = exports.getoneteacher = exports.getallteacher = exports.Createteacher = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Createteacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, password, userId, method, phone, Amount, courceId } = req.body;
        if (!Name || !phone || !Amount) {
            return res.json({
                message: "Failed to create new ther"
            });
        }
        const addtoteacher = yield prisma.teacher.create({
            data: {
                Name,
                phone,
                Amount,
                method,
                userId: 1,
                password
                //    courceId
            }
        });
        res.json({
            message: "Created successfully",
            addtoteacher
        });
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.Createteacher = Createteacher;
// export const getallteacher =async(req:Request,res:Response)=>{
//     try {
//         const getnowallteacher =await prisma.teacher.findMany()
//         res.json({
//             message:"Found successfully",
//             getnowallteacher
//         })
//     } catch (error) {
//         return res.json({
//             message:"something went wrong"
//         })  
//     }
// }
const getallteacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Teachers = yield prisma.teacher.findMany();
        res.json({
            isSuccess: true,
            result: [...Teachers],
        });
    }
    catch (error) {
        //   res.json({
        //     isSuccess: false,
        //     message: 'Failed to fetch the Teachers data',
        //   });
        console.log(error);
    }
});
exports.getallteacher = getallteacher;
const getoneteacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.teacher.findFirst({
            where: {
                Id: +id,
            },
        });
        res.json(data);
    }
    catch (error) { }
});
exports.getoneteacher = getoneteacher;
const deleteteacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const getonejust = yield prisma.teacher.findFirst({
            where: {
                Id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the teacher you applied"
            });
        }
        const justdeleteit = yield prisma.teacher.delete({
            where: {
                Id: +id
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
exports.deleteteacher = deleteteacher;
const updateteacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, phone, Amount, password } = req.body;
        const { id } = req.params;
        const getonejust = yield prisma.teacher.findFirst({
            where: {
                Id: +id
            }
        });
        if (!getonejust) {
            return res.json({
                message: "is not exist the teacher you applied"
            });
        }
        const justupdateit = yield prisma.teacher.update({
            where: {
                Id: +id
            },
            data: {
                Name,
                phone, Amount, password
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
exports.updateteacher = updateteacher;
const trashteacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.teacher.update({
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
exports.trashteacher = trashteacher;
const restoreteacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.teacher.update({
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
exports.restoreteacher = restoreteacher;
const TeacherSalary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resp = yield prisma.teacher.findFirst({
            where: {
                Id: +id
            },
            include: {
                salary: true
            }
        });
        res.json(resp);
    }
    catch (error) {
    }
});
exports.TeacherSalary = TeacherSalary;
const TeacherOfflineStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { password, phone } = req.params;
        const findData = yield prisma.teacher.findFirst({
            where: {
                password,
                phone
            },
            include: {
                oflinecources: {
                    include: {
                        oflineenrollment: {
                            include: {
                                Student: true
                            }
                        }
                    }
                }
            }
        });
        // Extracting student data
        const students = (_a = findData === null || findData === void 0 ? void 0 : findData.oflinecources) === null || _a === void 0 ? void 0 : _a.flatMap(course => course.oflineenrollment.map(enrollment => enrollment.Student));
        res.json(students);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.TeacherOfflineStudent = TeacherOfflineStudent;
