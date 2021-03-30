package com.bezkoder.spring.jwt.mongodb.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class CustomerRequest {
    @NotBlank
    @Email
    @Size(max = 50)
    private String email;

    @NotBlank
    @Size(max = 30)
    private String c_name;

    @NotBlank
    @Size(min = 10, max = 12)
    private String c_nic;

    @NotBlank
    @Size(min = 10, max = 15)
    private String phone;

    @NotBlank
    @Size(max = 150)
    private String reason;

    private String date;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return c_name;
    }

    public String getC_name() {
        return c_name;
    }

    public void setC_name(String c_name) {
        this.c_name = c_name;
    }

    public String getC_nic() {
        return c_nic;
    }

    public void setC_nic(String c_nic) {
        this.c_nic = c_nic;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}

