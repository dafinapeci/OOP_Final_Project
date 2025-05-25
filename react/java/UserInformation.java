package com.spotiver2;


public class UserInformation extends registerUsers implements Showable {

    // constructor 
	public UserInformation(String name, String surname, int age, String email, String username, String password) {
		super(name, surname, age, email, username, password);
	}

    // showInfo() method from Showable interface
	@Override
	public void showInfo() {
		System.out.println(getInfoAsText());
	}

    // returns user information as a string
	@Override
	public String getInfoAsText() {
	    return "Name: " + getName()
            + ", Surname: " + getSurname()
            + ", Age: " + getAge()
            + ", Email: " + getEmail()
            + ", Username: " + getUsername()
            + ", Password: " + getPassword();
	}
}
