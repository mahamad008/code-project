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
exports.updatePermission = exports.restoreuser = exports.trashuser = exports.teacherdashboard = exports.chartday = exports.yearchart = exports.chartinfouser = exports.studentlesson = exports.getoneTeacherDashboardcource = exports.chatruser = exports.findinguser = exports.deleteuser = exports.getAllUsers = exports.login = exports.registerUser = exports.forgotPassword = exports.removeAdmin = exports.makeAdmin = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const otp_generator_1 = __importDefault(require("otp-generator"));
// import nodemailer from 'nodemailer';
const nodemailer_1 = __importDefault(require("nodemailer"));
const jwt_1 = require("../helpers/security/jwt");
const prisma = new client_1.PrismaClient();
const makeAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isAdmin } = req.body;
        const { id } = req.params;
        const FindFirst = yield prisma.user.findFirst({
            where: {
                id: +id
            }
        });
        if (!FindFirst) {
            return res.json({
                message: "user not found"
            });
        }
        const updateuser = yield prisma.user.update({
            where: {
                id: +id
            },
            data: {
                isAdmin: !isAdmin
            }
        });
        res.json(updateuser);
    }
    catch (error) {
    }
});
exports.makeAdmin = makeAdmin;
const removeAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isAdmin } = req.body;
        const { id } = req.params;
        const FindFirst = yield prisma.user.findFirst({
            where: {
                id: +id
            }
        });
        if (!FindFirst) {
            return res.json({
                message: "user not found"
            });
        }
        const updateuser = yield prisma.user.update({
            where: {
                id: +id
            },
            data: {
                isAdmin: false
            }
        });
        res.json(updateuser);
    }
    catch (error) {
    }
});
exports.removeAdmin = removeAdmin;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                isSuccess: false,
                message: 'Please provide an email address.',
            });
        }
        // Check if the user exists
        const user = yield prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (!user) {
            return res.status(404).json({
                isSuccess: false,
                message: 'User not found.',
            });
        }
        // Generate a random OTP
        const otp = otp_generator_1.default.generate(6, {
            digits: true,
            specialChars: false,
        });
        // Store the OTP in the user's record or send it via email or SMS
        // For demonstration purposes, we'll assume the OTP is stored in the user's record
        // await prisma.user.update({
        //   where: {
        //     id: user.id,
        //   },
        //   // data: {
        //   //   passwordResetOTP: otp,
        //   //   passwordResetExpiration: new Date(Date.now() + 15 * 60000), // Set expiration to 15 minutes from now
        //   // },
        // });
        // Send the OTP to the user via email or SMS (implementation not provided)
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'gaadhgagaadh@gmail.com',
                pass: '1234!@#$',
            },
        });
        // Compose the email
        const mailOptions = {
            from: 'gaadhgagaadh@gmail.com',
            to: 'recipient@example.com', // Replace with the actual recipient email address
            subject: 'New Form Submission',
            text: 'The text message you want to send',
        };
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            }
            else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.json({
            message: 'OTP sent successfully.',
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: 'Something went wrong.',
        });
    }
});
exports.forgotPassword = forgotPassword;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, givenName, username } = req.body;
        if (!email || !password || !givenName) {
            let error = {
                message: 'Please provide valid data',
            };
            return res.status(400).json(error);
        }
        // Check if the email or username already exists
        const checkEmail = yield prisma.user.findFirst({
            where: {
                email,
            },
        });
        const checkUsername = yield prisma.user.findFirst({
            where: {
                username,
            },
        });
        if (checkEmail) {
            return res.status(400).json({
                isSuccess: false,
                message: 'Email is already taken.',
            });
        }
        if (checkUsername) {
            return res.status(400).json({
                isSuccess: false,
                message: 'Username is already taken.',
            });
        }
        // Hash the password
        const hash = bcryptjs_1.default.hashSync(password);
        // Register the user
        const newUser = yield prisma.user.create({
            data: {
                email,
                password: hash,
                givenName,
                username,
                isAdmin: email === 'mahamdabdihassan008@gmail.com' || email === 'Cadnaanismaacillmuse8800@gmail.com',
            },
        });
        return res.json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            isSuccess: false,
            message: 'Something went wrong.',
        });
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            isSuccess: false,
            message: 'Please provide login credentials',
        });
    }
    // Check if the user exists
    const user = yield prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    if (!user) {
        return res.status(401).json({
            isSuccess: false,
            message: 'Invalid credentials.',
        });
    }
    // Compare the passwords
    const checkPassword = bcryptjs_1.default.compareSync(password, user.password);
    if (!checkPassword) {
        return res.status(401).json({
            isSuccess: false,
            message: 'Invalid credentials.',
        });
    }
    // Generate token
    const token = (0, jwt_1.generateToken)({
        username: user.username,
        givenName: user.givenName,
        isAdmin: user.isAdmin,
        userId: user.id,
    });
    const result = {
        givenName: user.givenName,
        id: user.id,
        isPaid: user.isPaid,
        username: user.username,
        isAdmin: user.isAdmin,
        joinedAt: user.joinedAt,
        token: token,
        isTeacher: user.isTeacher
    };
    res.json({
        message: 'Login successfully',
        result,
    });
});
exports.login = login;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
        // });
        const allUsers = yield prisma.user.findMany();
        res.json({
            message: "Found Successfully",
            result: [...allUsers],
        });
    }
    catch (error) {
        // res.json({
        //    message:"something went wrong"
        // });
        console.log(error);
    }
});
exports.getAllUsers = getAllUsers;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletenow = yield prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteuser = deleteuser;
const findinguser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield prisma.user.findFirst({
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
exports.findinguser = findinguser;
const chatruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        const chartData = users.map((user) => ({
            givenName: user.givenName,
            // count: user.id.k,
            registerDate: user.joinedAt,
        }));
        res.json(chartData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.chatruser = chatruser;
const getoneTeacherDashboardcource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const finding = yield prisma.user.findFirst({
            where: {
                id: +id
            },
            include: {
                Cource: {
                    select: {
                        CategoryId: true,
                        content: true,
                        imageUrl: true,
                        videoUrl: true,
                        idcource: true,
                        title: true,
                        Section: {
                            select: {
                                courseId: true,
                                description: true,
                                id: true,
                                title: true,
                                lessons: true
                            }
                        }
                    }
                }
            }
        });
        res.json(finding === null || finding === void 0 ? void 0 : finding.Cource);
        // Rest of your code...
    }
    catch (error) {
        // Handle the error
    }
});
exports.getoneTeacherDashboardcource = getoneTeacherDashboardcource;
const studentlesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findinglessonstudent = yield prisma.user.findFirst({
            where: {
                id: +id
            },
            include: {
                Enrollment: {
                    where: {
                        Isconfirm: true
                    },
                    include: {
                        Cource: true
                    }
                }
            }
        });
        res.json(findinglessonstudent.Enrollment);
    }
    catch (error) {
    }
});
exports.studentlesson = studentlesson;
const chartinfouser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const latestRegisteredUsers = yield prisma.user.findMany({
        orderBy: { joinedAt: 'desc' },
        take: 10, // Adjust the number of users to retrieve as needed
    });
    res.json(latestRegisteredUsers);
});
exports.chartinfouser = chartinfouser;
const yearchart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year } = req.params;
    try {
        const userData = yield prisma.user.findMany({
            where: {
                joinedAt: {
                    gte: new Date(`${year}-01-01`),
                    lt: new Date(`${Number(year) + 1}-01-01`),
                },
            },
            select: {
                joinedAt: true,
            },
        });
        const chartData = generateChartData(userData);
        res.json(chartData);
    }
    catch (error) {
        console.error('Error fetching chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.yearchart = yearchart;
const generateChartData = (userData) => {
    const chartData = [];
    for (let month = 1; month <= 12; month++) {
        const monthName = new Date(0, month - 1).toLocaleString('default', { month: 'long' });
        const usersCount = userData.filter((user) => user.joinedAt.getMonth() === month - 1 && user.joinedAt.getFullYear() === new Date().getFullYear()).length;
        chartData.push({ name: `${monthName}`, users: usersCount });
    }
    return chartData;
};
const chartday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chartData = yield prisma.user.groupBy({
            by: ['joinedAt'],
            _count: {
                joinedAt: true,
            },
        });
        res.json(chartData);
    }
    catch (error) {
        console.error('Failed to fetch chart data', error);
        res.status(500).json({ error: 'Failed to fetch chart data' });
    }
});
exports.chartday = chartday;
const teacherdashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const finding = yield prisma.user.findFirst({
            where: {
                id: +id
            },
            include: {
                Cource: {
                    select: {
                        title: true,
                        idcource: true,
                        price: true,
                        Enrollment: true,
                        review: true
                    },
                }
            }
        });
        res.json(finding);
    }
    catch (error) {
    }
});
exports.teacherdashboard = teacherdashboard;
const trashuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.user.update({
            where: {
                id: +id
            },
            data: {
                IsDeleted: true
            }
        });
    }
    catch (error) {
    }
});
exports.trashuser = trashuser;
const restoreuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.user.update({
            where: {
                id: +id
            },
            data: {
                IsDeleted: false
            }
        });
    }
    catch (error) {
    }
});
exports.restoreuser = restoreuser;
const updatePermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { isAdmin } = req.body;
        const upd = yield prisma.user.update({
            where: {
                id: +id
            },
            data: {
                isAdmin
            }
        });
        res.json(upd);
    }
    catch (error) {
    }
});
exports.updatePermission = updatePermission;
