"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import {Router} from 'express';
// import paymentrouter from './PaymentRoouter';
const Requestmethod_1 = require("../controllers/Requestmethod");
// const   RequestpaymentRouter=Router()
// paymentrouter.post('/new',createRequestPayment)
// paymentrouter.get('/get/all',getallRequestpayment)
// export default RequestpaymentRouter;
const express_1 = require("express");
// import { deleteonesection, findisection, getonsesection, manysections, newsection, updating } from "../controllers/Section";
const RequestpaymentRouter = (0, express_1.Router)();
// RequestpaymentRouter.get('/get/one/:secId',getonsesection)
// RequestpaymentRouter.get('/get/one/lesson/:id',findisection)
RequestpaymentRouter.get('/get/all', Requestmethod_1.getallRequestpayment);
// RequestpaymentRouter.delete('/delete/:id',deleteonesection)
// RequestpaymentRouter.put('/update/:id',updating)
RequestpaymentRouter.post('/new', Requestmethod_1.createRequestPayment);
RequestpaymentRouter.put('/trash/:id', Requestmethod_1.trashrequest);
// RequestpaymentRouter.put('/restore',restoreRequest)
RequestpaymentRouter.put('/restore/:id', Requestmethod_1.restoreRequest);
RequestpaymentRouter.put('/confirm/:Requstpaymentid', Requestmethod_1.confirmrequest);
RequestpaymentRouter.delete('/delete/:id', Requestmethod_1.deleterequest);
exports.default = RequestpaymentRouter;
