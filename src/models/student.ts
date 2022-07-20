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
    required: true,
  },
  last_name: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["M", "F"],
  },
  subjects: [
    {
      type: String,
      required: true,
    },
  ],
});

const StudentModel = model<Student>("student", studentSchema);
export default StudentModel;
