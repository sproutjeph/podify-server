import {
  CreateUserSchema,
  TokenAndIDValidation,
} from "@/utils/validationSchema";
import { validate } from "@/middleware/validator";
import {
  createUser,
  sendReVerificationToken,
  verifyEmail,
} from "@/controllers/user";
import { Router } from "express";

const router = Router();

router.post("/create", validate(CreateUserSchema), createUser);
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);

export default router;
