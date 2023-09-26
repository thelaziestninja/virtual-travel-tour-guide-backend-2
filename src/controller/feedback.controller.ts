import logger from "../utils/logger";
import { Request, Response } from "express";
import { createFeedbackInput } from "../schema/feedback.schema";
import { FeedbackI } from "../types/feedback";
import { DestinationM } from "../models/destination.model";
import { FeedbackM } from "../models/feedback.model";
import { getDestinationById } from "../service/destination.service";

export async function createFeedbackHandler(
  req: Request<{ destinationId: string & createFeedbackInput["body"] }>,
  res: Response<FeedbackI | { error: string }>
) {
  const destinationId = req.params.destinationId;
  const { feedback_text, left_by } = req.body;

  try {
    const destination = await DestinationM.findById(destinationId);

    if (!destination) {
      return res.status(404).send({ error: "Destination not existing!" });
    }

    const feedback = new FeedbackM({
      destination_id: destinationId,
      feedback_text,
      left_by,
    });

    await feedback.save();

    // Construct the response object - not working due to type mismatch
    // const feedbackResponse: FeedbackI = {
    //   _id: feedback._id, // Feedback ID
    //   destination_id: feedback.destination_id, // Associated Destination ID
    //   feedback_text: feedback.feedback_text, // Feedback Text
    //   left_by: feedback.left_by, // Left By
    //   feedback_date: feedback.feedback_date, // Feedback Date
    // };

    res.status(201).json(feedback);
  } catch (e: any) {
    logger.error(e);
    res.status(500).send(e.message);
  }
}

export async function getFeedbackHandler(
  req: Request<{ destinationId: string }>,
  res: Response<FeedbackI[] | { error: string }>
) {
  try {
    const destinationId = req.params.destinationId;
    const destination = await getDestinationById(destinationId);
    if (!destination) {
      return res.status(404).send({ error: "Destination not existing!" });
    }
    const feedback = await FeedbackM.find({ destination_id: destinationId });
    if (!feedback) {
      return res.status(404).send({ error: "Feedback not existing!" });
    }

    res.status(200).send(feedback);
  } catch (e: any) {
    logger.error(e);
    res.status(500).send(e.message);
  }
}
