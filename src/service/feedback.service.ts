import { FeedbackM } from "../models/feedback.model";
import { FeedbackI } from "../types/feedback";

export async function createFeedback(destinationId: string, feedback_text: string, left_by: string) {
    
}

export async function getFeedbacks(destinationId: string) {
    try {
      return await FeedbackM.find({ destination_id: destinationId });
    } catch (e: any) {
      throw new Error(e);
    }
  }