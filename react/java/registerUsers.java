package com.spotiver2;
public abstract class registerUsers {
	private String name;
	private String surname;
    private int age;
    private String email;
    private String username;
    private String password;

    
    //String name, String surname, int age, String email, String username, String password
	public registerUsers(String name, String surname, int age, String email, String username, String password) {
		this.name = name;
		this.surname = surname;
		this.age = age;
		this.email = email;
		this.username = username;
		this.password = password;
	}
	public String getName() {
	    return name;
	}

	public void setName(String name) {
	    this.name = name;
	}

	public String getSurname() {
	    return surname;
	}

	public void setSurname(String surname) {
	    this.surname = surname;
	}

	public int getAge() {
	    return age;
	}

	public void setAge(int age) {
	    this.age = age;
	}

	public String getEmail() {
	    return email;
	}

	public void setEmail(String email) {
	    this.email = email;
	}

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

	public abstract void showInfo();
}
