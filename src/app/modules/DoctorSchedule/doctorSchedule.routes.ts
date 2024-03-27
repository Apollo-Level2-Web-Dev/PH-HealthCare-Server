import express from 'express';
import { DoctorScheduleController } from './doctorSchedule.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/',
    auth(UserRole.DOCTOR),
    DoctorScheduleController.insertIntoDB
)


export const DoctorScheduleRoutes = router;