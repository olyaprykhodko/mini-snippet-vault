import mongoose from 'mongoose';

const { Schema } = mongoose;

export const snippetSchema = new Schema(
  {
    title: String,
    content: String,
    tags: [String],
    type: String, // link/note/command,
  },
  {
    timestamps: true,
  },
);
