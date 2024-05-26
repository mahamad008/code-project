import { Router } from "express"
import { Createsalary, deletesalary, getallsalary, getonesalary, restoresalary, trashsalary, updatesalary } from "../controllers/SalaryCantroller";
import { decodeToken } from "../helpers/security/jwt";
const SalaryRouter =Router();
SalaryRouter.post('/create',Createsalary)
SalaryRouter.get('/get/all',getallsalary)
SalaryRouter.get('/get/one/:id',getonesalary)
SalaryRouter.put('/update/:id',updatesalary)
SalaryRouter.put('/restore/:id',restoresalary)
SalaryRouter.put('/trash/:id',trashsalary)
SalaryRouter.delete('/delete/:id',deletesalary)
export default SalaryRouter