"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExercise = exports.getSingleExercise = exports.updateExercise = exports.getAllExercises = exports.createExercise = void 0;
const utils_1 = require("../utils/utils");
const exerciseModel_1 = __importDefault(require("../models/exerciseModel"));
const createExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verify = req.user;
        const validateUser = utils_1.createExerciseSchedule.validate(req.body, utils_1.option);
        if (validateUser.error) {
            return res
                .status(400)
                .json({ Error: validateUser.error.details[0].message });
        }
        const { type, duration, intensityLevel } = validateUser.value;
        const newExercise = yield exerciseModel_1.default.create({
            type,
            duration,
            intensityLevel,
            user: verify._id,
        });
        res.status(201).json({ message: "Exercise schedule created", newExercise });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createExercise = createExercise;
const getAllExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllExercise = yield exerciseModel_1.default.find().populate("user");
        res.status(200).json({
            msg: "Todos successfully fetched",
            getAllExercise,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllExercises = getAllExercises;
const updateExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type, duration, intensityLevel } = req.body;
        const { id } = req.params;
        const validateUser = utils_1.updateExerciseSchema.validate(req.body, utils_1.option);
        if (validateUser.error) {
            res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const exercise = yield exerciseModel_1.default.findById({ _id: id });
        if (!exercise) {
            return res.status(400).json({
                error: "exercise not found",
            });
        }
        const updateRecord = yield exerciseModel_1.default.findByIdAndUpdate(id, Object.assign({}, req.body), {
            new: true,
            runValidators: true,
            context: "query",
        });
        if (!updateRecord) {
            return res.status(404).json({
                msg: "exercise not updated",
            });
        }
        return res.status(200).json({
            message: "exercise updates successfully",
            updateRecord,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateExercise = updateExercise;
const getSingleExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const exercise = yield exerciseModel_1.default.findById(id);
        if (!exercise) {
            return res.status(404).json({
                message: "Exercise not found",
            });
        }
        res.status(200).json({
            msg: "exerciseupdate profile successfully fetched",
            exercise,
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSingleExercise = getSingleExercise;
const deleteExercise = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const exercise = yield exerciseModel_1.default.findByIdAndDelete(id);
        if (!exercise) {
            return res.status(404).json({
                message: "Exercise not found",
            });
        }
        res.status(200).json({
            message: "Exercise successfully deleted",
            exercise,
        });
    }
    catch (error) {
        console.log("Problem deleting exercise");
    }
});
exports.deleteExercise = deleteExercise;
