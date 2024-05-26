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
const TeacherRouter_1 = __importDefault(require("./routes/TeacherRouter"));
const SalaryRouter_1 = __importDefault(require("./routes/SalaryRouter"));
const StudentRouter_1 = __importDefault(require("./routes/StudentRouter"));
const CourceRouter_1 = __importDefault(require("./routes/CourceRouter"));
const ContactRouter_1 = __importDefault(require("./routes/ContactRouter"));
const CatogoryRouter_1 = __importDefault(require("./routes/CatogoryRouter"));
const FeeRouter_1 = __importDefault(require("./routes/FeeRouter"));
const ExamRouter_1 = __importDefault(require("./routes/ExamRouter"));
const CourceCantroller_1 = __importDefault(require("./controllers/CourceCantroller"));
const ReviewRouter_1 = __importDefault(require("./routes/ReviewRouter"));
const PaymentRoouter_1 = __importDefault(require("./routes/PaymentRoouter"));
const Oflineenrollmentrouter_1 = __importDefault(require("./routes/Oflineenrollmentrouter"));
const oflinecourcerouter_1 = __importDefault(require("./routes/oflinecourcerouter"));
const sectionrouter_1 = __importDefault(require("./routes/sectionrouter"));
const LessonCantroller_1 = __importDefault(require("./controllers/LessonCantroller"));
const Subcourceroter_1 = __importDefault(require("./routes/Subcourceroter"));
const LessonRouter_1 = __importDefault(require("./routes/LessonRouter"));
const Enrollment_1 = __importDefault(require("./routes/Enrollment"));
const OflineCategory_1 = __importDefault(require("./routes/OflineCategory"));
const QuizController_1 = __importDefault(require("./controllers/QuizController"));
const RequestpaymentRouter_1 = __importDefault(require("./routes/RequestpaymentRouter"));
const QuizRouter_1 = __importDefault(require("./routes/QuizRouter"));
const FeeMonth_1 = __importDefault(require("./routes/FeeMonth"));
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const cors_1 = __importDefault(require("cors"));
const TeacherRequest_1 = __importDefault(require("./routes/TeacherRequest"));
const body_parser_1 = __importDefault(require("body-parser")); // Import body-parser
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({
    allowedHeaders: ['Content-Type'],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
}));
app.use('/api/section', sectionrouter_1.default);
app.use('/api/quiz', QuizController_1.default);
app.use('/api/techerRequest', TeacherRequest_1.default);
app.use('/api/Feemonth', FeeMonth_1.default);
app.use('/api/quiz', QuizRouter_1.default);
app.use('/api/Request', RequestpaymentRouter_1.default);
app.use('/api/OflineCategory', OflineCategory_1.default);
app.use('/api/subcource', Subcourceroter_1.default);
app.use('/api/cor', CourceCantroller_1.default);
app.use('/api/oflinecource', oflinecourcerouter_1.default);
app.use('/api/ofllinenrollment', Oflineenrollmentrouter_1.default);
app.use('/api/review', ReviewRouter_1.default);
app.use('/api/Fee', FeeRouter_1.default);
app.use('/api/user', userRoute_1.default);
app.use('/api/Teacher', TeacherRouter_1.default);
app.use('/api/category', CatogoryRouter_1.default);
app.use('/api/Salary', SalaryRouter_1.default);
app.use('/api/student', StudentRouter_1.default);
app.use('/api/cource', CourceRouter_1.default);
app.use('/api/contact', ContactRouter_1.default);
app.use('/api/onlineEnrollment', Enrollment_1.default);
app.use('/api/payment', PaymentRoouter_1.default);
app.use('/api/exam', ExamRouter_1.default);
app.use('/api/lesson', LessonCantroller_1.default);
app.use('/api/lesson', LessonRouter_1.default);
app.listen(5000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Serving on port 5000');
    try {
        // await seedData();
        console.log('========== USERS SEEDED ========');
    }
    catch (error) {
        console.error('Error seeding data:', error);
    }
}));
