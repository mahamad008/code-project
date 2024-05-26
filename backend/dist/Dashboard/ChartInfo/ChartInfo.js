"use strict";
// import { PrismaClient } from "@prisma/client";
// const prisma=new PrismaClient();
// import {Request,Response} from 'express'
// export const chartInfo = async (req:Request, res:Response) => {
//     try {
//       const today = new Date();
//       const lastMonth = moment().subtract(30, "days");
//       const data = await prisma.user.findMany({
//         where: {
//             joinedAt: {
//             gte: lastMonth.toISOString(),
//             lt: today,
//           },
//         },
//       });
//       const groups = data.reduce((groups, orders) => {
//         const date = orders.joinedAt.toString().split("-")[0].split(" ")[2];
//         if (!groups[date]) {
//           groups[date] = [];
//         }
//         groups[date].push(orders);
//         return groups;
//       }, {});
//       const groupArrays = Object.keys(groups).map((date) => {
//         return {
//           date,
//           orders: groups[date].length,
//         };
//       });
//       res.json(groupArrays);
//     } catch (error) {
//       res.json(error);
//     }
//   };
