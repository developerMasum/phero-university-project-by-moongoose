import { z } from "zod"

const userValidationSchema = z.object ({
    password: z.string().max(20).optional(),

})


export default userValidation = {
    userValidationSchema,
}