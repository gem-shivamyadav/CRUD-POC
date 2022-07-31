import "dotenv/config";
const dbURI =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_URI
    : process.env.DEV_URI;

export { dbURI };
