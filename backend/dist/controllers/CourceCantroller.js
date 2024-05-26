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
exports.couceDeletedList = exports.courList = exports.Latestcources = exports.restorecource = exports.trashcource = exports.deletecource = exports.PuplishCource = exports.getoncource = exports.courceONLINE = exports.cources = exports.CreateCourceOnline = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const client_1 = require("@prisma/client");
const cloudinary_1 = __importDefault(require("cloudinary"));
const H = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
cloudinary_1.default.v2.config({
    cloud_name: "ddshdxyic",
    api_key: "965251129372819",
    api_secret: "WxzKbgswj2SNfEFDRxuwU8GhW1A",
});
// Configure multer for file uploads
const storage = multer_1.default.diskStorage({});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB limit
});
const CreateCourceOnline = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    if (!files || !files['videoUrl'] || !files['imageUrl']) {
        return res.status(400).json({ message: 'Both video and image files are required' });
    }
    try {
        const videoFiles = files['videoUrl'];
        const imageFiles = files['imageUrl'];
        const videoFile = videoFiles === null || videoFiles === void 0 ? void 0 : videoFiles[0];
        const imageFile = imageFiles === null || imageFiles === void 0 ? void 0 : imageFiles[0];
        if (!videoFile || !imageFile) {
            return res.status(400).json({ message: 'Video or image file not found' });
        }
        const timestamp = Math.floor(Date.now() / 1000); // Set the timestamp to the current time
        const videoUploadPromise = cloudinary_1.default.v2.uploader.upload(videoFile.path, {
            resource_type: 'video',
            format: "mp4",
            timestamp,
        });
        const imageUploadPromise = cloudinary_1.default.v2.uploader.upload(imageFile.path, {
            resource_type: 'image',
            timestamp,
        });
        const [videoUploadResult, imageUploadResult] = yield Promise.all([videoUploadPromise, imageUploadPromise]);
        const { secure_url: videoUrlsecure } = videoUploadResult;
        const { secure_url: imageUrl } = imageUploadResult;
        // Save the video URL, image URL, and other fields to the database or perform any other necessary action
        // Example: Save it using Prisma
        const { content, Shortdescription, title, price, id, CategoryId } = req.body;
        const createdCourse = yield prisma.cource.create({
            data: {
                videoUrl: videoUrlsecure,
                imageUrl,
                Shortdescription,
                content,
                id: +id,
                title,
                price,
                CategoryId: +CategoryId,
            },
        });
        res.json(createdCourse);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to upload video or image' });
    }
});
exports.CreateCourceOnline = CreateCourceOnline;
const cources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getNowAllCources = yield prisma.cource.findMany({
            include: {
                Section: {
                    select: {
                        title: true,
                        courseId: true,
                        lessons: {
                            select: {
                                title: true,
                                videoUrl: true,
                            }
                        }
                    }
                }
            }
        });
        res.json({
            message: 'Found successfully',
            result: [...getNowAllCources],
        });
    }
    catch (error) {
        return res.json({
            message: 'Something went wrong',
        });
        console.log(error);
    }
});
exports.cources = cources;
const courceONLINE = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findcource = yield prisma.cource.findFirst({
            where: {
                idcource: +id
            }
        });
        res.json(findcource);
    }
    catch (error) {
    }
});
exports.courceONLINE = courceONLINE;
const getoncource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idcource } = req.params;
        const finding = yield prisma.cource.findFirst({
            where: {
                idcource: +idcource
            },
            include: {
                Section: {
                    select: {
                        title: true,
                        courseId: true,
                        lessons: {
                            select: {
                                title: true,
                                videoUrl: true,
                            },
                        }
                    }
                },
                Enrollment: true,
                review: {
                    select: {
                        Comment: true,
                        review: true,
                    }
                },
                quiz: {
                    include: {
                        questions: {
                            include: {
                                options: true
                            }
                        }
                    }
                }
            }
        });
        if (!finding) {
            return res.json({
                message: "this cource doesn't exist"
            });
        }
        res.json(finding);
    }
    catch (error) {
    }
});
exports.getoncource = getoncource;
// H.put('/update/:id', async (req: Request, res: Response)
const PuplishCource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idcource } = req.params;
        const { isPublished } = req.body;
        // Convert idcource to a number
        // const idcource = parseInt(idcource, 10);
        // Find the cource by ID
        const cource = yield prisma.cource.findFirst({
            where: {
                idcource: +idcource,
            },
        });
        // if (!cource) {
        //   return res.status(404).json({
        //     message: 'Cource not found',
        //   });
        // }
        // Update the isPublished field
        const updatedCource = yield prisma.cource.update({
            where: {
                idcource: +idcource,
            },
            data: {
                isPublished: !isPublished,
            },
        });
        return res.json({
            message: 'Cource isPublished updated successfully',
            cource: updatedCource,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'An error occurred while updating the cource',
        });
    }
});
exports.PuplishCource = PuplishCource;
const deletecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const findingcource = yield prisma.cource.findFirst({
            where: {
                idcource: +id
            }
        });
        if (findingcource) {
            const deletecourse = yield prisma.cource.delete({
                where: {
                    idcource: +id
                }
            });
            res.json(exports.deletecource);
        }
    }
    catch (error) {
    }
});
exports.deletecource = deletecource;
H.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const courses = yield prisma.cource.findMany({
            where: {
                title: { contains: searchTerm },
            },
            include: {
                Section: true,
                review: true,
                Enrollment: true,
                User: true,
                Category: true,
            },
        });
        res.json(courses);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
H.get("/cource/chart", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield prisma.cource.findMany({
            include: {
                Enrollment: true,
            },
        });
        res.json(courses);
    }
    catch (error) {
        console.error("Error retrieving courses:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
const trashcource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.cource.update({
            where: {
                idcource: +id
            },
            data: {
                isDeleted: true
            }
        });
    }
    catch (error) {
    }
});
exports.trashcource = trashcource;
const restorecource = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const upd = yield prisma.cource.update({
            where: {
                idcource: +id
            },
            data: {
                isDeleted: false
            }
        });
    }
    catch (error) {
    }
});
exports.restorecource = restorecource;
exports.default = H;
const Latestcources = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latestCourses = yield prisma.cource.findMany({
            orderBy: { createdAt: 'desc' },
            take: 3, // Get the latest three courses
        });
        res.json(latestCourses);
    }
    catch (error) {
        console.error('Error fetching latest courses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.Latestcources = Latestcources;
const courList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield prisma.cource.findMany({
            where: {
                isDeleted: false
            }
        });
        res.json(find);
    }
    catch (error) {
        return res.json({
            message: "Something went wrong please try again"
        });
    }
});
exports.courList = courList;
const couceDeletedList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield prisma.cource.findMany({
            where: {
                isDeleted: true
            }
        });
        res.json(find);
    }
    catch (error) {
        return res.json({
            message: "Something went wrong please try again"
        });
    }
});
exports.couceDeletedList = couceDeletedList;
// export default H;
