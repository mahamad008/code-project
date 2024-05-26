"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OflineEnrollment_1 = require("../controllers/OflineEnrollment");
const oflineenrollmentrouter = (0, express_1.Router)();
oflineenrollmentrouter.get('/get/all/data', OflineEnrollment_1.getallfolineenrollment);
oflineenrollmentrouter.get('/featch/only/:id', OflineEnrollment_1.getoneofllineenrollment);
oflineenrollmentrouter.post('/new', OflineEnrollment_1.RegisterOflineenrollment);
oflineenrollmentrouter.put('/update/:id', OflineEnrollment_1.updateoflinenrollment);
oflineenrollmentrouter.put('/restore/:id', OflineEnrollment_1.restoreOflineenrollment);
oflineenrollmentrouter.put('/trash/:id', OflineEnrollment_1.trashoflineEnrollment);
oflineenrollmentrouter.delete('/delete/:id', OflineEnrollment_1.deleteOflineenrollment);
exports.default = oflineenrollmentrouter;
