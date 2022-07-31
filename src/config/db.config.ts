import { connect } from "mongoose";
import { dbURI } from "../constants/constant";

const connectMongo = () => {
  return connect(dbURI!)
    .then(() => console.log("Connected successfully..."))
    .catch((error: any) => console.log("Error occured", error));
};

export default connectMongo;
