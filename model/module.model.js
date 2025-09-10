import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
  title: {
    required: true,
    type: String,
  },
  description: {
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
  course: {
    required: true,
    type: Schema.ObjectId,
  },
  lessonIds: {
    required: true,
    type: [Schema.ObjectId],
  },
  // duration: {
  //   required: true,
  //   type: Number,
  // },
  order: {
    required: true,
    type: Number,
  },
});

export const Module =
  mongoose.models.Module ?? mongoose.model("Module", moduleSchema);
