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
exports.createPayment = void 0;
const stripe_1 = __importDefault(require("stripe"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
});
const createPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, method, courseId, userId } = req.body;
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: amount * 100, // Amount in cents
            currency: 'usd',
        });
        // const payment = await prisma.payment.create({
        //   data: {
        //     amount: amount,
        //     UserId:userId,
        //     // balance: 0,
        //     // Total: amount,
        //     status: 'Completed',
        //     CourseId: courseId,
        //     // userId,
        //   },
        // });
        // res.status(200).json({ clientSecret: paymentIntent.client_secret, payment });
    }
    catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});
exports.createPayment = createPayment;
