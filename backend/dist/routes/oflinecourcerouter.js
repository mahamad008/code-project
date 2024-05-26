"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Oflinecource_1 = require("../controllers/Oflinecource");
const oflinecourcesrouter = (0, express_1.Router)();
// oflinecourcesrouter.get('/get/:id',getoneoflinecource)
oflinecourcesrouter.get('/get/all', Oflinecource_1.getalloflinecources);
oflinecourcesrouter.post('/new', Oflinecource_1.Regiteroflinecource);
oflinecourcesrouter.put('/update/:id', Oflinecource_1.updateoflinecource);
oflinecourcesrouter.put('/retore/:id', Oflinecource_1.restoreoflinecource);
oflinecourcesrouter.put('/trash/:id', Oflinecource_1.trashoflinecource);
oflinecourcesrouter.delete('/delete/:id', Oflinecource_1.deleteoflinecource);
oflinecourcesrouter.get('/get/one/:id', Oflinecource_1.getoneoflinecource);
exports.default = oflinecourcesrouter;
