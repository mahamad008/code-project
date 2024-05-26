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
exports.deleteonelesson = exports.findmanylesson = exports.getonelesson = exports.RegisterLesson = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const express_1 = __importDefault(require("express"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const lesson = (0, express_1.default)();
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
lesson.post('/create', upload.single('videoUrl'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, sectionId } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const bucketName = "frisbucketme";
        const params = {
            Bucket: bucketName,
            Key: `${Date.now()}_${file.originalname}`,
            Body: file.buffer,
            // ACL: 'public-read',
            ContentType: file.mimetype,
        };
        const result = yield s3.upload(params).promise();
        const updating = yield prisma.lesson.create({
            data: {
                title,
                content,
                sectionId: +sectionId,
                videoUrl: result.Location,
            },
        });
        res.json({
            message: "Created successfully",
            updating
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
// Other route handlers...
// export default lesson;
// lesson.put('/update/:id', upload.single('videoUrl'), async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { title, content, sectionId } = req.body;
//     const file = req.file;
//     const lessonToUpdate = await prisma.lesson.findUnique({
//       where: {
//         id: +id,
//       },
//     });
//     if (!lessonToUpdate) {
//       return res.status(404).json({ error: 'Lesson not found' });
//     }
//     let videoUrl = lessonToUpdate.videoUrl;
//     if (file) {
//       const params = {
//         Bucket: process.env.AWS_S3_BUCKET_NAME,
//         Key: `${Date.now()}_${file.originalname}`,
//         Body: file.buffer,
//         ACL: 'public-read',
//         ContentType: file.mimetype,
//       };
//       const result = await s3.upload(params).promise();
//       videoUrl = result.Location;
//     }
//     const updatedLesson = await prisma.lesson.update({
//       where: {
//         id: +id,
//       },
//       data: {
//         title,
//         content,
//         sectionId: +sectionId,
//         videoUrl,
//       },
//     });
//     res.json({
//       message: 'Updated successfully',
//       updatedLesson,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });
// Other route handlers...
// export default lesson;
const RegisterLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const 
    }
    catch (error) {
    }
});
exports.RegisterLesson = RegisterLesson;
const getonelesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const finding = yield prisma.lesson.findFirst({
            where: {
                id: +id
            }
        });
        res.json(finding);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getonelesson = getonelesson;
const findmanylesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const finding = yield prisma.lesson.findMany();
        res.json({
            message: "Found successfully",
            result: [...finding]
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.findmanylesson = findmanylesson;
const deleteonelesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const finding = yield prisma.lesson.findFirst({
            where: {
                id: +id
            }
        });
        if (finding) {
            const deleteone = yield prisma.lesson.delete({
                where: {
                    id: +id
                }
            });
            res.json({
                message: 'deleted successfully',
                deleteone
            });
        }
    }
    catch (error) {
        res.json({
            message: "something went wrong"
        });
    }
});
exports.deleteonelesson = deleteonelesson;
// lesson.put('/update/:id', upload.single('videoUrl'), async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;
//       const { title, content, sectionId } = req.body;
//       const file = req.file;
//       const lessonToUpdate = await prisma.lesson.findUnique({
//         where: {
//           id: +id,
//         },
//       });
//       if (!lessonToUpdate) {
//         return res.status(404).json({ error: 'Lesson not found' });
//       }
//       let videoUrl = lessonToUpdate.videoUrl;
//       if (file) {
//         const result = await cloudinary.v2.uploader.upload(file.path, {
//           resource_type: 'video',
//         });
//         videoUrl = result.secure_url;
//       }
//       const updatedLesson = await prisma.lesson.update({
//         where: {
//           id: +id,
//         },
//         data: {
//           title,
//           content,
//          sectionId:+sectionId,
//           videoUrl,
//         },
//       });
//       res.json({
//         message: 'Updated successfully',
//         updatedLesson,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   });
exports.default = lesson;
