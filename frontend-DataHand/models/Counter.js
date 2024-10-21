// models/Counter.js
import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    required: true,
  },
});

const Counter =
  mongoose.models.Counter || mongoose.model('Counter', counterSchema);
export default Counter;
