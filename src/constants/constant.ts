const prodURI =
  "mongodb+srv://shivamyadav:shivam7007@cluster0.1xfqotc.mongodb.net/?retryWrites=true&w=majority";
const devURI = "mongodb://127.0.0.1:27017/student";
const dbURI = process.env.NODE_ENV === "production" ? prodURI : devURI;

export { dbURI };
