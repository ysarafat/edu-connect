import mongoose, { Schema } from "mongoose";

const lessonSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
    required: false,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
    default: 0,
  },
  video_url: {
    required: false,
    type: String,
  },
  active: {
    required: true,
    type: Boolean,
    default: false,
  },
  slug: {
    required: true,
    type: String,
  },
  access: {
    required: true,
    type: String,
    default: "private",
  },
  order: {
    required: true,
    type: Number,
  },
});

export const Lesson =
  mongoose.models.Lesson ?? mongoose.model("Lesson", lessonSchema);
