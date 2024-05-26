"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Suboflinecource_1 = require("../controllers/Suboflinecource");
const SubcourceRouter = (0, express_1.Router)();
// SubcourceRouter.get('/get/:id',getoneoflinecource)
SubcourceRouter.get('/get/all', Suboflinecource_1.getallsubcource);
SubcourceRouter.post('/new', Suboflinecource_1.Registersubcource);
SubcourceRouter.put('/update/:id', Suboflinecource_1.updatesubcource);
SubcourceRouter.put('/restore/:id', Suboflinecource_1.restorsubcource);
SubcourceRouter.put('/trash/:id', Suboflinecource_1.trashsubcource);
SubcourceRouter.delete('/delete/:id', Suboflinecource_1.deletesubcource);
SubcourceRouter.get('/get/one/:id', Suboflinecource_1.getonesubcource);
exports.default = SubcourceRouter;
