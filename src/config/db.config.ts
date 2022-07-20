import { connect } from "mongoose";
import { dbURI } from "../constants/constant";

const connectMongo = () => {
  return connect(
    dbURI
    //      {
    //     useCreateIndex: true,
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }
  )
    .then(() => console.log("Connected successfully..."))
    .catch((error: any) => console.log("Error occured", error));
};

export default connectMongo;
