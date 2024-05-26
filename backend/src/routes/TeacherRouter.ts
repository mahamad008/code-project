import { Router } from "express"
import { Createteacher, TeacherOfflineStudent, TeacherSalary, deleteteacher, getallteacher, getoneteacher, restoreteacher, trashteacher, updateteacher } from "../controllers/TeacherCantroller";
import { decodeToken } from "../helpers/security/jwt";
const TeacherRouter =Router();
TeacherRouter.post('/create',Createteacher)
TeacherRouter.get('/get/all',getallteacher)
TeacherRouter.get('/get/one/:id',getoneteacher)
TeacherRouter.get('/get/:phone/:password',TeacherOfflineStudent)
TeacherRouter.get('/get/salary/:id',TeacherSalary)
TeacherRouter.put('/update/:id',updateteacher)
TeacherRouter.put('/restore/:id',restoreteacher)
TeacherRouter.put('/trash/:id',trashteacher)
TeacherRouter.delete('/delete/:id',deleteteacher)
export default TeacherRouter