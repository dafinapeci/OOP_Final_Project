package com.spotiver2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;


@RestController
@CrossOrigin(origins = "http://localhost:--secret--")
@RequestMapping("/api/playlists")
public class PlaylistController {

    @Autowired
    private PlaylistService playlistService;
    @PostMapping("/add")//whole path is /api/playlists/add
    public ResponseEntity<String> addPlaylist(@RequestBody PlaylistDTO playlistDTO) {
        try {
            playlistService.savePlaylistName(playlistDTO.getName());//for sending playlist name what we are adding inside of the database
            return ResponseEntity.ok("Playlist name saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Error saving playlist name: " + e.getMessage());
        }
    }
}