"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = __importDefault(require("../middlewares/auth"));
const uploadImage_1 = require("../library/helpers/uploadImage");
const exerciseController_1 = require("../controllers/exerciseController");
const router = express.Router();
router.post("/create_exercise", auth_1.default, uploadImage_1.upload.array("pictures", 6), exerciseController_1.createExercise);
router.get("/get_all_exercise", auth_1.default, exerciseController_1.getAllExercises);
router.get("/get_single_exercise/:id", auth_1.default, exerciseController_1.getSingleExercise);
router.put("/update_exercise/:id", auth_1.default, exerciseController_1.updateExercise);
router.delete("/delete_single_exercise/:id", auth_1.default, exerciseController_1.deleteExercise);
exports.default = router;
