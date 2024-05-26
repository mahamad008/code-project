import { Router } from "express";
import { Regiteroflinecource, deleteoflinecource, getalloflinecources, getoneoflinecource, restoreoflinecource, trashoflinecource, updateoflinecource } from "../controllers/Oflinecource";
const oflinecourcesrouter=Router()
// oflinecourcesrouter.get('/get/:id',getoneoflinecource)
oflinecourcesrouter.get('/get/all',getalloflinecources)
oflinecourcesrouter.post('/new',Regiteroflinecource)
oflinecourcesrouter.put('/update/:id',updateoflinecource)
oflinecourcesrouter.put('/retore/:id',restoreoflinecource)
oflinecourcesrouter.put('/trash/:id',trashoflinecource)
oflinecourcesrouter.delete('/delete/:id',deleteoflinecource)
oflinecourcesrouter.get('/get/one/:id',getoneoflinecource)
export default oflinecourcesrouter