import mongoose from "mongoose";
import express from "express";
import request from "supertest";
import http from "http";
import {
  createFeedbackHandler,
  getFeedbackHandler,
  deleteFeedbackHandler,
} from "../src/controller/feedback.controller";
import { FeedbackM } from "../src/models/feedback.model";

const app = express();
let server: http.Server;

beforeAll(async () => {
  server = app.listen();
});

afterAll((done) => {
  server.close(done);
}, 10000);

FeedbackM.create = jest.fn();
FeedbackM.find = jest.fn();
FeedbackM.findById = jest.fn();
FeedbackM.findByIdAndDelete = jest.fn();

app.use(express.json());

app.post("/feedback/:destinationId", createFeedbackHandler);
app.get("/feedback/:destinationId", getFeedbackHandler);
app.delete("/feedback/:id", deleteFeedbackHandler);

describe("Feedback Routes", () => {
  it("should create feedback for a destination", async () => {
    const destinationId = new mongoose.Types.ObjectId();
    const newFeedback = {
      destination_id: destinationId,
      feedback_text: "Great place!",
      left_by: "User123",
    };

    console.log("Before FeedbackM.create");

    (FeedbackM.create as jest.Mock).mockResolvedValueOnce(newFeedback);

    const res = await request(app)
      .post(`/feedback/${destinationId}`)
      .send(newFeedback);

    console.log("After request");

    expect(res.status).toBe(201);
    expect(res.body).toEqual(newFeedback);
  });

  //   it("should get feedback for a destination", async () => {
  //     const destinationId = "1";
  //     const mockFeedbacks = [
  //       {
  //         _id: "1",
  //         destination_id: destinationId,
  //         feedback_text: "Great place!",
  //         left_by: "User123",
  //       },
  //       {
  //         _id: "2",
  //         destination_id: destinationId,
  //         feedback_text: "Awesome!",
  //         left_by: "User456",
  //       },
  //     ];

  //     (FeedbackM.find as jest.Mock).mockResolvedValueOnce(mockFeedbacks);

  //     const res = await request(app).get(`/feedback/${destinationId}`);
  //     expect(res.status).toBe(200);
  //     expect(res.body).toEqual(mockFeedbacks);
  //   });

  //   it("should delete feedback by ID", async () => {
  //     const feedbackId = "1";

  //     (FeedbackM.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({
  //       _id: feedbackId,
  //     });

  //     const res = await request(app).delete(`/feedback/${feedbackId}`);
  //     expect(res.status).toBe(200);
  //     expect(res.body).toEqual({
  //       message: `Feedback with ID: ${feedbackId} has been deleted.`,
  //     });
  //   });
});
