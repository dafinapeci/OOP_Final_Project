package com.spotiver2;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
public class database {//this part is connection for the song database
    private static final String URL = "--secret information--";

    public static void insertSong(songItems song) {
        String sql = "INSERT INTO songs (songName, artistName, time, filePath) VALUES (?, ?, ?, ?)";//inserts what we take from frontend

        try (Connection conn = DriverManager.getConnection(URL);
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, song.getSongName());
            stmt.setString(2, song.getArtistName());
            stmt.setFloat(3, song.getTime());
            stmt.setString(4, song.getFilePath());

            int rows = stmt.executeUpdate();
            System.out.println(rows + " row(s) inserted.");

        } catch (SQLException e) {//for whole project not the down we use try catch
            e.printStackTrace();
        }
    }
}
