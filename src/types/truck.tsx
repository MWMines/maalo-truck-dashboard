import { Driver } from "./driver";
import { Owner } from "./owner";

export interface Truck {
  truckId: number;
  truckNumber: string;
  ownerId: number | null;
  ownerName: string | null;
  aggregatorId: number | null;
  vehicleClass: string;
  bodyType: string;
  makerDescription: string;
  makerModel: string;
  regMobileNo: string | null;
  engineNo: string;
  chasisNo: string;
  unlaidenWeight: number;
  laidenWeight: number;
  cubicCapacity: string;
  rcRegistrationAt: string;
  rcStatus: string;
  truckHypothecated: boolean;
  hypothecatedTo: string;
  deleted: boolean;
  createdDate: string;
  createdBy: string | null;
  modifiedDate: string;
  modifiedBy: string | null;
  deletedBy: string | null;
  noOfTrips: number;
  owner: Owner | null;
  driver: Driver | null;
  inProgressTrips: number;
  completedTrips: number;
}
