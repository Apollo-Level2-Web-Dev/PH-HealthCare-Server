import { Request, Response } from 'express';
import { AdminService } from './admin.service';
import pick from '../../../shared/pick';
import { adminFilterableFields } from './admin.constant';



const getAllFromDB = async (req: Request, res: Response) => {
    try {
        // console.log(req.query)
        const filters = pick(req.query, adminFilterableFields);
        const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
        console.log(options)
        const result = await AdminService.getAllFromDB(filters, options)
        res.status(200).json({
            success: true,
            message: "Admin data fetched!",
            meta: result.meta,
            data: result.data
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err?.name || "Something went wrong",
            error: err
        })
    }
};

const getByIdFromDB = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await AdminService.getByIdFromDB(id);
        res.status(200).json({
            success: true,
            message: "Admin data fetched by id!",
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err?.name || "Something went wrong",
            error: err
        })
    }

}

export const AdminController = {
    getAllFromDB,
    getByIdFromDB
}