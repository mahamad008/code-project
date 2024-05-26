import { Router } from "express"
import { Registersubcource, deletesubcource, getallsubcource, getonesubcource, restorsubcource, trashsubcource, updatesubcource } from "../controllers/Suboflinecource"
const SubcourceRouter=Router()
// SubcourceRouter.get('/get/:id',getoneoflinecource)
SubcourceRouter.get('/get/all',getallsubcource)
SubcourceRouter.post('/new',Registersubcource)
SubcourceRouter.put('/update/:id',updatesubcource)
SubcourceRouter.put('/restore/:id',restorsubcource)
SubcourceRouter.put('/trash/:id',trashsubcource)
SubcourceRouter.delete('/delete/:id',deletesubcource)
SubcourceRouter.get('/get/one/:id',getonesubcource)
export default SubcourceRouter