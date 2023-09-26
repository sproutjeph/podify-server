import { CreateUserSchema } from "@/utils/validationSchema";
import { validate } from "@/middleware/validator";
import { createUser, verifyEmail } from "@/controllers/user";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), createUser);
router.post("/verify-email", verifyEmail);

export default router;
