package com.bezkoder.spring.jwt.mongodb.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

public class SignupRequest {
    @NotBlank
    @Email
    @Size(max = 50)
    private String username;

    @NotBlank
    @Size(max = 30)
    private String name;

    @NotBlank
    @Size(min = 10, max = 12)
    private String nic;



    private Set<String> roles;

    @NotBlank
    @Size(min = 8, max = 40)
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNic() {
        return nic;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<String> getRoles() {
      return this.roles;
    }

    public void setRole(Set<String> roles) {
      this.roles = roles;
    }
}
