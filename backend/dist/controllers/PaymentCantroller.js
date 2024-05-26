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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.restorepayment = exports.trashpayment = exports.deleteall = exports.gettotalpayment = exports.getallpayment = exports.getPayment = exports.createPayment = void 0;
const client_1 = require("@prisma/client");
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, token, enrollmentId, UserId } = req.body;
    try {
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: amount * 100, // Stripe expects the amount in cents
            currency: 'usd',
            payment_method_types: ['card'],
        });
        // Save the payment details to the database using Prisma
        const payment = yield prisma.payment.create({
            data: {
                amount: +amount,
                status: 'succeeded',
                enrolmentId: +enrollmentId,
                token: token.id,
            },
        });
        yield prisma.enrollment.update({
            where: {
                id: +enrollmentId,
            },
            data: {
                Isconfirm: true,
            },
        });
        res.json({
            clientSecret: paymentIntent.client_secret,
            payment,
        });
    }
    catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Payment creation failed' });
    }
});
exports.createPayment = createPayment;
const getPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const payment = yield prisma.payment.findUnique({
            where: { id: Number(id) }
        });
        if (payment) {
            res.json(payment);
        }
        else {
            res.status(404).json({ error: 'Payment not found' });
        }
    }
    catch (error) {
        console.error('Error retrieving payment:', error);
        // res.status(500).json({ error: 'Payment retrievalI apologize for the incomplete response. Please find the complete implementation of the payment API using Stripe, Node.js, Express, TypeScript, and Prisma below:})
    }
});
exports.getPayment = getPayment;
const getallpayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findingmanypayment = yield prisma.payment.findMany();
        res.json(findingmanypayment);
    }
    catch (error) {
    }
});
exports.getallpayment = getallpayment;
const gettotalpayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalResult = yield prisma.payment.aggregate({
            _sum: {
                amount: true,
            },
        });
        const totalAmount = totalResult._sum.amount;
        res.json({ totalAmount });
    }
    catch (error) {
    }
});
exports.gettotalpayment = gettotalpayment;
const deleteall = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dl = yield prisma.payment.deleteMany();
        res.json(dl);
    }
    catch (error) {
    }
});
exports.deleteall = deleteall;
const trashpayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.payment.update({
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
exports.trashpayment = trashpayment;
const restorepayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.payment.update({
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
exports.restorepayment = restorepayment;
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletepaymentnow = yield prisma.payment.delete({
            where: {
                id: +id
            }
        });
        res.json(exports.deletePayment);
    }
    catch (error) {
    }
});
exports.deletePayment = deletePayment;
