import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { customUserRequest} from '../helpers/security/jwt';
export const createreview = async (req: Request, res: Response) => {
  try {
    const {corId,review,Name,Comment,UserId}=req.body;



    const newreview = await prisma.review.create({
      data: {
          Name,
          Comment,
          corId,
          UserId

      },
    });

    return res.json(newreview);
  } catch (error) {
    res.status(400).json({
     message:"something went wrong"
    });
    console.log(error)
  }
};





export const getallreview = async (req: customUserRequest, res: Response) => {
  try {
    if (req.user?.isAdmin)
    return res.json({
      message: 'unauthorized'.toUpperCase(),
       
    });
    const allreviews = await prisma.review.findMany();
    res.json({
      message:"Found Successfully",
      result: [...allreviews],
    });
  } catch (error) {
    res.json({
       message:"something went wrong"
    });
  }
};

export const deletereview =async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const deletenow =await prisma.review.delete({
      where:{
        id:parseInt(id)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
export const findingreview =async(req:Request,res:Response)=>{
try {
  const{id}=req.params;
  const data =await prisma.review.findFirst({
    where:{
      id:+id
    }
  })
  res.json(data)
} catch (error) {
 return res.json({
  message:"something went wrong"
 }) 
}
}
export const updateReview=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const {corId,review,Comment,UserId}=req.body;
    if(!corId ||!review ||!Comment ||!UserId){
      return res.json({
        message:"Please provide valid data"
      })
    }
    const updatingreview=await prisma.review.update({
      where:{
        id:+id
      },
      data:{
        Comment,
        corId,
        UserId,
        review
      }
    })
    res.json(updateReview)
  } catch (error) {
    
  }
}