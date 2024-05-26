
import TeacherRouter from './routes/TeacherRouter';
import SalaryRouter from './routes/SalaryRouter';
import StudentRouter from './routes/StudentRouter';

import FeeRouter from './routes/FeeRouter';
import ExamRouter from './routes/ExamRouter';

import oflineenrollmentrouter from './routes/Oflineenrollmentrouter';
import oflinecourcesrouter from './routes/oflinecourcerouter';

import SubcourceRouter from './routes/Subcourceroter';

import oflineCategoryRouter from './routes/OflineCategory';
import feeMonthRouter from './routes/FeeMonth';

import seedData from './seed';
import express from 'express';
import userRouter from './routes/userRoute';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/Feemonth', feeMonthRouter);
app.use('/api/OflineCategory', oflineCategoryRouter);
app.use('/api/subcource', SubcourceRouter);
app.use('/api/oflinecource', oflinecourcesrouter);
app.use('/api/ofllinenrollment', oflineenrollmentrouter);
app.use('/api/Fee', FeeRouter);
app.use('/api/user', userRouter);
app.use('/api/Teacher', TeacherRouter);
app.use('/api/Salary', SalaryRouter);
app.use('/api/student', StudentRouter);
app.use('/api/exam', ExamRouter);

app.listen(5000, async () => {
  console.log('Serving on port 5000');
  
});