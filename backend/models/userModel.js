const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      match: [/^[0-9]{10}$/, "Mobile must be 10 digits"],
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Gender is required"],
    },
    status: {
      type: String,
      enum: ["Active", "InActive"],
      default: "Active",
    },
    profileImage: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);