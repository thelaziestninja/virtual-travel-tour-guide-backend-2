import { Request, Response } from "express";
import logger from "../utils/logger";
import { createDestination } from "../service/destination.service";
import { createDestinationInput } from "../schema/destination.schema";
import { DestinationI, DestinationM } from "../models/destination.model";

export async function createDestinationHandler(
  req: Request<{}, {}, createDestinationInput["body"]>,
  res: Response
) {
  try {
    const newDestination = await createDestination(req.body as DestinationI);
    return res.status(201).json(newDestination);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getDestinationsHandler(req: Request, res: Response) {
  try {
    const destinations = await DestinationM.find().exec();
    return res.status(200).json({
      destinations: destinations,
      count: destinations.length,
    });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getDestinationByIdHandler(req: Request, res: Response) {
  try {
    const destinationId = req.params.id;
    const destination = await DestinationM.findById(destinationId);

    if (!destinationId) {
      return res.status(404).send({ error: "No destinations found!" });
    }

    return res.status(200).json(destination);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export default {
  createDestination,
  getDestinationsHandler,
  getDestinationByIdHandler,
};
