import { Request, Response } from "express";
import logger from "../utils/logger";
import { createDestination } from "../service/destination.service";
import { createDestinationInput } from "../schema/destination.schema";

export async function createDestinationHandler(req: Request<{}, {}, createDestinationInput['body']>, res: Response) {
  try {
    const newDestination = await createDestination(req.body);
    return newDestination;
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send(e.message);
  }
}

const createBook = (req: Request, res: Response, next: NextFunction) => {
    let { author, title } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        author,
        title
    });

    return book
        .save()
        .then((result) => {
            return res.status(201).json({
                book: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default { createDestination }  