import { connect } from "mongoose";
import { config } from "dotenv";

config();
const dbconnection = async () => {
  connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log("Database connected"))
    .catch((err) => console.error(err));
};
export default dbconnection;
