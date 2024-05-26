import { Router } from "express"
import { Createstudent, FeeStudent, GetoneExamStudent, GetstudentEnrollments, StudentOwemoney, UnpaidStudents, balanceStudent, deletestudentdata, getallstudent, getonestudent, getonlyonestudent, paidStudents, restorestudent, student, trashstudent, updatestudent } from "../controllers/StudentCantroller";
import { decodeToken } from "../helpers/security/jwt";
const StudentRouter =Router();
StudentRouter.post('/create',Createstudent)
StudentRouter.get('/get/all',getallstudent)
StudentRouter.get('/get/balance',StudentOwemoney)
StudentRouter.get('/get/Exam/:id',GetoneExamStudent)
StudentRouter.get('/get/studentexam/:phone',getonestudent)
StudentRouter.get('/get/:phone',student)
StudentRouter.get('/get/one/:id',getonlyonestudent)
StudentRouter.get('/get/fee/:id',FeeStudent)
StudentRouter.get('/get/balance/:id',balanceStudent)
StudentRouter.get('/get/enroll/:id',GetstudentEnrollments)
StudentRouter.put('/update/:id',updatestudent)
StudentRouter.put('/restore/:id',restorestudent)
StudentRouter.put('/trash/:id',trashstudent)
StudentRouter.delete('/delete/:id',deletestudentdata)
StudentRouter.get('/paid/:FeeId/:courceId',paidStudents)
StudentRouter.get('/unpaid/:FeeId/:courceId',UnpaidStudents)
export default StudentRouter