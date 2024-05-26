import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();
import { Request,Response } from "express";
import { customUserRequest } from "../helpers/security/jwt";

export const CreatefeeMonth =async(req:customUserRequest,res:Response)=>{
    try {
        const {   Amount,
            FeeTitle} = req.body;
    
      
      const checkMonth=await prisma.feeMonth.findFirst({
        where:{
            FeeTitle
        }
      })
      if(checkMonth){
        return res.status(401).json({
            message:"Title Already exist please change title"
        })
      }
        const feeMonth = await prisma.feeMonth.create({
          data: {
         Amount,
         FeeTitle
          },
        });
    
        res.json(feeMonth);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
      }
}
export const getallfeeMonth =async(req:customUserRequest,res:Response)=>{
    try {
        const getnowallfeeMonth =await prisma.feeMonth.findMany()
        res.json({
            message:"Found successfully",
            result:[...getnowallfeeMonth]
        })
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })  
    }
}
export const getonefeeMonth =async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const data=await prisma.feeMonth.findFirst({
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
export const deletefeeMonth =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {id}=req.params;
        const getonejust=await prisma.feeMonth.findFirst({
            where:{
                id:+id
            }
        })
        if(!getonejust){
            return res.json({
                message:"is not exist the feeMonth you applied"
            })
        }
        const justdeleteit =await prisma.feeMonth.delete({
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
export const updatefeeMonth =async(req:customUserRequest,res:Response)=>{
    try {
        // if (!req.user?.isAdmin)
        // return res.json({
        //   message: 'unauthorized'.toUpperCase(),
           
        // });
        const {    Amount,
            FeeTitle}=req.body;
        const {id}=req.params;
        const justupdateit =await prisma.feeMonth.update({
            where:{
                id:+id
            },
            data:{
              Amount,
              FeeTitle
            //    isDeleted:true
            }
        })
   res.json(justupdateit)
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
export const trashfeeMonth=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.feeMonth.update({
        where:{
          id:+id
        },
        data:{
            isDeleted:true
        }
        
      })
      res.json(upd)
    } catch (error) {
      
    }
  }
  export const retorefeeMonth=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.feeMonth.update({
        where:{
          id:+id
        },
        data:{
            isDeleted:false
        }
        
      })
      res.json(upd)
    } catch (error) {
      
    }
  }

  export const GetFeemonth=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const data=await prisma.feeMonth.findFirst({
            where:{
                id:+id
            }
        })
        res.json(data)
    } catch (error) {
        return res.status(401).json({message:"something went wrong please try again"})
    }
  }