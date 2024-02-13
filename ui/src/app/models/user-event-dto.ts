import { UserEventEnum } from "../enums/user-event.enum";

export interface UserEventDTO {
  date: number;
  action: string;
  firstName: string;
}
