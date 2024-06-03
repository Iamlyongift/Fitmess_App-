import { Request, Response } from "express";
import {
  updateExerciseSchema,
  createExerciseSchedule,
  option,
} from "../utils/utils";
import Exercise from "../models/exerciseModel";

export const createExercise = async (req: Request | any, res: Response) => {
  try {
    const verify = req.user;

    // Validate the request body
    const validateUser = createExerciseSchedule.validate(req.body, option);
    if (validateUser.error) {
      return res
        .status(400)
        .json({ Error: validateUser.error.details[0].message });
    }

    const { type, duration, intensityLevel } = validateUser.value;

    // Create a new exercise entry in the database
    const newExercise = await Exercise.create({
      type,
      duration,
      intensityLevel,
      user: verify._id, // Ensure user ID is associated with the exercise
    });

    // Respond with success message and the created exercise
    res.status(201).json({ message: "Exercise schedule created", newExercise });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllExercises = async (req: Request, res: Response) => {
  try {
    const getAllExercise = await Exercise.find().populate("user");
    res.status(200).json({
      msg: "Todos successfully fetched",
      getAllExercise,
    });
  } catch (error) {
    console.log(error);
  }
};


export const updateExercise = async (req: Request, res: Response) => {
  try {
    const {type, duration, intensityLevel} = req.body

    const { id } = req.params;
    //validate todo form inputs
    const validateUser = updateExerciseSchema.validate(req.body, option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }

    const exercise = await Exercise.findById({ _id: id });

    if (!exercise) {
      return res.status(400).json({
        error: "exercise not found",
      });
    }
    const updateRecord = await Exercise.findByIdAndUpdate(
      id,
      {
      ...req.body
      },

      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );

    if (!updateRecord) {
      return res.status(404).json({
        msg: "exercise not updated",
      });
    }

    return res.status(200).json({
      message: "exercise updates successfully",
      updateRecord,
    });
  } catch (error) {
    console.log(error);
  }
};




export const getSingleExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const exercise = await Exercise.findById(id);

    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      msg: "exerciseupdate profile successfully fetched",
      exercise,
    });
  } catch (error) {
    console.log(error);
  }
};






export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exercise = await Exercise.findByIdAndDelete(id);

    if (!exercise) {
      return res.status(404).json({
        message: "Exercise not found",
      });
    }

    res.status(200).json({
      message: "Exercise successfully deleted",
      exercise,
    });
  } catch (error) {
    console.log("Problem deleting exercise");
  }
};
