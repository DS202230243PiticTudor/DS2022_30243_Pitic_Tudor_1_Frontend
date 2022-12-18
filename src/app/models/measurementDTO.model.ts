import {DeviceReadingPairDTO} from "./deviceReadingPairDTO.model";

export interface MeasurementDTO {
  id: string;
  createdDate: Date;
  totalMeasurement: number;
  deviceReadingPairs: DeviceReadingPairDTO[];
}
