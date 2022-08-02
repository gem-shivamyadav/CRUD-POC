import { model, Schema, Document } from "mongoose";

interface Credentials {
  username: string;
  email: string;
  password: string;
  details: {};
}

export interface CredentialsDocument extends Credentials, Document {}

export const credentials = new Schema<Credentials>({
  username: {
    type: String,
    required: true,
    min: [8, "too short"],
    max: [20, "too long"],
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    min: [8, "too short"],
  },
  details: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
});

const CredentialSchema = model<Credentials>("credentials", credentials);
export default CredentialSchema;
