package com.spotiver2;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@Service
@RestController
@CrossOrigin(origins = "http://localhost:--secret--")
public class PlaylistService {//service is used for a connection between database and playlist controller 

    public void savePlaylistName(String name) {
        DatabaseConnection.insertPlaylistName(name);
    }
}
