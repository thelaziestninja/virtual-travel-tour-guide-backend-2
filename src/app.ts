import cors from "cors"
import express from "express";
import config from "config";
import connect from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes"


const port = config.get<number>("port");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.listen(port, async () => {
  logger.info(`App is running at port ${port}!`);
  await connect();
  routes(app)
});