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
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    const password = bcryptjs_1.default.hashSync('Pa$$w0rd', 10);
    yield prisma.user.createMany({
        data: [
            {
                email: 'Cadnaanismaacillmuse8800@gmail.com',
                password: password,
                isAdmin: true,
                givenName: 'cadnaan',
                username: 'cadnaan',
            },
            {
                email: 'mahamdabdihassan008@gmail.com',
                password: password,
                isAdmin: true,
                givenName: 'mohamedabdi',
                username: 'mohamed009',
            },
        ],
    });
});
exports.default = seedData;
