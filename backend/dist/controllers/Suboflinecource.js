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
exports.restorsubcource = exports.trashsubcource = exports.getonesubcource = exports.getallsubcource = exports.deletesubcource = exports.updatesubcource = exports.Registersubcource = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Registersubcource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Title, OflinecourceId, userId, Description } = req.body;
        const newregiter = yield prisma.subcource.create({
            data: {
                Description,
                Title,
                //  OflinecourceId
                userId: +userId,
                OflinecourceId: +OflinecourceId
            }
        });
        res.json({
            message: "created successfully",
            newregiter
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.Registersubcource = Registersubcource;
const updatesubcource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { Title, OflinecourceId, Description } = req.body;
        const finding = yield prisma.subcource.findFirst({
            where: {
                SubcourceId: +id
            }
        });
        if (finding) {
            const updating = yield prisma.subcource.update({
                where: {
                    SubcourceId: +id
                },
                data: {
                    Description,
                    OflinecourceId,
                    Title
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
exports.updatesubcource = updatesubcource;
const deletesubcource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findingdeletinId = yield prisma.subcource.findFirst({
            where: {
                SubcourceId: +id
            }
        });
        if (findingdeletinId) {
            const deleteonesubcource = yield prisma.subcource.delete({
                where: {
                    SubcourceId: +id
                }
            });
            res.json({
                message: "Deleted successfully",
                deleteonesubcource
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.deletesubcource = deletesubcource;
const getallsubcource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subcources = yield prisma.subcource.findMany();
        res.json({
            isSuccess: true,
            result: [...subcources],
        });
    }
    catch (error) {
        res.json({
            isSuccess: false,
            message: 'Failed to fetch the categories data',
        });
    }
});
exports.getallsubcource = getallsubcource;
const getonesubcource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const searchingoneoflinecource = yield prisma.subcource.findFirst({
            where: {
                SubcourceId: +id
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
exports.getonesubcource = getonesubcource;
const trashsubcource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.subcource.update({
            where: {
                SubcourceId: +id
            },
            data: {
                isDeleted: true
            }
        });
    }
    catch (error) {
    }
});
exports.trashsubcource = trashsubcource;
const restorsubcource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.subcource.update({
            where: {
                SubcourceId: +id
            },
            data: {
                isDeleted: false
            }
        });
    }
    catch (error) {
    }
});
exports.restorsubcource = restorsubcource;
