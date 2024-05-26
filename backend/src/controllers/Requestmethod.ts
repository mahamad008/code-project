import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma=new PrismaClient();
export const createRequestPayment=async(req:Request,res:Response)=>{
    const {AccountNumber,
        Amount,
        chanel,
        id ,
        corId,
        Description,
        Method}=req.body;
    try {

        const newrequest=await prisma.requestPayment.create({
            data:{
                AccountNumber,
                Amount:+Amount,
                chanel,
                corId:+corId,
                id,
                Description,
                Method

            }
        })
        res.json(newrequest)
    } catch (error) {
        console.log(error)
    }
}
export const getallRequestpayment=async(req:Request,res:Response)=>{
    try {
        const getallpayments=await prisma.requestPayment.findMany()
        res.json(getallpayments)
    } catch (error) {
        
    }
}
export const deleterequest=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const deleting=await prisma.requestPayment.delete({
            where:{
                Requstpaymentid:+id
            }
        })
        res.json(deleting)
    } catch (error) {
        
    }
}
export const trashrequest=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const deleting=await prisma.requestPayment.update({
            where:{
                Requstpaymentid:+id
            },
            data:{
                isDeleted:true
            }
        })
        res.json(deleting)
    } catch (error) {
        
    }
}
export const restoreRequest=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const deleting=await prisma.requestPayment.update({
            where:{
                Requstpaymentid:+id
            },
            data:{
                isDeleted:false
            }
        })
        res.json(deleting)
    } catch (error) {
        
    }
}
export const confirmrequest=async(req:Request,res:Response)=>{
    try {
        const {Requstpaymentid}=req.params;
await prisma.requestPayment.update({
    where:{
        Requstpaymentid:+Requstpaymentid
    },
    data:{
        isconfirmed:true
    }
})
    } catch (error) {
        
    }
}