import { Express, Request, Response } from "express";
import validateResource from "./middleware/validateResource";
import {
  createDestinationSchema,
  updateDestinationSchema,
} from "./schema/destination.schema";
import {
  createDestinationHandler,
  getDestinationsHandler,
  getDestinationByIdHandler,
  deleteDestinationHandler,
  updateDestinationHandler,
} from "./controller/destination.controller";
import { createFeedbackSchema } from "./schema/feedback.schema";
import { createFeedbackHandler, getFeedbackHandler } from "./controller/feedback.controller";

function routes(app: Express) {
  app.get("/destination", getDestinationsHandler);

  app.get("/destination/:id", getDestinationByIdHandler);

  app.post(
    "/destination",
    validateResource(createDestinationSchema),
    createDestinationHandler
  );

  app.delete("/destination/:id", deleteDestinationHandler);

  app.put(
    "/destination/:id",
    validateResource(updateDestinationSchema),
    updateDestinationHandler
  );

  app.post(
    "/feedback/:destinationId",
    validateResource(createFeedbackSchema),
    createFeedbackHandler
  );

  app.get("/feedback/:destinationId",getFeedbackHandler)
}

export default routes;
