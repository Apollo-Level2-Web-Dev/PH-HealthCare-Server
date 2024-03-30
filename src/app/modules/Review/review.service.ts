import httpStatus from "http-status";
import prisma from "../../../shared/prisma"
import ApiError from "../../errors/ApiError";
import { IAuthUser } from "../../interfaces/common"

const insertIntoDB = async (user: IAuthUser, payload: any) => {
    const patientData = await prisma.patient.findUniqueOrThrow({
        where: {
            email: user?.email
        }
    });

    const appointmentData = await prisma.appointment.findUniqueOrThrow({
        where: {
            id: payload.appointmentId
        }
    });

    if (!(patientData.id === appointmentData.patientId)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "This is not your appointment!")
    }

    return await prisma.$transaction(async (tx) => {
        const result = await tx.review.create({
            data: {
                appointmentId: appointmentData.id,
                doctorId: appointmentData.doctorId,
                patientId: appointmentData.patientId,
                rating: payload.rating,
                comment: payload.comment
            }
        });

        const averageRating = await tx.review.aggregate({
            _avg: {
                rating: true
            }
        });

        await tx.doctor.update({
            where: {
                id: result.doctorId
            },
            data: {
                averageRating: averageRating._avg.rating as number
            }
        })

        return result;
    })
}

export const ReviewService = {
    insertIntoDB
}