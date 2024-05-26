import { Router } from 'express';
import {
  chartday,
  chartinfouser,
  chatruser,
  deleteuser,
  findinguser,
  updatePermission,
  getAllUsers,
  login,
  makeAdmin,
  // makeAdmin,
  registerUser,
  removeAdmin,
  restoreuser,
  trashuser,
  yearchart,
} from '../controllers/userController';
// import { decodeToken } from '../helpers/security/jwt';
const router = Router();

// create user endpoint
router.post('/register', registerUser);

// login user
router.post('/login', login);
router.post('/chart', chatruser);

// make admin
// router.put('/update/:id',makeAdmin);
router.put('/remove/:id',removeAdmin);
router.put('/trash/:id', trashuser);
router.put('/restore/:id', restoreuser);
router.put('/admin', makeAdmin);
router.delete('/delete/:id',deleteuser)
router.put('/permission/:id',updatePermission)

router.get('/get/all', getAllUsers);
router.get('/get/one/:id',findinguser)
router.get('/api/charts/latest-registered',chartinfouser)
router.get('/get/year/:year',yearchart)
router.get('/get/chartbyday',chartday)


export default router;
