import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AppointmentService } from "./appointment.service";
import { IAuthUser } from "../../interfaces/common";
import pick from "../../../shared/pick";
import { appointmentFilterableFields } from "./appointment.constant";

const createAppointment = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

    const user = req.user;

    const result = await AppointmentService.createAppointment(user as IAuthUser, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Appointment booked successfully!",
        data: result
    })
});

const getMyAppointment = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const filters = pick(req.query, ['status', 'paymentStatus']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const result = await AppointmentService.getMyAppointment(user as IAuthUser, filters, options);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'My Appointment retrive successfully',
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, appointmentFilterableFields)
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
    const result = await AppointmentService.getAllFromDB(filters, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Appointment retrieval successfully',
        meta: result.meta,
        data: result.data,
    });
});

const changeAppointmentStatus = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    const result = await AppointmentService.changeAppointmentStatus(id, status, user as IAuthUser);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Appointment status changed successfully',
        data: result
    });
});

export const AppointmentController = {
    createAppointment,
    getMyAppointment,
    getAllFromDB,
    changeAppointmentStatus
}