"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const exerciseSchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    duration: { type: String, required: true },
    intensityLevel: { type: String, required: true },
    user: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
const Exercise = mongoose_1.default.model("exercise", exerciseSchema);
module.exports = Exercise;
