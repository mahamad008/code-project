import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient()

export const RegisterOflineenrollment=async(req:Request,res:Response)=>{
    const {studentId,StudentName,userId,OflinecourceId}=req.body;
    try {
       
        const newoflineenrrollment=await prisma.oflineenrollment.create({
            data:{
              studentId:+studentId,
              StudentName,
              OflinecourceId:+OflinecourceId,
              userId:+userId
              
            }
            
        })
        res.json({
            message:"Created successfully",
            newoflineenrrollment
        })
    } catch (error) {
        console.log(error)
    }
}
export const getoneofllineenrollment =async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const getone =await prisma.oflineenrollment.findFirst({
            where:{
               id:+id
            }
        })
        res.json(getone)
    } catch (error) {
        console.log(error)
    }
}

export const getallfolineenrollment=async(req:Request,res:Response)=>{
    try {
        const findmany =await prisma.oflineenrollment.findMany()
        res.json({
            message:"Successfully found",
            result:[...findmany]
        })
    } catch (error) {
        console.log(error)
    }
}
export const deleteOflineenrollment=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const getone =await prisma.oflineenrollment.findFirst({
            where:{
                id:+id
            }
        })
        if(!getone){
            return res.json({
                message:"The oflineenrollment you are trying to get deos not exist"
            })
            
        }
        else if(getone){
            const deleteone=await prisma.oflineenrollment.delete({
                where:{
                    id:+id
                }
            })
            res.json({
                message:"deleted successfully",
                deleteone
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export const updateoflinenrollment=async(req:Request,res:Response)=>{
    try {
        const {studentId,StudentName,OflinecourceId}=req.body;
        const {id}=req.params;
        const getone =await prisma.oflineenrollment.findFirst({
            where:{
                id:+id
            }
        })
        if(!getone){
            return res.json({
                message:"it deosnot exist"
            })

        }
        if(getone){
            const updating=await prisma.oflineenrollment.update({
                where:{
                    id:+id
                },
                data:{
                    OflinecourceId,
                    studentId,
                    StudentName
                }
            
            })
            res.json({
                message:"Deleted successfully",
                updating
            })
        }
    } catch (error) {
        console.log(error)
    }
}
export const trashoflineEnrollment=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.oflineenrollment.update({
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
  export const restoreOflineenrollment=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.oflineenrollment.update({
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