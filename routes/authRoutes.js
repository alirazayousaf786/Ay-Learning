import express from 'express';
import { registerForm , getAllUsers } from '../controllers/RegisterControl.js';

const router = express.Router();

router.post('/register', registerForm);
router.get('/register', getAllUsers)

export default router;
