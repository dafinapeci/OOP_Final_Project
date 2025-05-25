package com.spotiver2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:---secure---") 
@RestController 
@RequestMapping("/api/Users")
ublic class UserController {

    @GetMapping("/hello") // Simple test
    public String sayHello() {
        return "Trying spring boot with React!";
    }

    @Autowired
    private SignUp signUp; // Service to handle sign-up 

    @Autowired
    private UserFactory userService; // Factory to convert DTO to user model and save to DB

    @Autowired
    private Login login; // Service to handle login 

    private UserDTO userDTO;

    // register a new user
    @PostMapping("/register")
    public ResponseEntity<String> addUser(@RequestBody UserDTO userDTO) {
        try {
            System.out.println("POST method for /register received");

            // convert DTO to user object and save to database
            registerUsers users = userService.registerUsersDTO(userDTO); 
            userService.saveToDatabase(users);

            ((UserInformation) users).showInfo();  // this prints user info to the console

            return ResponseEntity.ok("User saved successfully");
        } catch (Exception e) {
            // return error response in case of exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error saving user: " + e.getMessage());
        }
    }

    //  authenticate a user
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserDTO loginDTO) {
        System.out.println("POST method for /login received");

        // Verify credentials using login service
        boolean authenticated = login.authenticate(loginDTO.getUsername(), loginDTO.getPassword());

        if (authenticated) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body("Invalid username/email or password");
        }
    }  
}
