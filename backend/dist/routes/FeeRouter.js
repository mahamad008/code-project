"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FeeCantroller_1 = require("../controllers/FeeCantroller");
const FeeRouter = (0, express_1.Router)();
FeeRouter.post('/create', FeeCantroller_1.Createfee);
FeeRouter.get('/get/all', FeeCantroller_1.getallfee);
FeeRouter.get('/get/one/:id', FeeCantroller_1.getonefee);
FeeRouter.put('/update/:id', FeeCantroller_1.updatefee);
FeeRouter.put('/trash/:id', FeeCantroller_1.trashfee);
FeeRouter.put('/restore/:id', FeeCantroller_1.retorefee);
FeeRouter.delete('/delete/:id', FeeCantroller_1.deletefee);
FeeRouter.get('/report', FeeCantroller_1.getfeeReportByMonthYear);
// FeeRouter.delete('/:year/:month',Feemont)
exports.default = FeeRouter;
