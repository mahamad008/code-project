import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();
import { Request,Response } from "express";
import { customUserRequest } from "../helpers/security/jwt";

export const Createfee =async(req:customUserRequest,res:Response)=>{
    try {
        const { amountPaid,userId,feeMonthId, Balance, studentPhone, studentName, Amountneed, studentId } = req.body;
    
        // Calculate the balance
        const balance = Amountneed - amountPaid;
    
        const fee = await prisma.fee.create({
          data: {
            amountPaid,
            // feeMonthId:+feeMonthId,
            Balance: balance,
            studentPhone,
            studentName,
            Amountneed,
            studentId:+studentId,
            userId:+userId,
            feeMonthId:+feeMonthId
 
            

          },
        });
    
        res.json(fee);
      } catch (error) {
        console.error(error);
        // res.status(500).json({ error: 'Something went wrong' });
      }
}
export const getallfee =async(req:customUserRequest,res:Response)=>{
    try {
        const getnowallfee =await prisma.fee.findMany()
        res.json({
            message:"Found successfully",
            result:[...getnowallfee]
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })  
    }
}
export const getonefee =async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const data=await prisma.fee.findFirst({
            where:{
                id:+id
            }
        })
 return res.json(data)
    } catch (error) {
        return res.json({
            message:'something went wrong'
        })
    }
}
export const deletefee =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {id}=req.params;
        const getonejust=await prisma.fee.findFirst({
            where:{
                id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the fee you applied"
            })
        }
        const justdeleteit =await prisma.fee.delete({
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
export const updatefee =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {amountPaid,Balance,feeMonthId,Amountneed,studentId}=req.body;
        const {id}=req.params;
        const balance = Amountneed - amountPaid;
        const justupdateit =await prisma.fee.update({
            where:{
                id:+id
            },
            data:{
               amountPaid,feeMonthId,
               Balance:balance,
               Amountneed,
               studentId,
               
            //    isDeleted:true
            }
        })
   
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
export const trashfee=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.fee.update({
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
  export const retorefee=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.fee.update({
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
  
  export const getfeeReportByMonthYear = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { month, year } = req.query;
  
      // Validate and parse the month and year parameters
      const parsedMonth = parseInt(month as string, 10);
      const parsedYear = parseInt(year as string, 10);
  
      if (isNaN(parsedMonth) || isNaN(parsedYear)) {
        return res.status(400).json({ message: "Invalid month or year" });
      }
  
      // Fetch fees for the specified month and year
      const fees = await prisma.fee.findMany({
        where: {
          PaidAt: {
            gte: new Date(parsedYear, parsedMonth - 1, 1),
            lt: new Date(parsedYear, parsedMonth, 1),
          },
        },
      });
  
      res.json({
        message: "Exam report retrieved successfully",
        fees,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };