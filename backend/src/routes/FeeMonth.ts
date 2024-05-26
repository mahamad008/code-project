import { Router } from "express";
import { CreatefeeMonth, GetFeemonth, deletefeeMonth, getallfeeMonth, getonefeeMonth, retorefeeMonth, trashfeeMonth, updatefeeMonth } from "../controllers/FeeMonth";
const feeMonthRouter=Router();
feeMonthRouter.post('/create',CreatefeeMonth)
feeMonthRouter.get('/all',getallfeeMonth)
feeMonthRouter.get('/get/:id',getonefeeMonth)
feeMonthRouter.get('/get/detail/:id',GetFeemonth)
feeMonthRouter.delete('/delete/:id',deletefeeMonth)
feeMonthRouter.put('/update/:id',updatefeeMonth)
feeMonthRouter.put('/trash/:id',trashfeeMonth)
feeMonthRouter.put('/restore/:id',retorefeeMonth)
export default feeMonthRouter;