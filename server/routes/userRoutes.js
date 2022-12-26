import express from 'express';
import {
	protect,
	signup,
	login,
	forgotPassword,
	resetPassword,
	updatePassword
} from '../controllers/authController.js';
import {
	getUser,
	updateUser,
	deleteUser
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// router.use(protect);

router.patch('/updatePassword', updatePassword);

router
	.route('/:id')
	.get(getUser)
	.patch(updateUser)
	.delete(deleteUser);

export default router;
