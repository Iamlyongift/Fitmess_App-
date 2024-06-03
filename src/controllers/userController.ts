import { Request, Response } from "express";
import {
  RegisterSchema,
  option,
  LoginSchema,
  updateProfileSchema,
} from "../utils/utils";
import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinaryV2 } from "cloudinary";

const jwtsecret = process.env.JWT_SECRET as string;

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const passWord = req.body.passWord;
    const confirm_password = req.body.confirm_password;
    const email = req.body.email;
    const age = req.body.age;
    const weight = req.body.weight;
    const height = req.body.height;
    const profilePhoto = req.body.profilePhoto;
    const fitnessGoals = req.body.fitnessGoals;

    //validate user

    const validateUser = RegisterSchema.validate(req.body.option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }
    //Hashing password
    const passwordHash = await bcrypt.hash(passWord, await bcrypt.genSalt(12));

    const existingUser = await UserModel.findOne({ email: email });

    // Initialize a variable to store the picture URL
    let pictureUrl = "";

    // Check if a file was uploaded
    if (req.file) {
      // Upload the image to Cloudinary and retrieve its URL
      const result = await cloudinaryV2.uploader.upload(req.file.path);
      pictureUrl = result.secure_url; // Store the URL of the uploaded picture
    }
    // Create a new user document
    if (!existingUser) {
      const newUser = await UserModel.create({
        username,
        passWord: passwordHash,
        email,
        age,
        weight,
        height,
        profilePhoto: pictureUrl,
        fitnessGoals,
      });
      return res.status(200).json({ msg: "Registration sucessful", newUser });
    }
    res.status(400).json({ error: "user already exist" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

// loginUser
export const loginUser = async (req: Request, res: Response) => {
  try {
    const username = req.body.username;
    const passWord = req.body.passWord;

    //validate user

    const validateUser = LoginSchema.validate(req.body, option);

    if (validateUser.error) {
      res.status(400).json({ Error: validateUser.error.details[0].message });
    }

    //Verify if user exist
    const User = (await UserModel.findOne({
      username: username,
    })) as unknown as { [key: string]: string };

    if (!User) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    const { _id } = User;

    //generate token
    const token = jwt.sign({ _id }, jwtsecret, { expiresIn: "30d" });

    //compare passWord
    const validUser = await bcrypt.compare(passWord, User.passWord);

    if (validUser) {
      return res.status(200).json({
        msg: "Login Successful",
        User,
        token,
      });
    }
    return res.status(400).json({
      error: "Invalid passWord",
    });
  } catch (error) {
    console.error("Something went wrong login in");
  }
};

// export const updateProfile = async (req: Request, res: Response) => {
//   try {
//     const username = req.body.username;
//     const passWord = req.body.passWord;
//     const confirm_password = req.body.confirm_password;
//     const email = req.body.email;
//     const age = req.body.age;
//     const weight = req.body.weight;
//     const height = req.body.height;
//     const profilePhoto = req.body.profilePhoto;
//     const fitnessGoals = req.body.fitnessGoals;
//     // Validate request body

//     const validateUser = updateProfileSchema.validate(req.body, option);
//     if (validateUser.error) {
//       res.status(400).json({ Error: validateUser.error.details[0].message });
//     }

//     const passwordHash = await bcrypt.hash(passWord, await bcrypt.genSalt(12));

//     let pictureUrl = "";

//     // Check if a file was uploaded
//     if (req.file) {
//       // Upload the image to Cloudinary and retrieve its URL
//       const result = await cloudinaryV2.uploader.upload(req.file.path);
//       pictureUrl = result.secure_url; // Store the URL of the uploaded picture
//     }

//     // Find and update the exercise
//     const profile = await UserModel.findOneAndUpdate(
      
//       {
//         username,
//         passWord: passwordHash,
//         email,
//         age,
//         weight,
//         height,
//         profilePhoto: pictureUrl,
//         fitnessGoals,
//       },
//       { new: true }
//     );

//     if (!profile) {
//       return res.status(404).json({ message: "user not found" });
//     }

//     res.status(200).json({ message: "user updated", profile });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An unexpected error occurred" });
//   }
// };
export const updateProfile = async (req: Request | any, res: Response) => {
  try {
    const { passWord, email, age, weight, height, fitnessGoals } = req.body;

    // Validate request body
    const { error, value } = updateProfileSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ Error: error.details.map((err: any) => err.message) });
    }

    // Check password confirmation
  

    const passwordHash = await bcrypt.hash(passWord, await bcrypt.genSalt(12));

    let pictureUrl = "";

    // Check if a file was uploaded
    if (req.file) {
      // Upload the image to Cloudinary and retrieve its URL
      const result = await cloudinaryV2.uploader.upload(req.file.path);
      pictureUrl = result.secure_url; // Store the URL of the uploaded picture
    }

    // Find and update the user profile using the authenticated user's ID
    const profile = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        passWord: passwordHash,
        email,
        age,
        weight,
        height,
        profilePhoto: pictureUrl,
        fitnessGoals,
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated", profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An unexpected error occurred" });
  }
};