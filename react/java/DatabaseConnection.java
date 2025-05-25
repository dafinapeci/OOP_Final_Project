package com.spotiver2;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
public class DatabaseConnection {
     private static final String URL = "--secret information--";

    public static void insertPlaylistName(String name) {
        String sql = "INSERT INTO playlists (name) VALUES (?)";//inserts what we take from frontend

        try (Connection conn = DriverManager.getConnection(URL);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, name);

            int rows = stmt.executeUpdate();
            System.out.println(rows + " row(s) inserted.");

        } catch (SQLException e) {//for whole project not the down we use try catch
            e.printStackTrace();
        }
    }
}