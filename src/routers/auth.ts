import {
  CreateUserSchema,
  SignInValidationSchema,
  TokenAndIDValidation,
  UpdatePasswordSchema,
} from "@/utils/validationSchema";
import { validate } from "@/middleware/validator";
import {
  createUser,
  generateForgetPasswordLink,
  grantValid,
  sendProfile,
  sendReVerificationToken,
  signIn,
  updatePassword,
  verifyEmail,
} from "@/controllers/user";
import { Router } from "express";
import { isValidPassResetToken, mustAuth } from "@/middleware/auth";

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
router.post("/sign-in", validate(SignInValidationSchema), signIn);
router.get("/is-auth", mustAuth, sendProfile);

export default router;
