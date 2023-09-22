// essential part of your application's architecture. It separates the business logic of your application from the controllers and routes,
//promoting modularity and maintainability. Each of your route handlers (createDestinationHandler, getDestinationsHandler, etc.) should delegate
//the actual business logic to the corresponding service function.
//In your service layer, you can encapsulate operations related to your data mode.

import { DestinationM } from "../models/destination.model";
import { DestinationI } from "../types/destination";

export async function createDestination(input: DestinationI) {
  try {
    return await DestinationM.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getDestinations() {
  try {
    return await DestinationM.find().exec();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getDestinationById(id: string) {
  try {
    return await DestinationM.findById(id);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function updateDestination(
  id: string,
  updates: Partial<DestinationI>
) {
  try {
    const updatedDestination = await DestinationM.findByIdAndUpdate(
      id,
      updates,
      { new: true } // Return the updated document
    );

    return updatedDestination;
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function deleteDestination(id: string) {
  try {
    return await DestinationM.findByIdAndDelete(id);
  } catch (e: any) {
    throw new Error(e);
  }
}
