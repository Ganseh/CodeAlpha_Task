// =====================================
// MUSIC PLAYER
// =====================================


// Get HTML elements
const cover = document.getElementById("cover");

const songTitle = document.getElementById("song-title");

const artist = document.getElementById("artist");

const playButton = document.getElementById("play");

const previousButton = document.getElementById("previous");

const nextButton = document.getElementById("next");

const progressBar = document.getElementById("progress-bar");

const currentTime = document.getElementById("current-time");

const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const playlistSongs = document.querySelectorAll(".playlist-song");


// =====================================
// SONG DATA
// =====================================

const songs = [

    {
        title: "Song 1",
        artist: "My Artist",
        audio: "songs/song1.mp3",
        image: "images/image1.jpg"
    },

    {
        title: "Song 2",
        artist: "My Artist",
        audio: "songs/song2.mp3",
        image: "images/image2.jpg"
    },

    {
        title: "Song 3",
        artist: "My Artist",
        audio: "songs/song3.mp3",
        image: "images/image3.jpg"
    }

];


// =====================================
// CREATE AUDIO
// =====================================

const audio = new Audio();


// Start with Song 1
let songIndex = 0;


// =====================================
// LOAD SONG
// =====================================

function loadSong(index) {

    // Get the selected song
    const song = songs[index];

    // Change song information
    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    // Change cover image
    cover.src = song.image;

    // Change audio
    audio.src = song.audio;

    // Reset progress
    progressBar.value = 0;

    currentTime.textContent = "0:00";

    duration.textContent = "0:00";


    // Update active playlist item

    playlistSongs.forEach(function(songElement, i) {

        if (i === index) {

            songElement.classList.add("active");

        } else {

            songElement.classList.remove("active");

        }

    });

}


// =====================================
// PLAY SONG
// =====================================

function playSong() {

    audio.play();

    playButton.textContent = "⏸";

}


// =====================================
// PAUSE SONG
// =====================================

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

}


// =====================================
// PLAY / PAUSE BUTTON
// =====================================

playButton.addEventListener("click", function() {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// =====================================
// NEXT SONG
// =====================================

function nextSong() {

    songIndex++;

    // If we reach the last song,
    // go back to the first song.

    if (songIndex >= songs.length) {

        songIndex = 0;

    }

    loadSong(songIndex);

    playSong();

}


// =====================================
// PREVIOUS SONG
// =====================================

function previousSong() {

    songIndex--;

    // If we go before Song 1,
    // go to the last song.

    if (songIndex < 0) {

        songIndex = songs.length - 1;

    }

    loadSong(songIndex);

    playSong();

}


// Next button
nextButton.addEventListener("click", nextSong);


// Previous button
previousButton.addEventListener("click", previousSong);


// =====================================
// UPDATE PROGRESS BAR
// =====================================

audio.addEventListener("timeupdate", function() {

    if (audio.duration) {

        const progress =
            (audio.currentTime / audio.duration) * 100;

        progressBar.value = progress;


        // Current time
        currentTime.textContent =
            formatTime(audio.currentTime);

    }

});


// =====================================
// SONG DURATION
// =====================================

audio.addEventListener("loadedmetadata", function() {

    duration.textContent =
        formatTime(audio.duration);

});


// =====================================
// FORMAT TIME
// =====================================

function formatTime(seconds) {

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60);

    if (remainingSeconds < 10) {

        return minutes + ":0" + remainingSeconds;

    } else {

        return minutes + ":" + remainingSeconds;

    }

}


// =====================================
// CLICK PROGRESS BAR
// =====================================

progressBar.addEventListener("input", function() {

    if (audio.duration) {

        audio.currentTime =
            (progressBar.value / 100) * audio.duration;

    }

});


// =====================================
// VOLUME CONTROL
// =====================================

volume.addEventListener("input", function() {

    audio.volume = volume.value;

});


// =====================================
// SONG ENDS
// =====================================

audio.addEventListener("ended", function() {

    nextSong();

});


// =====================================
// PLAYLIST
// =====================================

playlistSongs.forEach(function(songElement) {

    songElement.addEventListener("click", function() {

        // Get the song number
        songIndex =
            Number(songElement.dataset.index);

        // Load selected song
        loadSong(songIndex);

        // Play selected song
        playSong();

    });

});


// =====================================
// LOAD FIRST SONG
// =====================================

loadSong(songIndex);