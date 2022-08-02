import { Schema, Document, model } from "mongoose";

interface Student {
  first_name: string;
  last_name: string;
  age: number;
  gender: "M" | "F";
  subjects: string[];
  dob: Date;
}

export interface StudentDocument extends Student, Document {}

const studentSchema = new Schema<Student>({
  first_name: {
    type: String,
    min: [3, "first_name is too short"],
    max: [20, "last_name is too long"],
  },
  last_name: {
    type: String,
    min: [3, "first_name is too short"],
    max: [20, "last_name is too long"],
  },
  age: {
    type: Number,
    min: [13, "first_name is too short"],
    max: [80, "last_name is too long"],
  },
  gender: {
    type: String,
    enum: ["M", "F"],
    message: "{value} is not supported",
  },
  subjects: [
    {
      type: String,
      required: [true, "subject fields are required!"],
    },
  ],
});

const StudentModel = model<Student>("student", studentSchema);
export default StudentModel;
