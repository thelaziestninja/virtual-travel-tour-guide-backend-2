import { object, string, TypeOf } from "zod";
export const createDestinationSchema = object({
  body: object({
    name: string({
      required_error: "Name is required.",
    }),
    description: string({
      required_error: "Description is required.",
    }),
    image_url: string(),
    country: string({
      required_error: "Country is required.",
    }),
    best_time_to_visit: string({
      required_error: "Best time to visit is required.",
    }),
  }),
});

export type createDestinationInput = TypeOf<typeof createDestinationSchema>