import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

class ValidationError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = StatusCodes.BAD_GATEWAY;
    this.message = message;
  }
}
export default ValidationError;
