"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// generate token
const generateToken = (user) => {
    const payload = user;
    return jsonwebtoken_1.default.sign(payload, 'SECRET_KEY_123##', {
        expiresIn: '1m',
    });
};
exports.generateToken = generateToken;
// Decode token
const decodeToken = (req, res, next) => {
    var _a, _b;
    try {
        const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.startsWith('Bearer')) && ((_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1]);
        if (!token)
            return res.json({
                isSuccess: false,
                message: 'unauthorized'.toUpperCase(),
            });
        const decode = jsonwebtoken_1.default.verify(token, 'SECRET_KEY_123##');
        req.user = Object.assign({}, decode);
        next();
    }
    catch (error) {
        res.json({
            isSuccess: false,
            message: 'unauthorized'.toUpperCase(),
        });
    }
};
exports.decodeToken = decodeToken;
