package com.spotiver2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin(origins =  "http://localhost:--secret--")
@RestController
@RequestMapping("/api/songs")
public class SongController {

    @Autowired
    private SongFactory songService;

    @PostMapping("/add") // this add songs with post request
    public ResponseEntity<String> addSong(@RequestBody SongDTO songDTO) {
        try {
            songItems song = songService.createSongFromDTO(songDTO);
            songService.saveToDatabase(song);//saves to the database
            songService.savetothePlaylist(song);//saves to the main playlist
            return ResponseEntity.ok("Song saved successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving song: " + e.getMessage());
        }
    }
}

