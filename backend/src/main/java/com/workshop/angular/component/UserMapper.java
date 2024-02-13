package com.workshop.angular.component;

import com.workshop.angular.dto.UserCreationDTO;
import com.workshop.angular.dto.UserEventDTO;
import com.workshop.angular.entity.UserEvent;
import com.workshop.angular.entity.User;
import com.workshop.angular.enums.UserEventEnum;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User toUser(UserCreationDTO userCreationDTO) {
        ObjectId objectId = new ObjectId();
        return new User(
                objectId.toString(),
                userCreationDTO.getFirstName(),
                userCreationDTO.getLastName(),
                userCreationDTO.getEmailId(),
                userCreationDTO.getDob()
        );
    }

    public UserEvent generateUserEvent(UserEventEnum event, String userId, String firstName) {
        ObjectId objectId = new ObjectId();
        return new UserEvent(objectId.toString(), System.currentTimeMillis(), event, firstName);
    }

    public UserEventDTO toUserEventDTO(UserEvent userEvent) {
        return new UserEventDTO(userEvent.getDate(), userEvent.getAction(), userEvent.getFirstName());
    }
}
