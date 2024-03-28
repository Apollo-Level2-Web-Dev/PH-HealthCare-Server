import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ScheduleService } from "./schedule.sevice";
import pick from "../../../shared/pick";
import { IAuthUser } from "../../interfaces/common";

const inserIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ScheduleService.inserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule created successfully!",
        data: result
    });
});

const getAllFromDB = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const filters = pick(req.query, ['startDate', 'endDate']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

    const user = req.user;
    const result = await ScheduleService.getAllFromDB(filters, options, user as IAuthUser);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Schedule fetched successfully!",
        data: result
    });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ScheduleService.getByIdFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedule retrieval successfully',
        data: result,
    });
});

const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ScheduleService.deleteFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Schedule deleted successfully',
        data: result,
    });
});


export const ScheduleController = {
    inserIntoDB,
    getAllFromDB,
    getByIdFromDB,
    deleteFromDB
};