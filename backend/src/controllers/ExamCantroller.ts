import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();
import { Request,Response } from "express";
import { customUserRequest } from "../helpers/security/jwt";

export const Createexam =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {userId,SubcourceId,CourceName,Total, studentPhone,
            Studentname,Totalscore,studentId}=req.body;
  
        const addtoexam =await prisma.exam.create({
            data:{
              studentId:+studentId,
              userId:+userId,
              Total:+Total,
              CourceName,
              Totalscore,
              studentPhone,
              Studentname,
              SubcourceId:+SubcourceId,

              
            }
        })
        res.json({
            message:"Created successfully",
            addtoexam
        })
    } catch (error) {
        // return res.json({
        //     message:"something went wrong"
        // })
        console.log(error)
    }
}
export const getallexam =async(req:customUserRequest,res:Response)=>{
    try {
        const getnowallexam =await prisma.exam.findMany()
        res.json({
            message:"Found successfully",
            result:[...getnowallexam]
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })  
    }
}
export const getoneexam =async(req:customUserRequest,res:Response)=>{
    try {
        const {studentPhone}=req.params;
        const data=await prisma.exam.findFirst({
            where:{
                studentPhone
            }
        })
    res.json(data)
    } catch (error) {
        return res.json({
            message:'something went wrong'
        })
    }
}
 export const deleteexam=async(req:customUserRequest,res:Response)=>{
    try {
        const{id}=req.params;
    
const deleteexam =await prisma.exam.delete({
    where:{
        id:+id
    }
})
res.json({
    message:"Deleted successfully",
    deleteexam
})
    } catch (error) {
        console.log(error)
    }
 }

export const updateexam =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {courseId,Total,  Totalscore,CourceName,
            Studentname,SubcourceId,studentPhone,studentId}=req.body;
        const {id}=req.params;
        const getonejust=await prisma.exam.findFirst({
            where:{
                id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the exam you applied"
            })
        }
        const justupdateit =await prisma.exam.update({
            where:{
                id:+id
            },
            data:{
            
             studentId,
             Total,
             CourceName,
             Studentname,
             studentPhone,
             SubcourceId:+SubcourceId,
             Totalscore
             
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
export const trashexam=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.exam.update({
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
  export const restoreexam=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.exam.update({
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
  
export const getExamReportByMonthYear = async (
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
  
      // Fetch exams for the specified month and year
      const exams = await prisma.exam.findMany({
        where: {
          TakeDate: {
            gte: new Date(parsedYear, parsedMonth - 1, 1),
            lt: new Date(parsedYear, parsedMonth, 1),
          },
        },
      });
  
      res.json({
        message: "Exam report retrieved successfully",
        exams,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  export const getExamReportByDayDate = async (
    req: Request,
    res: Response
  ) => {
    try {
      const { day, month, year } = req.query;
  
      // Validate and parse the day, month, and year parameters
      const parsedDay = parseInt(day as string, 10);
      const parsedMonth = parseInt(month as string, 10);
      const parsedYear = parseInt(year as string, 10);
  
      if (
        isNaN(parsedDay) ||
        isNaN(parsedMonth) ||
        isNaN(parsedYear) ||
        parsedDay < 1 ||
        parsedDay > 31 ||
        parsedMonth < 1 ||
        parsedMonth > 12 ||
        parsedYear < 1900 ||
        parsedYear > 2100
      ) {
        return res.status(400).json({ message: "Invalid date" });
      }
  
      // Fetch exams for the specified day, month, and year
      const exams = await prisma.exam.findMany({
        where: {
          TakeDate: new Date(parsedYear, parsedMonth - 1, parsedDay),
        },
      });
  
      res.json({
        message: "Exam report retrieved successfully",
        exams,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };
  export const Examdetail=async(req:Request,res:Response)=>{
try {
  const {id}=req.params;
  const find=await prisma.exam.findFirst({
    where:{
      id:+id
    }
  })
  res.json(find)
} catch (error) {
  return res.json({
    message:"something went wrong please try again"
  })
}
  }