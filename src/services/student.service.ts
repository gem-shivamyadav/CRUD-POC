import { DocumentDefinition, FilterQuery, UpdateQuery } from "mongoose";
import Credential, { CredentialsDocument } from "../models/credentials.model";
import bcrypt from "bcryptjs";
import Student, { StudentDocument } from "../models/student.model";

async function create(
  data: DocumentDefinition<StudentDocument>,
  username: string
) {
  const student = new Student(data);
  await student.save().then(async (s) => {
    const credential = await Credential.findOne({ username: username });
    credential!.details = s._id;
    await credential!.save();
    return credential;
  });
  return student;
}

function findCredentials(username: string) {
  return Credential.findOne({ username: username });
}

function find(username: string) {
  return Credential.findOne({ username: username }).populate({
    path: "details",
  });
}

// async function findAndSaveDetails(
//   query: FilterQuery<StudentDocument>,
//   detailsId: string
// ) {
//   const credentials = await Credential.findOne(query);
//   await credentials?.save().then(async (c) => {
//     c.details = detailsId;
//   });
// }

function showAll() {
  return Student.find();
}

async function saveCredentials(data: DocumentDefinition<CredentialsDocument>) {
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  return Credential.create(data);
}

async function checkUsernamePassword(username: string, password: string) {
  const userCredential = await Credential.findOne({
    username: username,
  }).select("+password");
  if (userCredential) {
    const validPassword = await bcrypt.compare(
      password,
      userCredential.password
    );
    return validPassword;
  }
}

function update(
  query: FilterQuery<StudentDocument>,
  update: UpdateQuery<StudentDocument>
) {
  return Student.updateOne(query, update);
}

function deleteStudent(query: FilterQuery<StudentDocument>) {
  return Student.findOneAndDelete(query);
}

export {
  create,
  update,
  find,
  deleteStudent,
  showAll,
  saveCredentials,
  checkUsernamePassword,
  findCredentials,
};
