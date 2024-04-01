import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { SpecialtiesRoutes } from '../modules/Specialties/specialties.routes';
import { DoctorRoutes } from '../modules/Doctor/doctor.routes';
import { PatientRoutes } from '../modules/Patient/patient.route';
import { ScheduleRoutes } from '../modules/Schedule/schedule.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/specialties',
        route: SpecialtiesRoutes
    },
    {
        path: '/doctor',
        route: DoctorRoutes
    },
    {
        path: '/patient',
        route: PatientRoutes
    },
    {
        path: '/schedule',
        route: ScheduleRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;