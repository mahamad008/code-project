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
exports.getQuizById = exports.createQuiz = exports.getAllQuizzes = exports.createOption = exports.createQuestion = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Quiz = (0, express_1.default)();
Quiz.use(express_1.default.json());
Quiz.get('/quizzes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield prisma.quiz.findMany({
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });
        res.json(quizzes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
Quiz.get('/quizzes/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const quizzes = yield prisma.quiz.findFirst({
            where: {
                id: +id
            },
            include: {
                questions: {
                    include: {
                        options: true,
                    },
                },
            },
        });
        res.json(quizzes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}));
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, quizId } = req.body;
    try {
        const question = yield prisma.question.create({
            data: {
                text,
                quiz: { connect: { id: quizId } },
            },
        });
        res.json(question);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createQuestion = createQuestion;
const createOption = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text, isCorrect, questionId } = req.body;
    try {
        const option = yield prisma.option.create({
            data: {
                text,
                isCorrect,
                questionId,
            },
        });
        res.json(option);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createOption = createOption;
const getAllQuizzes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield prisma.quiz.findMany();
        res.json(quizzes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getAllQuizzes = getAllQuizzes;
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, Totalscore, totalscoreEarned, courseId } = req.body;
    try {
        const quiz = yield prisma.quiz.create({
            data: {
                title,
                description,
                Totalscore,
                totalscoreEarned,
                courseId,
            },
        });
        res.json(quiz);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createQuiz = createQuiz;
const getQuizById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const quiz = yield prisma.quiz.findUnique({
            where: { id: parseInt(id) },
            include: { questions: { include: { options: true } } },
        });
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getQuizById = getQuizById;
exports.default = Quiz;
