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
exports.updateProfile = exports.loginUser = exports.RegisterUser = void 0;
const utils_1 = require("../utils/utils");
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cloudinary_1 = require("cloudinary");
const jwtsecret = process.env.JWT_SECRET;
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const validateUser = utils_1.RegisterSchema.validate(req.body.option);
        if (validateUser.error) {
            res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const passwordHash = yield bcryptjs_1.default.hash(passWord, yield bcryptjs_1.default.genSalt(12));
        const existingUser = yield userModel_1.default.findOne({ email: email });
        let pictureUrl = "";
        if (req.file) {
            const result = yield cloudinary_1.v2.uploader.upload(req.file.path);
            pictureUrl = result.secure_url;
        }
        if (!existingUser) {
            const newUser = yield userModel_1.default.create({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.RegisterUser = RegisterUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.body.username;
        const passWord = req.body.passWord;
        const validateUser = utils_1.LoginSchema.validate(req.body, utils_1.option);
        if (validateUser.error) {
            res.status(400).json({ Error: validateUser.error.details[0].message });
        }
        const User = (yield userModel_1.default.findOne({
            username: username,
        }));
        if (!User) {
            return res.status(400).json({
                error: "User not found",
            });
        }
        const { _id } = User;
        const token = jsonwebtoken_1.default.sign({ _id }, jwtsecret, { expiresIn: "30d" });
        const validUser = yield bcryptjs_1.default.compare(passWord, User.passWord);
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
    }
    catch (error) {
        console.error("Something went wrong login in");
    }
});
exports.loginUser = loginUser;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { passWord, email, age, weight, height, fitnessGoals } = req.body;
        const { error, value } = utils_1.updateProfileSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ Error: error.details.map((err) => err.message) });
        }
        const passwordHash = yield bcryptjs_1.default.hash(passWord, yield bcryptjs_1.default.genSalt(12));
        let pictureUrl = "";
        if (req.file) {
            const result = yield cloudinary_1.v2.uploader.upload(req.file.path);
            pictureUrl = result.secure_url;
        }
        const profile = yield userModel_1.default.findByIdAndUpdate(req.user._id, {
            passWord: passwordHash,
            email,
            age,
            weight,
            height,
            profilePhoto: pictureUrl,
            fitnessGoals,
        }, { new: true });
        if (!profile) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User updated", profile });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
});
exports.updateProfile = updateProfile;
