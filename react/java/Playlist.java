package com.spotiver2;
import java.util.ArrayList;
import java.util.List;
public class Playlist {
	private String name;
	private List<songItems> songs;

	public Playlist(String name) {
		this.name = name;
		this.songs = new ArrayList<>();//we hold them as list
	}

	public void addSong(songItems song) {
		songs.add(song);//every new song is adding in the main playlist
		System.out.println("Song added to the main playlist");
	}

	public void listSongs() {
		for (songItems song : songs) {
			song.showInfo(); // polymorfizm
		}
	}
}
