import express from 'express';
import { userRoutes } from '../modules/User/user.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/user',
        route: userRoutes
    },
    {
        path: '/admin',
        route: AdminRoutes
    }
];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;