import express = require("express");
import {
  RegisterUser,
  loginUser,
  updateProfile,
} from "../controllers/userController";
import { upload } from "../library/helpers/uploadImage";
import auth from "../middlewares/auth";

const router = express.Router();

/* GET users listing. */
router.post("/register_user", upload.single("profilePhoto"), RegisterUser);
router.post("/login", loginUser);
router.put(
  "/update_profile",
  auth,
  upload.single("profilePhoto"),
  updateProfile
);

export default router;
