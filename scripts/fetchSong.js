const style = document.getElementById("style")
const song = document.getElementById("song")
const songText = document.getElementById("songText")
const apiURL = "https://songserver-kqgl.onrender.com/song-of-the-day"
const songPlayer = document.getElementById("play")
const progress = document.getElementById("progress")
let data;
let pos = "right";
let skipTime = 5;
async function fetchURL() {
    songPlayer.onclick = null;
    songText.innerHTML = "Getting song for you n00b..."
    style.innerHTML = `
    @keyframes my-animation{
        0%{${pos}: -${songText.offsetWidth}px}
        100%{${pos}: 100%}
    }
    `
    const res = await fetch(apiURL)
    const data = await res.json()
    return data 
}
document.addEventListener("DOMContentLoaded", async function () {
    data = await fetchURL();
    song.src = data.url
    songText.innerHTML = data.title + " - "+data.author
    style.innerHTML = `
    @keyframes my-animation{
        0%{${pos}: -${songText.offsetWidth}px}
        100%{${pos}: 100%}
    }
    `
    document.getElementById("forward").onclick = forward
    document.getElementById("back").onclick = backward
    document.getElementById("play").onclick = playSong
});
song.onloadedmetadata = function (){
    progress.max = song.duration;
    progress.value = song.currentTime;
}

progress.onchange = function (){
    console.log("ahoj")
    song.currentTime = progress.value;
    document.getElementById("playImg").src = "/images/pause.svg"
    song.play()
}

function forward(){
    if(song.currentTime + skipTime > song.duration){
        song.currentTime = song.duration
    }else{
        song.currentTime += skipTime
    }
    progress.value = song.currentTime
    
}

function backward(){
    if(song.currentTime - skipTime < 0){
        song.currentTime = 0
    }else{
        song.currentTime -= skipTime
    }
    progress.value = song.currentTime
    
}
        
function playSong(){
    
    console.log("ahoj")
    song.src = data.url
    song.volume = 0.50;
    song.loop = true
    progress.value = song.currentTime
    song.play()

    songPlayer.onclick = stopSong;
    document.getElementById("playImg").src = "/images/pause.svg"
    
}

function stopSong(){
    document.getElementById("playImg").src = "/images/play.svg"
    song.pause();
    songPlayer.onclick = playSong;
    
}
setInterval(()=>{
    progress.value = song.currentTime
},1000)