import express from 'express';
import { ScheduleController } from './schedule.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get(
    '/',
    auth(UserRole.DOCTOR),
    ScheduleController.getAllFromDB
)

router.post(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    ScheduleController.inserIntoDB
);

/**
 * API ENDPOINT: /schedule/:id
 * 
 * Get schedule data by id
 */

/**
 * API ENDPOINT: /schdeule/:id
 * 
 * Delete schedule data by id
 */

export const ScheduleRoutes = router;