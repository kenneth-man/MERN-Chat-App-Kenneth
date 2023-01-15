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
router.patch('/updatePassword', protect, updatePassword);
router
	.route('/:id')
	.get(protect, getUser)
	.patch(protect, updateUser)
	.delete(protect, deleteUser);

export default router;
