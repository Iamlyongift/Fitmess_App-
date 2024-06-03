import express = require("express");
import auth from "../middlewares/auth";
import { upload } from "../library/helpers/uploadImage";

import {
  createExercise,
  getAllExercises,
  getSingleExercise,
  deleteExercise,
  updateExercise,
} from "../controllers/exerciseController";
const router = express.Router();

/* GET home page. */
router.post(
  "/create_exercise",
  auth,
  upload.array("pictures", 6),
  createExercise
);

router.get("/get_all_exercise", auth, getAllExercises);
router.get("/get_single_exercise/:id", auth, getSingleExercise);
router.put("/update_exercise/:id", auth, updateExercise);

router.delete("/delete_single_exercise/:id", auth, deleteExercise);
export default router;
