import logo from '../images/logo.png';
import React, { useState, useEffect, useRef } from 'react';
import '../CSS_Stylesheets/mainPageStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';//used for the buttons
import { faArrowLeft, faStepBackward, faPlayCircle, faStepForward } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
export default function MainPage() {//constant variables 
  const [activeTab, setActiveTab] = useState('downloads');
  const [progress, setProgress] = useState(0);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [downloadBoxes, setDownloadBoxes] = useState([]);
  const [playlistBoxes, setPlaylistBoxes] = useState([]);
  const [linkBoxes, setLinkBoxes] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [isAddingPlaylist, setIsAddingPlaylist] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState(null);
  

  const audioRef = useRef(new Audio());

  useEffect(() => {//for progress following progress of the song
    const audio = audioRef.current;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

    const playSongAtIndex = (index) => {// Plays the song at the given index and updates the playing state
    const song = downloadBoxes[index];
    if (song) {
      const audio = audioRef.current;
      audio.src = song.localUrl;
      audio.play();
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

   const handlePlayPause = () => {//this one  is for play and pause button
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (currentSongIndex === null && downloadBoxes.length > 0) {//never song played before
        playSongAtIndex(0);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

   const handlePrevious = () => {//this one is for the previous song 
    if (currentSongIndex !== null && currentSongIndex > 0) {
      playSongAtIndex(currentSongIndex - 1);//one less index
    }
  };

   const handleNext = () => {//this one is for the next song
    if (currentSongIndex !== null && currentSongIndex < downloadBoxes.length - 1) {
      playSongAtIndex(currentSongIndex + 1);//one more index
    }
  };

  const handleProgressChange = (event) => {//this one is for the progress bar
    const audio = audioRef.current;
    const newProgress = event.target.value;
    audio.currentTime = (audio.duration * newProgress) / 100;
    setProgress(newProgress);//updates the progress
  };


  const formatTime = (seconds) => {//this one is for the format of the time in the screen
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;//return this format
  };
  const handlePlaySong = (file) => {//starts the song with url of the song
    const audio = new Audio(URL.createObjectURL(file));  
    audio.play()
      .then(() => {
        console.log("Şarkı çalmaya başladı!");
      })
      .catch((error) => {
        console.error("Şarkıyı başlatırken bir hata oluştu:", error);
      });
  };
const handlePlayPlaylistSong = (songIndex) => {//handles play part in the playlist
  const song = playlistBoxes[selectedPlaylistIndex].songs[songIndex];
  if (song && song.localUrl) {
    const audio = audioRef.current;
    audio.src = song.localUrl;
    audio.play()
      .then(() => {
        console.log(`Playing: ${song.songName} by ${song.artistName}`);
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Şarkıyı başlatırken bir hata oluştu:", error);
      });
  } else {
    console.warn("Bu şarkının localUrl'i eksik.");
  }
};



  const handleAddBox = () => {//this one handles with the boxes
    if (activeTab === 'downloads') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'audio/*';
  
      input.onchange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const audio = new Audio(URL.createObjectURL(file));
          audio.onloadedmetadata = async () => {
            const durationInSeconds = audio.duration;
            const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, ''); // removes stuff like .mp3
            const [songName, artistName] = fileNameWithoutExtension.split('-');
            const fileUrl = URL.createObjectURL(file);
          
            
            const newBox = {//gets the song name, artist name and duration
              songName: songName || "Bilinmeyen Şarkı",
              artistName: artistName || "Bilinmeyen Sanatçı",
              duration: durationInSeconds,
              filePath: "\\Desktop\\react_work\\my-app\\src\\songs" + file.name//we can also get the url 
            };
            const frontendBox = {
              ...newBox,
              localUrl: fileUrl  //only for the frontend
            };
            console.log(newBox);
  
            // We are sending the new song to the boot by axios
            try {
              const response = await axios({
                method: "post",
                baseURL: "--secret--",  // Backend location
                url: "--secret--",  // endpoint for adding song
                data: newBox,  // data what is sent
                headers: {
                    'Content-Type': 'application/json',  // data as JSON
                }
              });
              console.log("Song added successfully", response.data);
            } catch (error) {
              console.error("Error adding song:", error);
            }
  
            // Update for the react state
            setDownloadBoxes([...downloadBoxes, newBox]);
            setDownloadBoxes([...downloadBoxes, frontendBox]);
          };
        }
      };
  
      input.click();  //For opening the file selector
    } else if (activeTab === 'playlist') {
      setIsAddingPlaylist(true);  
    } else if (activeTab === 'links') {
      setLinkBoxes([...linkBoxes, { text: '' }]);
    }
  };
  
  const handleAddPlaylist = async () => {//same handlebox for the playlist
    if (playlistName) {
      setPlaylistBoxes([...playlistBoxes, { name: playlistName, songs: [] }]);
      setPlaylistName('');
      setIsAddingPlaylist(false);
          try {
            const response = await axios({//same as song part
              method: "post",
              baseURL: "--secret--",  
              url: "--secret--",  
              data: { name: playlistName },  
              headers: {
                'Content-Type': 'application/json',  
              }
            });
            console.log("Playlist added successfully:", response.data);
          } catch (error) {
            console.error("Error adding playlist:", error);
          }
    }
  };
  const handleAddSongToPlaylist = (song) => {
    const updatedPlaylists = [...playlistBoxes];
    const currentPlaylist = updatedPlaylists[selectedPlaylistIndex];
  
      // if the song added for once dont add it again
    if (!currentPlaylist.songs.find(s => s.songName === song.songName && s.artistName === song.artistName)) {
      currentPlaylist.songs.push(song);
      setPlaylistBoxes(updatedPlaylists);
    }
  };
const handleEdit = (index) => {//for the links to edit link box
  const updated = [...linkBoxes];//takes the copy of the array
  updated[index].isEditing = true;//editing is true
  setLinkBoxes(updated);//update to the last version
};

const handleBlur = (index) => {//this one close the editing
  const updated = [...linkBoxes];
  updated[index].isEditing = false;//editing is false
  setLinkBoxes(updated);
};

const isValidUrl = (string) => {//checks if the url is valid or not
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};
  
const handleTextChange = (index, event) => {//for text change
  const updated = [...linkBoxes];//takes copy of the array
  updated[index].text = event.target.value;//updates it
  setLinkBoxes(updated);//updates the state
};
  const handlePlayDownload = (index) => {//handles the play button in the download part  
    const selectedSong = downloadBoxes[index];
    if (selectedSong && selectedSong.localUrl) {
      const audio = audioRef.current;
      audio.src = selectedSong.localUrl;
      audio.play()
        .then(() => {
          console.log("Şarkı çalmaya başladı!");
          setCurrentSongIndex(index);
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Şarkıyı başlatırken bir hata oluştu:", error);
        });
    }
  };
  return (//after this our class names starts and we are defining css classes
    <>
      <div className="main-page">
        <div className="strip">/*for the black part of the screen*/
          <img src={logo} alt="black background" />
          <h1>Le-Spotify</h1>
          <div className="buttonD">
            <button onClick={() => setActiveTab('downloads')}>Downloads</button>
          </div>
          <div className="buttonL">
            <button onClick={() => setActiveTab('links')}>Links</button>
          </div>
          <div className="buttonP">
            <button onClick={() => setActiveTab('playlist')}>Playlist</button>
          </div>
        </div>

        <div className="containerAll">">/*for the main part of the screen*/
          <div className="upperbox">
            <button
              className={`leftbtn ${activeTab === 'downloads' ? 'active' : ''}`}
              onClick={() => setActiveTab('downloads')}
            >
              Downloads
            </button>
            <button
              className={`rightbtn ${activeTab === 'links' ? 'active' : ''}`}
              onClick={() => setActiveTab('links')}
            >
              Links
            </button>
            <button
              className={`rightbtn ${activeTab === 'playlist' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('playlist');
                setSelectedPlaylistIndex(null);
              }}
            >
              Playlist
            </button>
          </div>

          {/* Downloads tab connection to functions and css*/}
          {activeTab === 'downloads' && (
            <>
              {downloadBoxes.map((box, index) => (
                <div
                  key={index}
                  className="innerbox"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <span>{index + 1}) {box.songName}</span>
                    <span>Artist: {box.artistName}</span>
                    <span>Duration: {formatTime(box.duration)}</span>
                  </div>
                  <button
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '6px 12px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handlePlayDownload(index)} 
                  >
                    ▶
                  </button>
                </div>
              ))}
              <div className="plusbox">
                <button onClick={handleAddBox}>+</button>
              </div>
            </>
          )}

          {/* links tab connection to functions and css*/}
{activeTab === 'links' && (
  <>
    {linkBoxes.map((box, index) => (
      <div key={index} className="innerbox">
        <p style={{ marginLeft: '8px' }}>{index + 1})</p>

        {box.isEditing ? (
          <textarea
            value={box.text}
            onChange={(event) => handleTextChange(index, event)}
            onBlur={() => handleBlur(index)}
            rows="4"
            cols="50"
            style={{
              resize: 'none',
              marginTop: '3px',
              padding: '10px',
              width: '95%',
              backgroundColor: '#f4f4f4',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}
          />
        ) : (
          <div
            style={{
              marginTop: '3px',
              padding: '10px',
              width: '95%',
              backgroundColor: '#f4f4f4',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
            onClick={() => handleEdit(index)}
          >
            {isValidUrl(box.text.trim()) ? (
              <a
                href={box.text.trim()}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007acc', textDecoration: 'underline' }}
              >
                {box.text.trim()}
              </a>
            ) : (
              box.text
            )}
          </div>
        )}
      </div>
    ))}

    <div className="plusbox">
      <button onClick={handleAddBox}>+</button>
    </div>
  </>
)}
          {/* Playlist tab connection to functions and css*/}
                {activeTab === 'playlist' && (
        <>
          {selectedPlaylistIndex === null ? (
            <div className="playlistWrapper">
              {playlistBoxes.map((box, index) => (
                <div key={index} className="innerbox2">
                  <button onClick={() => setSelectedPlaylistIndex(index)}>
                    {box.name}
                  </button>
                </div>
              ))}

              {isAddingPlaylist ? (
                <div className="addPlaylistForm">
                  <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="Enter the playlist name"
                  />
                  <button onClick={handleAddPlaylist}>Add</button>
                  <button onClick={() => setIsAddingPlaylist(false)}>Cancel</button>
                </div>
              ) : (
                <div className="plusbox">
                  <button onClick={() => setIsAddingPlaylist(true)}>+</button>
                </div>
              )}
            </div>
          ) : (
            <div className="playlistDetail">
              <h2>{playlistBoxes[selectedPlaylistIndex].name}</h2>
              <button onClick={() => setSelectedPlaylistIndex(null)}>
                <FontAwesomeIcon icon={faArrowLeft} className="fas fa-2x" />
              </button>
              <div className="emptyPage">

                <h3>Playlist songs:</h3>
                {playlistBoxes[selectedPlaylistIndex].songs.map((song, idx) => (
                  <div
                    key={idx}
                    className="innerbox"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '10px',
                      color: 'black',
                      backgroundColor: '#f0f0f0',
                      marginBottom: '5px',
                      position: 'relative'
                    }}
                  >
                    <span>{song.songName} - {song.artistName}</span>
                    <button
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: '#1bb74f',
                        color: 'black',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '6px 12px',
                        cursor: 'pointer'
                      }}
                      onClick={() => handlePlayPlaylistSong(idx)}
                    >
                      ▶
                    </button>
                  </div>
                ))}

                <h3>Downloads:</h3>
                {downloadBoxes.map((box, index) => (
                  <div
                    key={index}
                    className="innerbox"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: 'black',
                      padding: '10px',
                      position: 'relative',
                      marginBottom: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <span>{index + 1}) {box.songName}</span>
                      <span>Artist: {box.artistName}</span>
                      <span>Duration: {formatTime(box.duration)}</span>
                    </div>
                    <button
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: '#1bb74f',
                        color: 'black',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '6px 12px',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleAddSongToPlaylist(box)}
                    >
                      +
                    </button>
                  </div>
                ))}

              </div>
            </div>
          )}
        </>
      )}

          {/* Controller for the playing music */}
              <div className="bottom">
            <input
              type="range"
              min="0"
              value={progress}
              max="100"
              onChange={handleProgressChange}
            />
            <div className="icons">
              <button onClick={handlePrevious}>
                <FontAwesomeIcon icon={faStepBackward} />
              </button>
              <button onClick={handlePlayPause}>
                <FontAwesomeIcon icon={faPlayCircle} />
              </button>
              <button onClick={handleNext}>
                <FontAwesomeIcon icon={faStepForward} />
              </button>
            </div>
            <div className="songInfo">
              {currentSongIndex !== null && downloadBoxes[currentSongIndex]
                ? `${downloadBoxes[currentSongIndex].songName} - ${downloadBoxes[currentSongIndex].artistName}`
                : 'No song playing'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
