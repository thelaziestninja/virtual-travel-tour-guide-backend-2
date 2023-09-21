import { Express, Request, Response } from "express";
import { createDestinationHandler } from "./controller/destination.controller";
import validateResource from './middleware/validateResourse'
import { createDestinationSchema } from "./schema/destination.schema";

function routes(app: Express) {
  app.get("/destination", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.post("/destination", validateResource(createDestinationSchema), createDestinationHandler)
}
