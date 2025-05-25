package com.spotiver2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;


@CrossOrigin(origins = "http://localhost:--secret--")
@Service
public class UserFactory {

	@Autowired
    private SignUp signUp; 

    // Converts UserDTO to a registerUsers object (polymorphic)
	public registerUsers registerUsersDTO(UserDTO dto) {
		return new UserInformation(
			dto.getName(),
			dto.getSurname(),
			dto.getAge(),
			dto.getEmail(),
			dto.getUsername(),
			dto.getPassword()
		);
	}
	
    // Saves user to database using the Signup
	public void saveToDatabase(registerUsers users) {
        signUp.registerUser(users); 
    }
}
