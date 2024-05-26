"use strict";
// import express, { Request, Response } from 'express';
// import { PrismaClient } from '@prisma/client';
// import { v2 as cloudinary } from 'cloudinary';
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// const News = express();
// const prisma = new PrismaClient();
// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: 'ddshdxyic',
//   api_key: '965251129372819',
//   api_secret: 'WxzKbgswj2SNfEFDRxuwU8GhW1A'
// });
// // Configure multer middleware with Cloudinary as the storage engine
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     // folder: 'your_folder_name', // Optional: specify a folder to store the images
//     // format: 'jpg', // Optional: the desired image format
//     public_id: (req: Request, file: Express.Multer.File) => file.originalname // Use the original file name as the public ID
//   }
// });
// const upload = multer({ storage: storage });
// // Define the route for image upload
// News.post('/create', upload.single('image'), async (req: Request, res: Response) => {
//   if (req.file) {
//     try {
//       const{Description,
// tile}=req.body
//       const { path: Image } = req.file;
//       // Create a record in the database
//       const news = await prisma.news.create({
//         data: {
//           Image,
//           Description,
//           tile
//         }
//       });
//       res.json(news);
//     } catch (error) {
//       console.error('Error creating news:', error);
//       res.status(500).json({ error: 'Failed to create news' });
//     }
//   } else {
//     res.status(400).json({ message: 'No image file provided' });
//   }
// });
// News.put('/update/:id', upload.single('image'), async (req: Request, res: Response) => {
//   if (req.file) {
//     try {
//       const{Description,
// tile}=req.body
//       const { path: Image } = req.file;
//       // Create a record in the database
//       const news = await prisma.news.create({
//         data: {
//           Image,
//           Description,
//           tile
//         }
//       });
//       res.json(news);
//     } catch (error) {
//       console.error('Error creating news:', error);
//       res.status(500).json({ error: 'Failed to create news' });
//     }
//   } else {
//     res.status(400).json({ message: 'No image file provided' });
//   }
// });
// export const getallnews =async(req:Request,res:Response)=>{
//   try {
//     const searchingallnews=await prisma.news.findMany()
//     res.json({
//       result:[...searchingallnews]
//     })
//   } catch (error) {
//   }
// }
// export const getonenews =async(req:Request,res:Response)=>{
//   try {
//     const{id}=req.params;
//     const findingnews=await prisma.news.findFirst({
//       where:{
//         Id:+id
//       }
//     })
//     if(!findingnews){
//       return res.json({
//         message:"the news you are trying is not exist"
//       })
//     }
//   } catch (error) {
//   }
// }
// export const deleteNews=async(req:Request,res:Response)=>{
//   try {
//     const{id}=req.params;
//     const deletenews=await prisma.news.delete({
//       where:{
//         Id:+id
//       }
//     })
//     res.json({
//       message:"Deleted successfully"
//     })
//   } catch (error) {
//   }
// }
// export default News
