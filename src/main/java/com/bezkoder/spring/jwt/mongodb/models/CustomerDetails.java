package com.bezkoder.spring.jwt.mongodb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Document(collection = "customer_requests")
public class CustomerDetails {
    @Id
    private String id;

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
    @Size(max = 15)
    private String phone;

    @NotBlank
    @Size(max = 150)
    private String reason;

    public CustomerDetails(String email, String c_name, String c_nic, String phone, String reason) {
        this.email = email;
        this.c_name = c_name;
        this.c_nic = c_nic;
        this.phone = phone;
        this.reason = reason;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getC_name() { return c_name; }

    public void setC_name(String c_name) { this.c_name = c_name; }

    public String getC_nic() { return c_nic; }

    public void setC_nic(String c_nic) { this.c_nic = c_nic; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
