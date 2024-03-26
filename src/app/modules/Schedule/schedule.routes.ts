import express from 'express';
import { ScheduleController } from './schedule.controller';

const router = express.Router();

router.post('/', ScheduleController.inserIntoDB)


export const ScheduleRoutes = router;