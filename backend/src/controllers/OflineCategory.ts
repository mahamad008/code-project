
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Request, Response } from 'express';

export const createOflineCategory = async (req: Request, res: Response) => {
  try {
    const{OflineCatName,userId,oflineCatDescription}=req.body;
  const createregiter=await prisma.oflineCategory.create({
    data:{
     OflineCatName,
     oflineCatDescription,
     userId:+userId,

    }
  })
  res.json(createregiter)
  } catch (error) {
    console.log(error);
    res.json({
      isSuccess: false,
      message: 'Failed to create new OflineCategory',
    });
  }
};

// endpoint -> PUT /api/OflineCategory/edit/:catId

export const updateOflineCategory = async (req: Request, res: Response) => {
  try {
    const { OflineCatId } = req.params;
    const{  oflineCatDescription,
      OflineCatName}=req.body;;


    const updatingOflineCategory = await prisma.oflineCategory.update({
      where: {
        OflineCatId:+OflineCatId,
      },
      data:{
      oflineCatDescription,
      OflineCatName
      }
    });

 res.json(updatingOflineCategory)
  } catch (error) {
    res.json({
      message: 'Failed to update the OflineCategory ',
      isSuccess: false,
    });
    console.log(error)
  }

};

export const getAlloflineCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.oflineCategory.findMany();
    res.json({
      isSuccess: true,
      result: [...categories],
    });
  } catch (error) {
    res.json({
      isSuccess: false,
      message: 'Failed to fetch the categories data',
    });
    console.log(error)
  }
};



export const getOneOflineCategory = async (req: Request, res: Response) => {

  try {
    const {OflineCatId}=req.params;
          
    const searchingoneoflineCategory=await prisma.oflineCategory.findFirst({
        where:{
         OflineCatId:+OflineCatId
        }
    })
    if(!searchingoneoflineCategory){
        return res.json({
            message:"The oflineCategory your are searching doesn't exist"
        })
    }
    if(searchingoneoflineCategory){
        return res.json(searchingoneoflineCategory)
    }
} catch (error) {
    // return res.json({
    //     message:"Something went Wrong"
    // })
    console.log(error)
}
};

// endpoint -> DELETE /api/OflineCategory/remove/:catId -> soft delete



// endpoint -> DELETE /api/OflineCategory/deleteAll
export const deleteOflineCategory =async(req:Request,res:Response)=>{
  try {
    const {OflineCatId}=req.params;
    const findingfrist =await prisma.oflineCategory.findFirst({
      where:{
        OflineCatId:+OflineCatId
      }
    })
    if(!findingfrist){
      return res.json({
        message:"the OflineCategory you are attempting to delete does not exist"
      })
    }
    if(findingfrist){
      const deleteData =await prisma.oflineCategory.delete({
        where:{
          OflineCatId:+OflineCatId
        }
      })

    return res.json({
      message:"Deleted successfully",
      deleteData
    })}
  } catch (error) {
    
  }
}
export const trashoflinecategory=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const upd=await prisma.oflineCategory.update({
      where:{
        OflineCatId:+id
      },
      data:{
        isDeleted:true
      }
      
    })
  } catch (error) {
    
  }
}
export const retoreoflinecatgory=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const upd=await prisma.oflineCategory.update({
      where:{
        OflineCatId:+id
      },
      data:{
        isDeleted:false
      }
      
    })
  } catch (error) {
    
  }
}