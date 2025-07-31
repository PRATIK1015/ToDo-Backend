
import express from "express";
import md5 from "md5";
import { v4 as uuidv4 } from "uuid";
import { RequestExtended } from "./interfaces/global";
import routes from "./routes";
import { logger } from "./utils/logger";
import cors from "cors";
import { configData } from "./config/config";
import { sanitizeInput } from "./middlewares/sanitizeInput";
import { connectDB } from "./config/db";
import cron from 'node-cron';
import { markExpiredTodosAsCompleted } from "./utils/utils";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./helpers/swagger";

const PORT = configData.port || 8000;

connectDB()

const app = express();
app.use(cors());



app.use(`/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs)
);

app.use((req: RequestExtended, res, next) => {
  req.id = md5(uuidv4());
  req.traceId = req.header("eg-request-id") || "-";
  req.logId = [
    `traceId[${req.traceId}]`,
    `spanId[${req.id}]`,
    `user[${req.header("user.id")
      ? req.header("user.id") + "," + req.header("user.type")
      : "-"
    }]`,
  ].join(" ");
  req.log = (...args: any[]) => {
    logger.info([new Date().toISOString(), req.logId, ...args].join(" "));
  };
  req.error = (...args: any[]) => {
    logger.error([new Date().toISOString(), req.logId, ...args].join(" "));
  };
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sanitizeInput);


app.use(routes);

app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpecs);
});

cron.schedule('0 0 * * *', async () => {
  markExpiredTodosAsCompleted()
});

app.listen(PORT, () => {
  logger.info("Server is listening on port " + PORT);
});
