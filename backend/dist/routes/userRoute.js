"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
// import { decodeToken } from '../helpers/security/jwt';
const router = (0, express_1.Router)();
// create user endpoint
router.post('/register', userController_1.registerUser);
// login user
router.post('/login', userController_1.login);
router.post('/chart', userController_1.chatruser);
// make admin
// router.put('/update/:id',makeAdmin);
router.put('/remove/:id', userController_1.removeAdmin);
router.put('/trash/:id', userController_1.trashuser);
router.put('/restore/:id', userController_1.restoreuser);
router.put('/admin', userController_1.makeAdmin);
router.delete('/delete/:id', userController_1.deleteuser);
router.put('/permission/:id', userController_1.updatePermission);
router.get('/get/all', userController_1.getAllUsers);
router.get('/get/one/studentlesson/:id', userController_1.studentlesson);
router.get('/get/one/:id', userController_1.findinguser);
router.get('/get/teachercource/:id', userController_1.getoneTeacherDashboardcource);
router.get('/api/charts/latest-registered', userController_1.chartinfouser);
router.get('/get/year/:year', userController_1.yearchart);
router.get('/get/chartbyday', userController_1.chartday);
router.get('/dashboardteacher/:id', userController_1.teacherdashboard);
exports.default = router;
