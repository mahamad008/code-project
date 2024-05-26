import { PrismaClient } from "@prisma/client";
import {Request, Response } from "express";
const prisma =new PrismaClient()

export const Regiteroflinecource =async(req:Request,res:Response)=>{
    try {
        const {Name,shift,OflineCategoryId,teacherId,userId,Description}=req.body;
        const newregiter=await prisma.oflinecources.create({
            data:{
                Name,
                Description,
                teacherId:+teacherId,
                OflineCategoryId:+OflineCategoryId,
                shift,
                userId:+userId
            }
        })
        res.json({
            message:"creqated successfully",
            newregiter
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateoflinecource=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
                const {Name,shift,OflineCategoryId,teacherId,Description}=req.body;
                const finding=await prisma.oflinecources.findFirst({
                    where:{
                        id:+id
                    }
                })
                if(finding){
                    const updating=await prisma.oflinecources.update({
                        where:{
                            id:+id
                        },
                        data:{
                            Description,
                            Name,
                            teacherId,
                            OflineCategoryId,
                            shift
                        }
                    })
                    res.json({
                        message:"updated successfully",
                        updating
                    })
                }
         
    } catch (error) {
        console.log(error)
    }
};
export const deleteoflinecource=async(req:Request,res:Response)=>{
try {
    const {id}=req.params;
              
    const findingdeletinId=await prisma.oflinecources.findFirst({
        where:{
            id:+id
        }
    })
    if(findingdeletinId){
        const deleteoflinecources=await prisma.oflinecources.delete({
            where:{
                id:+id
            }
        })
        res.json({
            message:"Deleted successfully",
            deleteoflinecources
        })
    }
} catch (error) {
    console.log(error)
    
}
}

export const getalloflinecources = async (req: Request, res: Response) => {
    try {
      const oflinecources = await prisma.oflinecources.findMany();
      res.json({
        isSuccess: true,
        result: [...oflinecources],
      });
    } catch (error) {
      res.json({
        isSuccess: false,
        message: 'Failed to fetch the categories data',
      });
    }
  };
  export const getoneoflinecource=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
              
        const searchingoneoflinecource=await prisma.oflinecources.findFirst({
            where:{
                id:+id
            }
        })
        if(!searchingoneoflinecource){
            return res.json({
                message:"The oflinecource your are searching doesn't exist"
            })
        }
        if(searchingoneoflinecource){
            return res.json(searchingoneoflinecource)
        }
    } catch (error) {
        return res.json({
            message:"Something went Wrong"
        })
    }
  }
  export const trashoflinecource=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.oflinecources.update({
        where:{
          id:+id
        },
        data:{
          isDeleted:true
        }
        
      })
    } catch (error) {
      
    }
  }
  export const restoreoflinecource=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.oflinecources.update({
        where:{
          id:+id
        },
        data:{
          isDeleted:false
        }
        
      })
    } catch (error) {
      
    }
  }