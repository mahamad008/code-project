import { PrismaClient } from "@prisma/client";
const prisma =new PrismaClient();
import { Request,Response } from "express";

export const Createstudent=async(req:Request,res:Response)=>{
    try {
    const {Name,userId,Address,phone,}=req.body;
    if(!Name ){
        return res.json({
            message:"please provide valid data"
        })
    }
    const justdoing =await prisma.student.create({
        data:{
          Address,
          Name,
          phone,
          userId:+userId
        
            
        }
    })
    res.json({
        message:"Created successfully",
        justdoing
    })
    } catch (error) {
        console.log(error)
    }
}
export const getallstudent =async(req:Request,res:Response)=>{
    try {
        const getnowallstudent =await prisma.student.findMany()
        res.json({
            message:"Found successfully",
            result:[...getnowallstudent]
        })
    } catch (error) {
        // return res.json({
        //     message:"something went wrong"
        // })  
        console.log(error)
    }
}
export const getonlyonestudent=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const finding=await prisma.student.findFirst({
            where:{
                Id:+id
            }
        })
        res.json(finding)
    } catch (error) {
        
    }
}
export const getonestudent =async(req:Request,res:Response)=>{
    try {
        const {phone}=req.params;
        const data=await prisma.student.findFirst({
            where:{
                phone:phone
            },
            include:{
                Exam:{
                    select:{
                        CourceName:true,
                        Total:true,
                        Studentname:true,
                        // SubcourceId:true,
                        Totalscore:true,
                        studentPhone:true,

                    }
                }
            }
        })
      res.json(data)
     
    } catch (error) {
        return res.json({
            message:'something went wrong'
        })
    }
}
export const student=async(req:Request,res:Response)=>{
    try {
        const {phone}=req.params;
        const finding=await prisma.student.findFirst({
            where:{
                phone:phone
            }
        })
        res.json(finding)
    } catch (error) {
        
    }
}

export const deletestudentdata =async(req:Request,res:Response)=>{
    try {
        const {id} = req.params;

        const justdeleteit = await prisma.student.delete({
          where: {
            Id: parseInt(id), // Convert Id to an integer
          },
        });
        res.json(justdeleteit)
    } catch (error) {
        return res.json({
            message:"something went wrong",
         
        })
    }
}
export const updatestudent =async(req:Request,res:Response)=>{
    try {
        const {  Address, 
            Name,
             phone,
            
             }=req.body;
        const {id}=req.params;
        const getonejust=await prisma.student.findFirst({
            where:{
                Id:+id
            }
        })
 
        const justupdateit =await prisma.student.update({
            where:{
                Id:+id
            },
            data:{
             Name,
             phone,
            
             Address,
             
             
             
            }
        })
 res.json(justupdateit)
    } catch (error) {
        return res.json({
            message:"something went wrong"
        })
    }
}
export const trashstudent=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.student.update({
        where:{
          Id:+id
        },
        data:{
          isDeleted:true
        }
        
      })
    } catch (error) {
      
    }
  }
  export const restorestudent=async(req:Request,res:Response)=>{
    try {
      const {id}=req.params;
      const upd=await prisma.student.update({
        where:{
          Id:+id
        },
        data:{
          isDeleted:false
        }
        
      })
    } catch (error) {
      
    }
  }

  export const GetoneExamStudent=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const getonejust=await prisma.student.findFirst({
        where:{
            Id:+id
        },
      include:{
        Exam:true
      }
    })
    res.json(getonejust?.Exam)
  } catch (error) {
    
  }
  }
  export const FeeStudent=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params;
        const find=await prisma.student.findFirst({
            where:{
                Id:+id
            },
            include:{
                Fee:true
            }
        })
        res.json(find?.Fee)
    } catch (error) {
        return res.status(401).json({message:"something went wrong please try again"})
    }
  }
  export const balanceStudent=async(req:Request, res:Response)=>{
    try {
        const {id}=req.params;
        const find=await prisma.student.findFirst({
            where:{
                Id:+id,
                Fee:{
                    some:{
                        Balance:{
                            gt:0
                        }
                    }
                }
            },
            
            include:{
                Fee:true
            }
        })
        res.json(find?.Fee)
    } catch (error) {
        return res.status(401).json({message:"something went wrong please try again"})
    }
  }
  export const GetstudentEnrollments=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const search=await prisma.student.findFirst({
            where:{
                Id:+id
            },
            include:{
                oflineenrollment:true
            }
        })
        res.json(search?.oflineenrollment)
    } catch (error) {
        return res.status(401).json({
            message:"something went wrong please try again"
        })
    }
  }
  export const StudentOwemoney=async(req:Request,res:Response)=>{
    try {
        const find=await prisma.student.findMany({
           where:{
            isDeleted:false,
            Fee:{
                some:{
                    Balance:{
                        gt:0
                    }
                }
            }
           },
           include:{
            Fee:{
                select:{
                    Balance:true
                }
            }
           }
        })
        res.json(find)
    } catch (error) {
        return res.status(404).json({message:"something went wrong please try again"})
    }
  }
  export const paidStudents=async(req:Request,res:Response)=>{
try {
    const {FeeId,courceId}=req.params;
    const find=await prisma.student.findMany({
        where:{
            Fee:{
                some:{
                    feeMonthId:+FeeId
                }
            },
            oflineenrollment:{
                some:{
                    OflinecourceId:+courceId
                }
            }
        }
    })
    res.json(find)
} catch (error) {
    return res.status(404).json({message:"someting went wrong please try agin"})
}
  }
  export const UnpaidStudents=async(req:Request,res:Response)=>{
try {
    const {FeeId,courceId}=req.params;
    const find=await prisma.student.findMany({
        where:{
            Fee:{
                none:{
                    feeMonthId:+FeeId
                }
            },
            oflineenrollment:{
                some:{
                    OflinecourceId:+courceId
                }
            }
        }
    })
    res.json(find)
} catch (error) {
    return res.status(404).json({message:"someting went wrong please try agin"})

}
  }