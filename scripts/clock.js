const hrs = document.getElementById("hours")
const mins = document.getElementById("minutes")
const secs = document.getElementById("seconds")

setInterval(() => {
    let currentTime = new Date()
    hrs.innerHTML = (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
    mins.innerHTML = (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
    secs.innerText = (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
    progress.value = song.currentTime
}, 1000);