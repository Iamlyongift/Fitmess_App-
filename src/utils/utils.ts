import Joi from "joi";

// export const RegisterSchema = Joi.object({
//   username: Joi.string().required(),
//   passWord: Joi.string()
//     .min(6)
//     .regex(/^[a-zA-Z0-9]{3,30}$/)
//     .required(),
//   confirm_password: Joi.string()
//     .valid(Joi.ref("passWord"))
//     .required()
//     .label("confirm passWord")
//     .messages({ "any.only": "{{#label}} does not match" }),
//   email: Joi.string().email().required(),

//   age: Joi.string().required(),
//   weight: Joi.string().required(),
//   height: Joi.number().required(),
//   profilePhoto: Joi.string().required(),
//   fitnessGoals: Joi.string().required(),
// });

export const RegisterSchema = Joi.object({
  username: Joi.string().required(),
  passWord: Joi.string()
    .min(6)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("passWord"))
    .required()
    .label("confirm_password")
    .messages({ "any.only": "{{#label}} does not match" }),
  email: Joi.string().email().required(),
  age: Joi.string().required(),
  weight: Joi.string().required(),
  height: Joi.string().required(),
  profilePhoto: Joi.string().required(), // Changed to string to match Mongoose schema
  fitnessGoals: Joi.string().required(),
});

export const LoginSchema = Joi.object({
  username: Joi.string().required(),
  passWord: Joi.string()
    .min(6)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

export const option = {
  abortearly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};

export const updateProfileSchema = Joi.object({
  passWord: Joi.string()
    .min(6)
    .regex(/^[a-zA-Z0-9]{3,30}$/),
  email: Joi.string().email(),
  age: Joi.string(),
  weight: Joi.string(),
  height: Joi.string(),
  profilePhoto: Joi.string(), // Changed to string to match Mongoose schema
  fitnessGoals: Joi.string(),
});

export const createExerciseSchedule = Joi.object({
  type: Joi.string().required(),
  duration: Joi.string().required(),
  intensityLevel: Joi.string().required(),
});

export const updateExerciseSchema = Joi.object({
  type: Joi.string().required(),
  duration: Joi.string().required(),
  intensityLevel: Joi.string().required(),
});

export const updateExerciseSchedule = Joi.object({
  type: Joi.string().optional(),
  duration: Joi.string().optional(),
  intensityLevel: Joi.string().optional(),
});
