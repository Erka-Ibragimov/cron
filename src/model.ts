import mongoose from 'mongoose';

const ActionSchema = new mongoose.Schema({
  trx_id: { type: String, unique: true },
  block_time: String,
  block_num: Number
});

export const Action = mongoose.model('Action', ActionSchema);
