package com.spotiver2;

public class SongInformation extends songItems implements Showable {
	
	public SongInformation(String songName, String artistName, float time, String filePath) {
		super(songName, artistName, time, filePath);
	}
	@Override
	public void showInfo() {
		System.out.println(getInfoAsText());
	}
	@Override
	public String getInfoAsText() {
		return "Song: " + getSongName() + ", Artist: " + getArtistName() + ", time: " + getTime();
	}
    
}
