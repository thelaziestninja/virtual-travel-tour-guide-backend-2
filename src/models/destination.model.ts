import { Schema, model } from "mongoose";

export interface DestinationI extends Document {
  _id: string;
  name: string;
  description: string;
  image_url?: string;
  country: string;
  best_time_to_visit: string;
}

const destinationSchema = new Schema<DestinationI>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    //   required: true,
  },
  country: {
    type: String,
    required: true,
  },
  best_time_to_visit: {
    type: String,
    required: true,
  },
});

export const DestinationM = model<DestinationI>(
  "Destination",
  destinationSchema
);
