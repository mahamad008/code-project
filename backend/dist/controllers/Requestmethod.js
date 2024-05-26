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
exports.confirmrequest = exports.restoreRequest = exports.trashrequest = exports.deleterequest = exports.getallRequestpayment = exports.createRequestPayment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createRequestPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { AccountNumber, Amount, chanel, id, corId, Description, Method } = req.body;
    try {
        const newrequest = yield prisma.requestPayment.create({
            data: {
                AccountNumber,
                Amount: +Amount,
                chanel,
                corId: +corId,
                id,
                Description,
                Method
            }
        });
        res.json(newrequest);
    }
    catch (error) {
        console.log(error);
    }
});
exports.createRequestPayment = createRequestPayment;
const getallRequestpayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getallpayments = yield prisma.requestPayment.findMany();
        res.json(getallpayments);
    }
    catch (error) {
    }
});
exports.getallRequestpayment = getallRequestpayment;
const deleterequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleting = yield prisma.requestPayment.delete({
            where: {
                Requstpaymentid: +id
            }
        });
        res.json(deleting);
    }
    catch (error) {
    }
});
exports.deleterequest = deleterequest;
const trashrequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleting = yield prisma.requestPayment.update({
            where: {
                Requstpaymentid: +id
            },
            data: {
                isDeleted: true
            }
        });
        res.json(deleting);
    }
    catch (error) {
    }
});
exports.trashrequest = trashrequest;
const restoreRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleting = yield prisma.requestPayment.update({
            where: {
                Requstpaymentid: +id
            },
            data: {
                isDeleted: false
            }
        });
        res.json(deleting);
    }
    catch (error) {
    }
});
exports.restoreRequest = restoreRequest;
const confirmrequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Requstpaymentid } = req.params;
        yield prisma.requestPayment.update({
            where: {
                Requstpaymentid: +Requstpaymentid
            },
            data: {
                isconfirmed: true
            }
        });
    }
    catch (error) {
    }
});
exports.confirmrequest = confirmrequest;
