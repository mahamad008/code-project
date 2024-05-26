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
exports.getOneCategoryCources = exports.recycle = exports.trash = exports.deletecategory = exports.removeCategory = exports.getOneCategory = exports.getAllCategories = exports.updateCategory = exports.createCategory = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// endpoint -> POST /api/category/new
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract necessary data from request body
        const { catName, catDescription, userId } = req.body;
        // Validate userId, ensure it's provided and not null
        if (!userId) {
            return res.status(400).json({ isSuccess: false, message: 'userId is required.' });
        }
        // Create new category with provided data
        const newCategory = yield prisma.category.create({
            data: {
                catName,
                catDescription,
                userId: +userId, // Use the userId obtained from request body
            },
        });
        // Send success response with created category
        res.json({
            isSuccess: true,
            result: Object.assign({}, newCategory),
        });
    }
    catch (error) {
        // Log and send error response if an error occurs
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: 'please try again',
        });
    }
});
exports.createCategory = createCategory;
// endpoint -> PUT /api/category/edit/:catId
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { catId } = req.params;
        const { catName, catDescription } = req.body;
        ;
        const updatingCategory = yield prisma.category.update({
            where: {
                catId: +catId,
            },
            data: {
                catName,
                catDescription
            }
        });
    }
    catch (error) {
        res.json({
            message: 'Failed to update the category ',
            isSuccess: false,
        });
        console.log(error);
    }
});
exports.updateCategory = updateCategory;
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.category.findMany({
            include: {
                Cource: true
            }
        });
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
exports.getAllCategories = getAllCategories;
const getOneCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { catId } = req.params;
        const searchingoneoflinecource = yield prisma.category.findFirst({
            where: {
                catId: +catId
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
        // return res.json({
        //     message:"Something went Wrong"
        // })
        console.log(error);
    }
});
exports.getOneCategory = getOneCategory;
// endpoint -> DELETE /api/category/remove/:catId -> soft delete
const removeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.category.update({
            where: {
                catId: +req.params.catId,
            },
            data: {
                isDeleted: true,
            },
        });
        res.json({
            isSuccess: true,
            message: 'Category deleted successfully!',
        });
    }
    catch (error) {
        res.json({
            isSuccess: false,
            message: 'Failed to delete category with the id of ' + req.params.id,
        });
    }
});
exports.removeCategory = removeCategory;
// endpoint -> DELETE /api/category/deleteAll
const deletecategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { catId } = req.params;
        const findingfrist = yield prisma.category.findFirst({
            where: {
                catId: +catId
            }
        });
        if (!findingfrist) {
            return res.json({
                message: "the category you are attempting to delet is not exist"
            });
        }
        if (findingfrist) {
            const deleteData = yield prisma.category.delete({
                where: {
                    catId: +catId
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
exports.deletecategory = deletecategory;
const trash = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updating = yield prisma.category.update({
            where: {
                catId: +id
            },
            data: {
                isDeleted: true
            }
        });
        // console.log(updating)
    }
    catch (error) {
        console.log(error);
    }
});
exports.trash = trash;
const recycle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updating = yield prisma.category.update({
            where: {
                catId: +id
            },
            data: {
                isDeleted: false
            }
        });
        res.json(updating);
        // console.log(updating)
    }
    catch (error) {
        console.log(error);
    }
});
exports.recycle = recycle;
const getOneCategoryCources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const find = yield prisma.category.findFirst({
            where: {
                catId: +id
            },
            include: {
                Cource: {
                    include: {
                        Enrollment: true,
                        Section: true,
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
exports.getOneCategoryCources = getOneCategoryCources;
