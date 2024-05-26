import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import otpGenerator from 'otp-generator';
// import nodemailer from 'nodemailer';
import nodemailer, { Transporter } from 'nodemailer';
import Options from 'nodemailer';
import { generateToken } from '../helpers/security/jwt';

const prisma = new PrismaClient();

interface RegisterUserData {
  givenName: string;
  email: string;
  password: string;
  username: string;
}

interface ForgotPasswordRequest {
  email: string;
}

export const makeAdmin=async(req:Request,res:Response)=>{
  try {
    const {isAdmin}=req.body;
    const {id}=req.params;
    const FindFirst=await prisma.user.findFirst({
      where:{
        id:+id
      }
    })
    if(!FindFirst){
      return res.json({
        message:"user not found"
      })
    }
    const updateuser=await prisma.user.update({
      where:{
        id:+id
      },
      data:{
   isAdmin:!isAdmin
      }
    })
    res.json(updateuser)
  } catch (error) {
    
  }
}
export const removeAdmin=async(req:Request,res:Response)=>{
  try {
    const {isAdmin}=req.body;
    const {id}=req.params;
    const FindFirst=await prisma.user.findFirst({
      where:{
        id:+id
      }
    })
    if(!FindFirst){
      return res.json({
        message:"user not found"
      })
    }
    const updateuser=await prisma.user.update({
      where:{
        id:+id
      },
      data:{
   isAdmin:false
      }
    })
    res.json(updateuser)
  } catch (error) {
    
  }
}

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, givenName, username } = req.body as RegisterUserData;

    if (!email || !password || !givenName) {
      let error = {
        message: 'Please provide valid data',
      };

      return res.status(400).json(error);
    }

    // Check if the email or username already exists
    const checkEmail = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    const checkUsername = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (checkEmail) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Email is already taken.',
      });
    }

    if (checkUsername) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Username is already taken.',
      });
    }

    // Hash the password
    const hash = bcrypt.hashSync(password);

    // Register the user
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hash,
        givenName,
        username,
        isAdmin: email === 'amiinmistaphe@gmail.com',
      },
    });

    return res.json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      isSuccess: false,
      message: 'Something went wrong.',
    });
  }
};

interface Login {
  email: string;
  password: string;
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body as Login;

  if (!email || !password) {
    return res.status(400).json({
      isSuccess: false,
      message: 'Please provide login credentials',
    });
  }

  // Check if the user exists
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({
      isSuccess: false,
      message:'Invalid credentials.',
    });
  }

  // Compare the passwords
  const checkPassword = bcrypt.compareSync(password, user.password);

  if (!checkPassword) {
    return res.status(401).json({
      isSuccess: false,
      message: 'Invalid credentials.',
    });
  }

  // Generate token
  const token = generateToken({
    username: user.username,
    givenName: user.givenName,
    isAdmin: user.isAdmin,
    userId: user.id,
  });

  const result = {
    givenName: user.givenName,
    id: user.id,
    isPaid: user.isPaid,
    username: user.username,
    isAdmin: user.isAdmin,
    joinedAt: user.joinedAt,
    token: token,
    isTeacher:user.isTeacher
  };

  res.json({
    message: 'Login successfully',
    result,
  });
};


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // if (req.user?.isAdmin)
    // return res.json({
    //   message: 'unauthorized'.toUpperCase(),
       
    // });
    const allUsers = await prisma.user.findMany();
    res.json({
      message:"Found Successfully",
      result: [...allUsers],
    });
  } catch (error) {
    // res.json({
    //    message:"something went wrong"
    // });
    console.log(error)
  }
};

export const deleteuser =async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const deletenow =await prisma.user.delete({
      where:{
        id:parseInt(id)
      }
    })
  } catch (error) {
    console.log(error)
  }
}
export const findinguser =async(req:Request,res:Response)=>{
try {
  const{id}=req.params;
  const data =await prisma.user.findFirst({
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
export const chatruser=async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    const chartData = users.map((user) => ({
      givenName: user.givenName,
      // count: user.id.k,
      registerDate: user.joinedAt,
    }));

    res.json(chartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const chartinfouser= async (req: Request, res: Response) => {
  const latestRegisteredUsers = await prisma.user.findMany({
    orderBy: { joinedAt: 'desc' },
    take: 10, // Adjust the number of users to retrieve as needed
  });

  res.json(latestRegisteredUsers);
};



export const yearchart= async (req:Request, res:Response) => {
  const { year } = req.params;

  try {
    const userData = await prisma.user.findMany({
      where: {
        joinedAt: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${Number(year) + 1}-01-01`),
        },
      },
      select: {
        joinedAt: true,
      },
    });

    const chartData = generateChartData(userData);
    res.json(chartData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const generateChartData = (userData: { joinedAt: Date }[]) => {
  const chartData: { name: string; users: number }[] = [];

  for (let month = 1; month <= 12; month++) {
    const monthName = new Date(0, month - 1).toLocaleString('default', { month: 'long' });
    const usersCount = userData.filter(
      (user) => user.joinedAt.getMonth() === month - 1 && user.joinedAt.getFullYear() === new Date().getFullYear()
    ).length;

    chartData.push({ name: `${monthName}`, users: usersCount });
  }

  return chartData;
};

export const chartday=async(req:Request,res:Response)=>{
  try {
    const chartData = await prisma.user.groupBy({
      by: ['joinedAt'],
      _count: {
        joinedAt: true,
      },
    });
    res.json(chartData);
  } catch (error) {
    console.error('Failed to fetch chart data', error);
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
}

export const trashuser=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const upd=await prisma.user.update({
      where:{
        id:+id
      },
      data:{
        IsDeleted:true
      }
      
    })
  } catch (error) {
    
  }
}
export const restoreuser=async(req:Request,res:Response)=>{
  try {
    const {id}=req.params;
    const upd=await prisma.user.update({
      where:{
        id:+id
      },
      data:{
        IsDeleted:false
      }
      
    })
  } catch (error) {
    
  }
}
export const updatePermission=async(req:Request,res:Response)=>{
  try {
  const {id}=req.params;
  const {isAdmin}=req.body;
  const upd=await prisma.user.update({
    where:{
      id:+id

    },
    data:{
      isAdmin
    }
  })
  res.json(upd);
  }catch(error){

  }
}
