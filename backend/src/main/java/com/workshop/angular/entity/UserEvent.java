package com.workshop.angular.entity;

import com.workshop.angular.enums.UserEventEnum;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "history")
public class UserEvent {

    @Id
    private String id;

    @Field(name = "date")
    private long date;

    @Field(name = "action")
    private UserEventEnum action;

    @Field(name = "firstName")
    private String firstName;

    public UserEvent(String id, long date, UserEventEnum action, String firstName) {
        this.id = id;
        this.date = date;
        this.action = action;
        this.firstName = firstName;
    }

    public String getId() {
        return id;
    }

    public long getDate() {
        return date;
    }

    public UserEventEnum getAction() {
        return action;
    }

    public String getFirstName() {
        return firstName;
    }
}
