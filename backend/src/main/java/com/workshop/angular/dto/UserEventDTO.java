package com.workshop.angular.dto;

import com.workshop.angular.enums.UserEventEnum;

public class UserEventDTO {

    private long date;

    private UserEventEnum action;

    private String firstName;

    public UserEventDTO(long date, UserEventEnum action, String firstName) {
        this.date = date;
        this.action = action;
        this.firstName = firstName;
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
