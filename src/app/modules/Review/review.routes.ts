import express from 'express'
import { ReviewController } from './review.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/',
    auth(UserRole.PATIENT),
    ReviewController.insertIntoDB
);


export const ReviewRoutes = router;