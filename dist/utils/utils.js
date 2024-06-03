"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateExerciseSchedule = exports.updateExerciseSchema = exports.createExerciseSchedule = exports.updateProfileSchema = exports.option = exports.LoginSchema = exports.RegisterSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.RegisterSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    passWord: joi_1.default.string()
        .min(6)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.string()
        .valid(joi_1.default.ref("passWord"))
        .required()
        .label("confirm_password")
        .messages({ "any.only": "{{#label}} does not match" }),
    email: joi_1.default.string().email().required(),
    age: joi_1.default.string().required(),
    weight: joi_1.default.string().required(),
    height: joi_1.default.string().required(),
    profilePhoto: joi_1.default.string().required(),
    fitnessGoals: joi_1.default.string().required(),
});
exports.LoginSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    passWord: joi_1.default.string()
        .min(6)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
exports.option = {
    abortearly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
exports.updateProfileSchema = joi_1.default.object({
    passWord: joi_1.default.string()
        .min(6)
        .regex(/^[a-zA-Z0-9]{3,30}$/),
    email: joi_1.default.string().email(),
    age: joi_1.default.string(),
    weight: joi_1.default.string(),
    height: joi_1.default.string(),
    profilePhoto: joi_1.default.string(),
    fitnessGoals: joi_1.default.string(),
});
exports.createExerciseSchedule = joi_1.default.object({
    type: joi_1.default.string().required(),
    duration: joi_1.default.string().required(),
    intensityLevel: joi_1.default.string().required(),
});
exports.updateExerciseSchema = joi_1.default.object({
    type: joi_1.default.string().required(),
    duration: joi_1.default.string().required(),
    intensityLevel: joi_1.default.string().required(),
});
exports.updateExerciseSchedule = joi_1.default.object({
    type: joi_1.default.string().optional(),
    duration: joi_1.default.string().optional(),
    intensityLevel: joi_1.default.string().optional(),
});
