import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import { createDestinationSchema } from "./schema/destination.schema";
import {
  createDestinationHandler,
  getDestinationsHandler,
} from "./controller/destination.controller";

function routes(app: Express) {
  app.get("/destination", getDestinationsHandler);

  app.post(
    "/destination",
    validateResource(createDestinationSchema),
    createDestinationHandler
  );
}

export default routes;
