import { UserEventDTO } from "../../models/user-event-dto";
import { UserEvent } from "../../models/user-event.model";

export function convertUserEventDTOs(userEventDTOs: UserEventDTO[]) {
  const userEvents: UserEvent[] = [];
  if (!userEventDTOs || userEventDTOs.length === 0) {
    return userEvents;
  }
  for (let userEventDTO of userEventDTOs) {
    userEvents.push(new UserEvent(userEventDTO));
  }
  return userEvents;
}
