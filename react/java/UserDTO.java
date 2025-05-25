package com.spotiver2;

// Data Transfer Object (DTO) for transferring user data between frontend and backend
public class UserDTO {
	public String name;
    public String surname;
    public int age;
    public String email;
    public String username;
    public String password;

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
