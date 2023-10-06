/*
  Services separate the business logic of the application from the controllers and routes,
  promoting modularity and maintainability. Each of the route handlers (createDestinationHandler, getDestinationsHandler, etc.) 
  should delegate the actual business logic to the corresponding service function.
  In this service layer, we can encapsulate operations related to the data mode. 
*/

import { DestinationM } from "../models/destination.model";
import { DestinationI, destinationUpdates, DestinationCreation } from "../types/destination";

export async function findDestinationByName(name: string): Promise<DestinationI | null> {
  try {
    return await DestinationM.findOne({ name });
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function createDestination(
  input: DestinationCreation
): Promise<DestinationI> {
  try {
    return await DestinationM.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getDestinations(): Promise<DestinationI[]> {
  try {
    return await DestinationM.find().exec();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getDestinationById(
  id: string
): Promise<DestinationI | null> {
  try {
    return await DestinationM.findById(id);
  } catch (e: any) {
    throw new Error(e);
  }
}

// export interface Credentials {
//   name: string;
//   email: string;
//   password: string;
// }

// type LoginUser = Pick<Credentials, 'email' | 'password'>;
// type ResetPassword = Pick<Credentials, 'email'>;

export async function updateDestination(
  id: string,
  updates: destinationUpdates // I used Picker
): Promise<DestinationI | null> {
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

export async function deleteDestination(
  id: string
): Promise<DestinationI | null> {
  try {
    return await DestinationM.findByIdAndDelete(id);
  } catch (e: any) {
    throw new Error(e);
  }
}
