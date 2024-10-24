const vedioElement = document.querySelector('#video')

// Select DOM elements
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const awner = document.getElementById('awner');
const cover = document.getElementById('cover');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const viSlider = document.getElementById('volume')
const speedSelect = document.getElementById('speed');


const videos = [
    { title: 'video 0', awner: '0', src: './srcs/ii.mp4' },
    { title: 'video 1', awner: '1', src: './srcs/f.mp4' },
    { title: 'video 3', awner: '3', src: "https://www.youtube.com/embed/sGZ8wRh3OXo?si=72-mJpeqc354jg8A" },
    { title: 'video 4', awner: '4', src: './srcs/VID-20241023-WA0003.mp4' }
    
]

let videoIndex = 0;
let isPlaying = false;
let speed = 1;

// all methods
// play a video


function loadvideo(video) {
    title.textContent = video.title;
    awner.textContent = video.awner;
    vedioElement.src = video.src
    // vedioElement.play();

}
loadvideo(videos[videoIndex])

function playSong() {
    playBtn.querySelector('i').classList.remove('fa-play')
    playBtn.querySelector('i').classList.add('fa-pause')
    vedioElement.play();
    isPlaying = true;
}

// pouse
function pauseVideo() {
    playBtn.querySelector('i').classList.remove('fa-pause')
    playBtn.querySelector('i').classList.add('fa-play')
    vedioElement.pause();
    isPlaying = false;
}

// next
function nextVideo() {
    pauseVideo();

    setTimeout(() => {
        videoIndex++;
        if (videoIndex > videos.length - 1) {
            videoIndex = 0;
        }

        loadvideo(videos[videoIndex])

        playSong();
    }, 300);
}

// preveiw
function prevVideo() {
    pauseVideo();

    setTimeout(() => {
        videoIndex--;
        if (videoIndex < 0) {
            videoIndex = videos.length - 1;
        }

        loadvideo(videos[videoIndex])

        playSong();
    }, 300);
}
// progress bar
updateProgress = (e) => {

    // console.log(e.srcElement.currentTime)
    const { duration, currentTime } = e.srcElement

    if (isNaN(duration)) return;
    const progressPercent = (currentTime / duration) * 100;
    // console.log(progressPercent)

    progress.style.width = `${progressPercent}%`


    // total time calculations

    const durationMinute = Math.floor(duration / 60)
    let durationSeconds = Math.floor(duration % 60)

    currentTimeEl.textContent = `${durationMinute}:${durationSeconds}`


    // current time calculations
    const currentMinute = Math.floor(currentTime / 60)
    let currentSeconds = Math.floor(currentTime % 60)
    durationEl.textContent = `${currentMinute}:${currentSeconds}`
}
// setProgress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = vedioElement.duration;
    // console.log(width)
    // console.log(clickX)
    // console.log(duration)

    const newtime = (clickX / width) * duration;
    // console.log(newtime)

    vedioElement.currentTime = newtime;
}


//  all events
// play
playBtn.addEventListener('click', function () {
    if (isPlaying) {
        pauseVideo()
    } else {
        playSong()
    }
})

// next video
nextBtn.addEventListener('click', () => nextVideo());

// prev video
prevBtn.addEventListener('click', prevVideo);

// progress bar
vedioElement.addEventListener('timeupdate', updateProgress);

// seeking videos
progressContainer.addEventListener('click', setProgress)

// volume events
viSlider.addEventListener("input", function(e) {
 
    // console.log(e.target)
    vedioElement.volume = e.target.value

})

// speed rate

speedSelect.addEventListener('change',function(e) {
    console.log(e.target)
    speed = parseFloat(e.target.value)
    console.log(e.target.value)
    vedioElement.playbackRate = speed
})

// load metadata
vedioElement.addEventListener('loadeddata',updateProgress)