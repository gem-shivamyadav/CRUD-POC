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
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  details: {
    type: Schema.Types.ObjectId,
    ref: "student",
  },
});

const CredentialSchema = model<Credentials>("credentials", credentials);
export default CredentialSchema;
