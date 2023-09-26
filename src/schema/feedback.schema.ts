import { object, string, TypeOf, date } from 'zod';

export const createFeedbackSchema = object({
  body: object({
    feedback_text: string({
      required_error: 'Feedback text is required.',
    }),
    left_by: string({
      required_error: 'Name of the person leaving feedback is required.',
    }),
  }),
});

export type createFeedbackInput = TypeOf<typeof createFeedbackSchema>;
