import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/user';

const router = Router();

router.post('/users/register', registerUser);

router.post('/users/login', loginUser);

router.post('/users/logout', logoutUser);

export default router;
