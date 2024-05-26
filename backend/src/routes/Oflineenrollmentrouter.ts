import { Router } from "express";
import { RegisterOflineenrollment, deleteOflineenrollment, getallfolineenrollment, getoneofllineenrollment, restoreOflineenrollment, trashoflineEnrollment, updateoflinenrollment } from "../controllers/OflineEnrollment";
const oflineenrollmentrouter=Router()
oflineenrollmentrouter.get('/get/all/data',getallfolineenrollment)
oflineenrollmentrouter.get('/featch/only/:id',getoneofllineenrollment)
oflineenrollmentrouter.post('/new',RegisterOflineenrollment)
oflineenrollmentrouter.put('/update/:id',updateoflinenrollment)
oflineenrollmentrouter.put('/restore/:id',restoreOflineenrollment)
oflineenrollmentrouter.put('/trash/:id',trashoflineEnrollment)
oflineenrollmentrouter.delete('/delete/:id',deleteOflineenrollment)
export default oflineenrollmentrouter
