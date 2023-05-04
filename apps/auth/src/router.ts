import { Router } from 'express';
import { validateLoginBody, validateRegisterBody } from './middleware';

export const router = Router();

router.post('/register', validateRegisterBody);

router.post('/login', validateLoginBody);
