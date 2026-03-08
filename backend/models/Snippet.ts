import mongoose from 'mongoose';

const { Schema } = mongoose;

export const snippetSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    tags: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      required: true,
      enum: ['link', 'note', 'command'],
    },
  },
  {
    timestamps: true,
  },
);

snippetSchema.index({ title: 'text', content: 'text' });
