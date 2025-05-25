package com.spotiver2;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
@CrossOrigin(origins = "http://localhost:--secret--")
@Service
public class SongFactory {//which has a design pattern == Factory pattern 
    public songItems createSongFromDTO(SongDTO dto) {
        return new SongInformation(dto.getSongName(), dto.getArtistName(), dto.getDuration(), dto.getFilePath());
    }

    public void saveToDatabase(songItems song) {
        database.insertSong(song); //calling for the database code
    }
    public void savetothePlaylist(songItems song){
        Playlist myPlaylist = new Playlist(null);//building a new playlist code
        myPlaylist.addSong(song);//adding the new song we add
        myPlaylist.listSongs();
    }
}
