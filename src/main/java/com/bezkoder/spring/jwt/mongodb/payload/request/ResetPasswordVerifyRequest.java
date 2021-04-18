package com.bezkoder.spring.jwt.mongodb.payload.request;


import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class ResetPasswordVerifyRequest {
    @NotBlank
    @Email
    private String username;

    @NotBlank
    private String password;

    private Integer token;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getToken() {
        return token;
    }

    public void setToken(Integer token) {
        this.token = token;
    }
}
