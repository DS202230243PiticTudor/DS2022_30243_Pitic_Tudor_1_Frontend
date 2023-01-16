export interface NotificationConsumption {
  id: string;
  deviceId: string;
  personId: string;
  differenceInReading: number;
  currentReading: number;
  readingDate: Date;
}
