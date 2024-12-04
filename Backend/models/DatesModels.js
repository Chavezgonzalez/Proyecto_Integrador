import { Schema, model } from 'mongoose';

const DatesSchema = new Schema({
  name_pet: {
    type: String,
    required: true,
  },
  age_pet: {
    type: String,
    required: true,
  },
  name_user: {
    type: String,
    required: true,
  },
  constact_number: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export const DatesModel = mongoose.model('dates', DatesSchema);