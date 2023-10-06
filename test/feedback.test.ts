import mongoose from "mongoose";
import express from "express";
import { Express } from "express";
import request from "supertest";
import { createServer, Server } from "http";
import {
  createFeedbackHandler,
  getFeedbackHandler,
  deleteFeedbackHandler,
} from "../src/controller/feedback.controller";
import { FeedbackM } from "../src/models/feedback.model";

describe("Feedback Routes", () => {
  let app: Express;
  let server: Server;

  beforeAll(async () => {
    // Initialize your Express app and database connection here
    app = express();
    server = createServer(app);

    // Start your Express server
    server.listen(3001, () => {
      console.log("Server listening on port 3001");
    });

    // Set up any necessary configurations or middleware
    app.use(express.json());

    // Define your routes
    app.post("/feedback/:destinationId", createFeedbackHandler);
    app.get("/feedback/:destinationId", getFeedbackHandler);
    app.delete("/feedback/:id", deleteFeedbackHandler);

    // Clear mock function calls before each test
    jest.clearAllMocks();

    // Mock your database functions
    FeedbackM.create = jest.fn();
    FeedbackM.find = jest.fn();
    FeedbackM.findById = jest.fn();
    FeedbackM.findByIdAndDelete = jest.fn();
  });

  afterAll(async () => {
    // Close your server after all tests are done
    server.close(() => {
      console.log("Server closed successfully");
    });

    // Disconnect from the database
    await mongoose.disconnect();
  });

  it("should create feedback for a destination", async () => {
    const destinationId = new mongoose.Types.ObjectId();
    const newFeedback = {
      destination_id: destinationId,
      feedback_text: "Great place!",
      left_by: "User123",
    };

    console.log("Before FeedbackM.create");

    // Mock the behavior of your Mongoose model function
    (FeedbackM.create as jest.Mock).mockResolvedValueOnce(newFeedback);

    const res = await request(app)
      .post(`/feedback/${destinationId}`)
      .send(newFeedback);

    console.log("After request");

    expect(res.status).toBe(201);
    expect(res.body).toEqual(newFeedback);
  }, 30000);
});
