import {Router} from 'express'
import { createOflineCategory, deleteOflineCategory, getAlloflineCategories, getOneOflineCategory, retoreoflinecatgory, trashoflinecategory, updateOflineCategory } from '../controllers/OflineCategory';
const oflineCategoryRouter=Router();
oflineCategoryRouter.post('/New',createOflineCategory)
oflineCategoryRouter.get('/get/one/:OflineCatId',getOneOflineCategory)
oflineCategoryRouter.get('/get/all',getAlloflineCategories)
oflineCategoryRouter.put('/update/:OflineCatId',updateOflineCategory)
oflineCategoryRouter.put('/retore/:id',retoreoflinecatgory)
oflineCategoryRouter.put('/trash/:id',trashoflinecategory)
oflineCategoryRouter.delete('/delete/:OflineCatId',deleteOflineCategory)
export default oflineCategoryRouter;