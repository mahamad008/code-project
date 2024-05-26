import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();
import { Request,Response } from "express";
import { customUserRequest } from "../helpers/security/jwt";

export const Createsalary =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {Amount,userId,teacherId,method,TeacherPhone,TeacherName}=req.body;
        if(!Amount ||!teacherId ||!TeacherPhone ||!TeacherName){
            return  res.json({
                Message:"Failed to create new salary please check your Data"
            })
        }
        const addtosalary =await prisma.salary.create({
            data:{
                Amount,
                teacherId:+teacherId,
                TeacherPhone,
                TeacherName,
                method,
                userId:+userId,

                 

            }
        })
        res.json({
            message:"Created successfully",
            addtosalary
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
        // console.log(error)
    }
}
export const getallsalary =async(req:customUserRequest,res:Response)=>{
    try {
        const getnowallsalary =await prisma.salary.findMany()
        res.json({
            message:"Found successfully",
            result:[...getnowallsalary]
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })  
    }
}
export const getonesalary =async(req:customUserRequest,res:Response)=>{
    try {
        const {id}=req.params;
        const data=await prisma.salary.findFirst({
            where:{
                id:+id
            }
        })
res.json(data)
    } catch (error) {
        return res.json({
            message:'something went wrong'
        })
    }
}
export const deletesalary =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {id}=req.params;
        const getonejust=await prisma.salary.findFirst({
            where:{
                id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the salary you applied"
            })
        }
        const justdeleteit =await prisma.salary.delete({
            where:{
                id:+id
            }
        })
        res.json({
            message:"Deleted successfully",
            justdeleteit
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
export const updatesalary =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {Amount,method,         TeacherPhone,
            TeacherName,teacherId}=req.body;
        const {id}=req.params;
        const getonejust=await prisma.salary.findFirst({
            where:{
                id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the salary you applied"
            })
        }
        const justupdateit =await prisma.salary.update({
            where:{
                id:+id
            },
            data:{
               Amount,
               teacherId,
               TeacherPhone,
               TeacherName,
               method
            }
        })
        res.json({
            message:"Updated successfully",
            justupdateit
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
export const trashsalary=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.salary.update({
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
  export const restoresalary=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.salary.update({
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