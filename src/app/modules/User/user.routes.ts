import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post("/", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), userController.createAdmin);

export const userRoutes = router;