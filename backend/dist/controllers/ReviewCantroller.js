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
exports.updateReview = exports.findingreview = exports.deletereview = exports.getallreview = exports.createreview = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createreview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { corId, review, Name, Comment, UserId } = req.body;
        const newreview = yield prisma.review.create({
            data: {
                Name,
                Comment,
                corId,
                UserId
            },
        });
        return res.json(newreview);
    }
    catch (error) {
        res.status(400).json({
            message: "something went wrong"
        });
        console.log(error);
    }
});
exports.createreview = createreview;
const getallreview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin)
            return res.json({
                message: 'unauthorized'.toUpperCase(),
            });
        const allreviews = yield prisma.review.findMany();
        res.json({
            message: "Found Successfully",
            result: [...allreviews],
        });
    }
    catch (error) {
        res.json({
            message: "something went wrong"
        });
    }
});
exports.getallreview = getallreview;
const deletereview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletenow = yield prisma.review.delete({
            where: {
                id: parseInt(id)
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deletereview = deletereview;
const findingreview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.review.findFirst({
            where: {
                id: +id
            }
        });
        res.json(data);
    }
    catch (error) {
        return res.json({
            message: "something went wrong"
        });
    }
});
exports.findingreview = findingreview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { corId, review, Comment, UserId } = req.body;
        if (!corId || !review || !Comment || !UserId) {
            return res.json({
                message: "Please provide valid data"
            });
        }
        const updatingreview = yield prisma.review.update({
            where: {
                id: +id
            },
            data: {
                Comment,
                corId,
                UserId,
                review
            }
        });
        res.json(exports.updateReview);
    }
    catch (error) {
    }
});
exports.updateReview = updateReview;
