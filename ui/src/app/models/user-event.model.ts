import { UserEventDTO } from "./user-event-dto";
import { UserEventEnum } from "../enums/user-event.enum";

export class UserEvent {
  date: number;
  action: UserEventEnum;
  firstName: string;

  constructor(userEventDTO: UserEventDTO) {
    this.date = userEventDTO.date;
    this.action = UserEventEnum[userEventDTO.action as keyof typeof UserEventEnum];
    this.firstName = userEventDTO.firstName;
  }
}
