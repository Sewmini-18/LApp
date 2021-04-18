package com.bezkoder.spring.jwt.mongodb.payload.request;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class ResetPasswordRequest {

    @NotBlank
    @Email
    private String username;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

}