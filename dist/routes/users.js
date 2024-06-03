"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const userController_1 = require("../controllers/userController");
const uploadImage_1 = require("../library/helpers/uploadImage");
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = express.Router();
router.post("/register_user", uploadImage_1.upload.single("profilePhoto"), userController_1.RegisterUser);
router.post("/login", userController_1.loginUser);
router.put("/update_profile", auth_1.default, uploadImage_1.upload.single("profilePhoto"), userController_1.updateProfile);
exports.default = router;
