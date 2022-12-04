import express, { Router } from 'express';
import {
	getUser,
	updateUser,
	deleteUser
} from '../controllers/userController';

const router: Router = express.Router();

// router.post('/signup', signup);
// router.post('/login', login);
// router.post('/forgotPassword', forgotPassword);
// router.patch('/resetPassword/:token', resetPassword);

// router.use(protect);

// router.patch('/updatePassword', updatePassword);
// router.patch('/updateMe', updateMe);
// router.delete('/deleteMe', deleteMe);

router
	.route('/:id')
	.get(getUser)
	.patch(updateUser)
	.delete(deleteUser);

export default router;
