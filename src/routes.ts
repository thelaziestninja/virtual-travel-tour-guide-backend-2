import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import { createDestinationSchema } from "./schema/destination.schema";
import {
  createDestinationHandler,
  getDestinationsHandler,
  getDestinationByIdHandler,
} from "./controller/destination.controller";

function routes(app: Express) {
  app.get("/destination", getDestinationsHandler);

  app.get("/destination/:id", getDestinationByIdHandler);

  app.post(
    "/destination",
    validateResource(createDestinationSchema),
    createDestinationHandler
  );
}

export default routes;
