import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";

import Student, { StudentDocument } from "../models/student";

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

export { create, update, find, deleteStudent, showAll };
