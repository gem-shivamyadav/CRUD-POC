import { model, Schema, Document } from "mongoose";

interface Credentials {
  username: string;
  email: string;
  password: string;
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
  },
});

const CredentialSchema = model<Credentials>("credentials", credentials);
export default CredentialSchema;
