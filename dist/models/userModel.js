"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, unique: true },
    passWord: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: String, required: true },
    weight: { type: String, required: true },
    height: { type: String, required: true },
    profilePhoto: { type: String, required: true },
    fitnessGoals: { type: String, required: true },
    exercise: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "exercise"
        }]
}, {
    timestamps: true,
});
const UserModel = mongoose_1.default.model("User", userSchema);
module.exports = UserModel;
