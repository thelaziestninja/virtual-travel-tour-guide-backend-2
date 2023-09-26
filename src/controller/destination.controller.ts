import logger from "../utils/logger";
import { Request, Response } from "express";
import {
  createDestination,
  deleteDestination,
  getDestinationById,
  getDestinations,
  updateDestination,
} from "../service/destination.service";
import {
  createDestinationInput,
  updateDestinationInput,
} from "../schema/destination.schema";
import { DestinationI } from "../types/destination";

export async function createDestinationHandler(
  req: Request<{}, {}, createDestinationInput["body"]>,
  res: Response
) {
  try {
    const newDestination = await createDestination(req.body as DestinationI); // from destination.service
    return res.status(201).json(newDestination);
  } catch (e: any) {
    logger.error(e);
    res.status(409).send(e);
  }
}

export async function getDestinationsHandler(req: Request, res: Response) {
  try {
    const destinations = await getDestinations(); // from destination.service
    if (!destinations || destinations.length === 0) {
      return res.status(404).send({ error: "No destinations found!" });
    }

    res.status(200).json({
      destinations: destinations,
      count: destinations.length,
    });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function getDestinationByIdHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const destinationId = req.params.id;
    const destination = await getDestinationById(destinationId); // from destination.service

    if (!destination) {
      return res.status(404).send({ error: "Destination not existing!" });
    }

    return res.status(200).json(destination);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

export async function updateDestinationHandler(
  req: Request<{ id: string }, {}, updateDestinationInput["body"]>,
  res: Response
) {
  const { id } = req.params;
  // const { name, description, image_url, country, best_time_to_visit } = req.body; -> not needed after I added updateDestination

  try {
    const destination = await updateDestination(id, req.body as DestinationI); //from destination.service

    if (!destination) {
      return res.status(404).json({ error: "Destination not found!" });
    }

    res.status(200).json(destination);
  } catch (e: any) {
    logger.error("Error updating destination:", e);
    res.status(500).json(e);
  }
}

export async function deleteDestinationHandler(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const destinationId = req.params.id;
    const destination = await deleteDestination(destinationId); //from destination.service

    if (!destination) {
      return res.status(404).json({ error: "Destination not existing!" });
    }

    return res.status(200).json({
      message: `${destination.name} with ID: ${destination._id} has been deleted.`,
    });
  } catch (e: any) {
    logger.error("Error deleting destination by ID:", e);
    return res.status(500).send(e);
  }
}

export default {
  createDestination,
  getDestinationsHandler,
  getDestinationByIdHandler,
  deleteDestinationHandler,
  updateDestinationHandler,
};
