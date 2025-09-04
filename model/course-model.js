import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  subtitle: {
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  thumbnail: {
    type: String,
  },
  modules: [{ type: Schema.ObjectId, ref: "Module" }],

  price: {
    required: true,
    type: Number,
    default: 0,
  },
  active: {
    required: true,
    type: Boolean,
    default: false,
  },

  category: { type: Schema.ObjectId, ref: "Category" },

  instructor: { type: Schema.ObjectId, ref: "User" },

  quizSet: { type: Schema.ObjectId, ref: "Quizset" },

  testimonials: [{ type: Schema.ObjectId, ref: "Testimonial" }],

  learning: {
    type: [String],
  },

  createdOn: {
    required: true,
    type: Date,
    default: Date.now(),
  },

  modifiedOn: {
    required: true,
    type: Date,
    default: Date.now(),
  },
});

export const Course =
  mongoose.models.Course ?? mongoose.model("Course", courseSchema);
