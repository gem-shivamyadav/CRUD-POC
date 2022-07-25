import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Credential, { CredentialsDocument } from "../models/credentials.model";
import bcrypt from "bcryptjs";
import Student, { StudentDocument } from "../models/student.model";

function create(data: DocumentDefinition<StudentDocument>) {
  return Student.create(data);
}

function find(
  query: FilterQuery<StudentDocument>,
  options: QueryOptions = { lean: true }
) {
  return Student.find(query, {}, options);
}

function showAll() {
  return Student.find();
}

async function saveCredentials(data: DocumentDefinition<CredentialsDocument>) {
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);
  return Credential.create(data);
}

async function checkUsernamePassword(username: string, password: string) {
  const userCredential = await Credential.findOne({ username: username });
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
  update: UpdateQuery<StudentDocument>,
  option?: QueryOptions
) {
  return Student.updateOne(query, update, option);
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
};
