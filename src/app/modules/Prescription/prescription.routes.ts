import express from 'express';
import { PrescriptionController } from './prescription.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { PrescriptionValidation } from './prescription.validation';

const router = express.Router();

router.get(
    '/',
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    PrescriptionController.getAllFromDB
);

router.get(
    '/my-prescription',
    auth(UserRole.PATIENT),
    PrescriptionController.patientPrescription
)

router.post(
    '/',
    auth(UserRole.DOCTOR),
    validateRequest(PrescriptionValidation.create),
    PrescriptionController.insertIntoDB
)


export const PrescriptionRoutes = router;