import logger from "../utils/logger";
import { Request, Response } from "express";
import { FeedbackI } from "../types/feedback";
import {
  createFeedback,
  deleteFeedback,
  getFeedbacks,
} from "../service/feedback.service";
import { createFeedbackInput } from "../schema/feedback.schema";
import { getDestinationById } from "../service/destination.service";

export async function createFeedbackHandler(
  req: Request<{ destinationId: string & createFeedbackInput["body"] }>,
  res: Response<FeedbackI | { error: string }>
) {
  const destinationId = req.params.destinationId;
  const { feedback_text, left_by } = req.body;

  try {
    const destination = await getDestinationById(destinationId);

    if (!destination) {
      return res.status(404).send({ error: "Destination not existing!" });
    }

    const feedback = await createFeedback(
      destinationId,
      feedback_text,
      left_by
    );

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
    const feedback = await getFeedbacks(destinationId);
    if (!feedback) {
      return res.status(404).send({ error: "Feedback not existing!" });
    }

    res.status(200).send(feedback);
  } catch (e: any) {
    logger.error(e);
    res.status(500).send(e.message);
  }
}

export async function deleteFeedbackHandler(
  req: Request<{ id: string }>,
  res: Response<FeedbackI | { error: string } | { message: string }>
) {
  try {
    const { id } = req.params;

    const feedback = await deleteFeedback(id);
    if (!feedback) {
      return res.status(404).send({ error: "Feedback not existing!" });
    }

    res
      .status(200)
      .json({ message: `Feedback with ID: ${feedback._id} has been deleted.` });
  } catch (e: any) {
    logger.error(e);
    res.status(500).send(e.message);
  }
}
