import {
  CreateUserSchema,
  TokenAndIDValidation,
  UpdatePasswordSchema,
} from "@/utils/validationSchema";
import { validate } from "@/middleware/validator";
import {
  createUser,
  generateForgetPasswordLink,
  grantValid,
  sendReVerificationToken,
  updatePassword,
  verifyEmail,
} from "@/controllers/user";
import { Router } from "express";
import { isValidPassResetToken } from "@/middleware/auth";

const router = Router();

router.post("/create", validate(CreateUserSchema), createUser);
router.post("/verify-email", validate(TokenAndIDValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forget-password", generateForgetPasswordLink);
router.post(
  "/verify-password-reset-token",
  validate(TokenAndIDValidation),
  isValidPassResetToken,
  grantValid
);

router.post(
  "/update-password",
  validate(UpdatePasswordSchema),
  isValidPassResetToken,
  updatePassword
);

export default router;
