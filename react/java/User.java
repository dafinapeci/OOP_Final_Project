package com.spotiver2;

import jakarta.persistence.*;

@Entity
@Table(name = "---secure---") // Specifies the table name in the database
public class User {
    
    @Id // Specifies the primary key field
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generates the ID value
    private int id;

    // User attributes mapped to corresponding database columns
    private String name;
    private String surname;
    private int age;
    private String email;
    private String username;
    private String password;

    // Getter and setter for ID
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter and setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and setter for surname
    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    // Getter and setter for age
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    // Getter and setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and setter for username
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    // Getter and setter for password
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
