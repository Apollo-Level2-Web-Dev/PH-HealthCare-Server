import { z } from "zod";

const create = z.object({
    title: z.string({
        required_error: "Title is required!"
    })
});

export const SpecialtiesValidtaion = {
    create
}