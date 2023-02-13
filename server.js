import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";

// error
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

// route
import authRoute from "./routes/authRoutes.js";
import employeeRoute from "./routes/employeeRoutes.js";
import employeeStatusRoutes from "./routes/employeeStatusRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

// route
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/employee", employeeRoute);
app.use("/api/v1/employeeStatus", employeeStatusRoutes);

// middleware implementation
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
