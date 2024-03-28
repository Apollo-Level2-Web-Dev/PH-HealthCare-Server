import { z } from 'zod';

const create = z.object({
    body: z.object({
        scheduleIds: z.array(z.string()),
    }),
});

export const DoctorScheduleValidation = {
    create,
};