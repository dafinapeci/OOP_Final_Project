package com.spotiver2;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.*;

@CrossOrigin(origins = "http://localhost:---secure---") 
@Service 
public class SignUp {

  
	private static final String URL = "---secured information---";

    // Method to register a new user in the database
    public void registerUser(registerUsers user) {
        // SQL query to insert user details into the Users table
        String sql = "INSERT INTO Users (name, surname, age, email, username, password) VALUES (?, ?, ?, ?, ?, ?)";

        // Try-with-resources to auto-close database connection
    	try (Connection conn = DriverManager.getConnection(URL)) {
            // Prepare the SQL statement with user input
            PreparedStatement stmt = conn.prepareStatement(sql);
            stmt.setString(1, user.getName());
            stmt.setString(2, user.getSurname());
            stmt.setInt(3, user.getAge());
            stmt.setString(4, user.getEmail());
            stmt.setString(5, user.getUsername());
            stmt.setString(6, user.getPassword());  
            
            // Execute the statement and print result
            int rows = stmt.executeUpdate();
            System.out.println(rows + " row(s) inserted.");
            System.out.println("User registered successfully!");
           
        } catch (SQLException e) {
            // Print SQL error if something goes wrong
            e.printStackTrace();
        }
    
    }
}
