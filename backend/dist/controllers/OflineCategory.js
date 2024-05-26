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
exports.retoreoflinecatgory = exports.trashoflinecategory = exports.deleteOflineCategory = exports.getOneOflineCategory = exports.getAlloflineCategories = exports.updateOflineCategory = exports.createOflineCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createOflineCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OflineCatName, userId, oflineCatDescription } = req.body;
        const createregiter = yield prisma.oflineCategory.create({
            data: {
                OflineCatName,
                oflineCatDescription,
                userId: +userId,
            }
        });
        res.json(createregiter);
    }
    catch (error) {
        console.log(error);
        res.json({
            isSuccess: false,
            message: 'Failed to create new OflineCategory',
        });
    }
});
exports.createOflineCategory = createOflineCategory;
// endpoint -> PUT /api/OflineCategory/edit/:catId
const updateOflineCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OflineCatId } = req.params;
        const { oflineCatDescription, OflineCatName } = req.body;
        ;
        const updatingOflineCategory = yield prisma.oflineCategory.update({
            where: {
                OflineCatId: +OflineCatId,
            },
            data: {
                oflineCatDescription,
                OflineCatName
            }
        });
        res.json(updatingOflineCategory);
    }
    catch (error) {
        res.json({
            message: 'Failed to update the OflineCategory ',
            isSuccess: false,
        });
        console.log(error);
    }
});
exports.updateOflineCategory = updateOflineCategory;
const getAlloflineCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.oflineCategory.findMany();
        res.json({
            isSuccess: true,
            result: [...categories],
        });
    }
    catch (error) {
        res.json({
            isSuccess: false,
            message: 'Failed to fetch the categories data',
        });
        console.log(error);
    }
});
exports.getAlloflineCategories = getAlloflineCategories;
const getOneOflineCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OflineCatId } = req.params;
        const searchingoneoflineCategory = yield prisma.oflineCategory.findFirst({
            where: {
                OflineCatId: +OflineCatId
            }
        });
        if (!searchingoneoflineCategory) {
            return res.json({
                message: "The oflineCategory your are searching doesn't exist"
            });
        }
        if (searchingoneoflineCategory) {
            return res.json(searchingoneoflineCategory);
        }
    }
    catch (error) {
        // return res.json({
        //     message:"Something went Wrong"
        // })
        console.log(error);
    }
});
exports.getOneOflineCategory = getOneOflineCategory;
// endpoint -> DELETE /api/OflineCategory/remove/:catId -> soft delete
// endpoint -> DELETE /api/OflineCategory/deleteAll
const deleteOflineCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { OflineCatId } = req.params;
        const findingfrist = yield prisma.oflineCategory.findFirst({
            where: {
                OflineCatId: +OflineCatId
            }
        });
        if (!findingfrist) {
            return res.json({
                message: "the OflineCategory you are attempting to delete does not exist"
            });
        }
        if (findingfrist) {
            const deleteData = yield prisma.oflineCategory.delete({
                where: {
                    OflineCatId: +OflineCatId
                }
            });
            return res.json({
                message: "Deleted successfully",
                deleteData
            });
        }
    }
    catch (error) {
    }
});
exports.deleteOflineCategory = deleteOflineCategory;
const trashoflinecategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.oflineCategory.update({
            where: {
                OflineCatId: +id
            },
            data: {
                isDeleted: true
            }
        });
    }
    catch (error) {
    }
});
exports.trashoflinecategory = trashoflinecategory;
const retoreoflinecatgory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.oflineCategory.update({
            where: {
                OflineCatId: +id
            },
            data: {
                isDeleted: false
            }
        });
    }
    catch (error) {
    }
});
exports.retoreoflinecatgory = retoreoflinecatgory;
