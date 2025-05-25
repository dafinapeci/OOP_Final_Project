package com.spotiver2;

public abstract class songItems {//here is our abstract usage
	private String songName;
	private String artistName;
    private float time;
    private String filePath;

	public songItems(String songName, String artistName, float time, String filePath) {
		this.songName = songName;
		this.artistName = artistName;
		this.time = time;
		this.filePath = filePath;
	}
	public String getSongName() {
		return songName;
	}
	public void setSongName(String songName) {
		this.songName = songName;
	}
	public String getArtistName() {
		return artistName;
	}
	public void setArtistName(String artistName) {
		this.artistName = artistName;
	}
	public float getTime() {
		return time;
	}
	public void setTime(float time) {
		this.time = time;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	public abstract void showInfo();
}
