package com.spotiver2;

import org.springframework.stereotype.Service;
import java.sql.*;

@Service
public class Login {

    private static final String URL = "--secret--";

    public boolean authenticate(String usernameOrEmail, String password) {
        String sql = "SELECT * FROM Users WHERE (username = ? OR email = ?) AND password = ?";

        try (Connection conn = DriverManager.getConnection(URL);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, usernameOrEmail);
            stmt.setString(2, usernameOrEmail);
            stmt.setString(3, password);

            ResultSet rs = stmt.executeQuery();
            return rs.next(); // If a match is found, login is successful

        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}

