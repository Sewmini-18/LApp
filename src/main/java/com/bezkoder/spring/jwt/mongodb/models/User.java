package com.bezkoder.spring.jwt.mongodb.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Document(collection = "users")
public class User {
  @Id
  private String id;

  @NotBlank
  @Email
  @Size(max = 50)
  private String username;

  @NotBlank
  @Size(max = 30)
  private String name;

  @NotBlank
  @Size(max = 12)
  private String nic;

  @Size(max=12)
 private String theme;

  @NotBlank
  @Size(max = 120)
  private String password;

  @NotBlank
  private Boolean emailVerified;

  @DBRef
  private Set<Role> roles = new HashSet<>();

  private String phone;
  private String date;

  public User() {
  }

  public User(String username,  String name, String nic, String phone, String date, String theme, String password) {
    this.username = username;
    this.name = name;
    this.nic = nic;
    this.phone = phone;
    this.date = date;
    this.password = password;
    this.theme = theme;
    this.emailVerified= false;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

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

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

  public String getTheme() {
    return theme;
  }

  public void setTheme(String theme) {
    this.theme = theme;
  }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }
}
