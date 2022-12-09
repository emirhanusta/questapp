package com.project.questapp.responses;

import com.project.questapp.entities.User;

import lombok.Data;

@Data
public class UserResponse {

    Long id;
    String userName;

    public UserResponse(User entity) {
        this.id = entity.getId();
        this.userName = entity.getUserName();
    }
}
