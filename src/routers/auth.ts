import { CreateUserSchema } from "@/utils/validationSchema";
import { validate } from "@/middleware/validator";
import { createUser } from "@/controllers/user";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), createUser);

export default router;
