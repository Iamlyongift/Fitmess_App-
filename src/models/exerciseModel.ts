import mongoose, { mongo } from "mongoose";

interface ExerciseType {
  [key: string]: string | boolean | Array<string>;
}

const exerciseSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    duration: { type: String, required: true },
    intensityLevel: { type: String, required: true },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Exercise = mongoose.model<ExerciseType>("exercise", exerciseSchema);

export = Exercise;


