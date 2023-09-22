import { DestinationI, DestinationM } from "../models/destination.model";

export async function createDestination (input: DestinationI) {
    try {
        return await DestinationM.create(input)
    } catch(e:any) {
        throw new Error(e)
    }
}


// I don't need to add deleteDestination, getDestinations, getDestinationById services