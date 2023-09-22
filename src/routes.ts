import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import { createDestinationSchema } from "./schema/destination.schema";
import {
  createDestinationHandler,
  getDestinationsHandler,
  getDestinationByIdHandler,
  deleteDestinationHandler,
} from "./controller/destination.controller";

function routes(app: Express) {
  app.get("/destination", getDestinationsHandler);

  app.get("/destination/:id", getDestinationByIdHandler);

  app.post(
    "/destination",
    validateResource(createDestinationSchema),
    createDestinationHandler
  );

  app.delete("/destination/:id", deleteDestinationHandler);
}

export default routes;
