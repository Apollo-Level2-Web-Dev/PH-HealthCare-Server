import { Request, Response } from "express";
import { userService } from "./user.sevice";

const createAdmin = async (req: Request, res: Response) => {
    //console.log(req.body);
    const result = await userService.createAdmin(req.body);
    res.send(result)
};

export const userController = {
    createAdmin
}