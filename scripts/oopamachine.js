
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pullButton = document.getElementById("pull")
const CANVAS_WIDTH = canvas.width = 196;
const CANVAS_HEIGHT = canvas.height = 196;
const openBtn = document.getElementById("open")
const closeBtn = document.getElementById("close")
const oopaWindow = document.getElementById("oopaWindow")
const oopaCanvas = document.getElementById("oopaCanvas")
const pulledOopaWindow = document.getElementById("pulledOopa")
const oopaCtx = oopaCanvas.getContext("2d")
const pulledOopaName = document.getElementById("pulledOopaName")
pulledOopaName.style.userSelect = "none"
const oopaCanvasWidth = oopaCanvas.offsetWidth;
const oopaCanvasHeight = oopaCanvas.offsetHeight;
const gachaTable = {
    pity: 100,
    secretRate: 0.001,
    legendaryRate: 0.009, 
    rareRate: 0.15,
    epicRate: 0.04,
};
const pool = {
    secret: ["Metal Oopa"],
    legendary:["Yellow Oopa", "Sunlit Oopa"],
    epic:["Brown Oopa", "Blue Oopa"],
    rare:["Green Oopa", "Orange Oopa", "Lime Oopa"],
    common:["Purple Oopa", "Light Blue Oopa", "Pink Oopa"],

    commonIndex: 0,
    rareIndex: 1,
    epicIndex: 2,
    legendaryIndex: 3,
    secretIndex: 4,
}

const machine = new Image();
machine.src = "images/oopamachine.png";
machine.style.imageRendering = "pixelated"

ctx.imageSmoothingEnabled = false;

const frameWidth = 64;
const frameHeight = 64;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 40;

openBtn.addEventListener("click", ()=>{
    oopaWindow.classList.add("open")
})
oopaWindow.addEventListener("click", ()=>{
    oopaWindow.classList.remove("open")
})

function drawMachine(){
    console.log("ahoj")
    ctx.drawImage(machine, frameX*frameWidth, frameY*frameHeight, frameWidth, frameHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}
machine.onload = function(){drawMachine()}


if(!localStorage.getItem("Pity Count")){
    localStorage.setItem("Pity Count", 0);
}
let pityCount = Number(localStorage.getItem("Pity Count"));


document.getElementById("pityCount").innerHTML =pityCount +"/"+gachaTable.pity
oopaCtx.imageSmoothingEnabled = false;
const oopasImage = new Image()
oopasImage.src = "images/Oopa.png"
oopasImage.style.imageRendering = "pixelated"
function pull(){

    pityCount++
    localStorage.setItem("Pity Count", pityCount)
    if(pityCount == gachaTable.pity){
        pityCount = 0;
        localStorage.setItem("Pity Count", pityCount)
        if(Math.random() < 0.5){
            return pool.legendary[0]
        }else{
            return pool.legendary[1]
        }
    }
    let pull = Math.random();

    if(pull < gachaTable.secretRate){
        const ranPull = Math.floor(Math.random()*pool.secret.length)
        console.log(ranPull)
        oopaCtx.drawImage(oopasImage, ranPull*32, pool.secretIndex*32, 32, 32, 0, 0, oopaCanvasWidth, oopaCanvasHeight)
        pulledOopaName.style.color = "red"
        pulledOopaName.innerHTML = "Secret: "+pool.secret[ranPull]
    }else if(pull < gachaTable.secretRate + gachaTable.legendaryRate){
        
        const ranPull = Math.floor(Math.random()*pool.legendary.length)
        console.log(ranPull)
        oopaCtx.drawImage(oopasImage, ranPull*32, pool.legendaryIndex*32, 32, 32, 0, 0, oopaCanvasWidth, oopaCanvasHeight)
        pulledOopaName.style.color = "yellow"
        pulledOopaName.innerHTML = "Legendary: "+pool.legendary[ranPull]

    }else if(pull < gachaTable.secretRate + gachaTable.legendaryRate + gachaTable.epicRate){

        const ranPull = Math.floor(Math.random()*pool.epic.length)
        console.log(ranPull)
        oopaCtx.drawImage(oopasImage, ranPull*32, pool.epicIndex*32, 32, 32, 0, 0, oopaCanvasWidth, oopaCanvasHeight)
        pulledOopaName.style.color = "purple"
        pulledOopaName.innerHTML = "Epic: "+pool.epic[ranPull]

    }else if(pull < gachaTable.secretRate + gachaTable.legendaryRate + gachaTable.epicRate + gachaTable.rareRate){
        
        const ranPull = Math.floor(Math.random()*pool.rare.length)
        console.log(ranPull)
        oopaCtx.drawImage(oopasImage, ranPull*32, pool.rareIndex*32, 32, 32, 0, 0, oopaCanvasWidth, oopaCanvasHeight)
        pulledOopaName.style.color = "green"
        pulledOopaName.innerHTML = "Rare: "+pool.rare[ranPull]

    }else{

        const ranPull = Math.floor(Math.random()*pool.common.length)
        console.log(ranPull)
        oopaCtx.drawImage(oopasImage, ranPull*32, pool.commonIndex*32, 32, 32, 0, 0, oopaCanvasWidth, oopaCanvasHeight)
        pulledOopaName.style.color = "white"
        pulledOopaName.innerHTML = "Common: "+pool.common[ranPull]

    }
}
pulledOopaWindow.addEventListener("click", ()=>{
    pulledOopaWindow.classList.remove("oopaOpen")
})


function pullAnimation(){
    canvas.onclick = null;
    if(gameFrame % staggerFrames == 0){
        ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(machine, frameX*frameWidth, frameY*frameHeight, frameWidth, frameHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        if((frameX*frameWidth)+frameWidth > machine.width){

            gameFrame = 0;
            frameX = 0;
            ctx.drawImage(machine, frameX*frameWidth, frameY*frameHeight, frameWidth, frameHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        
            document.getElementById("pityCount").innerHTML =pityCount +"/"+gachaTable.pity
            pull()
            pulledOopaWindow.classList.add("oopaOpen")
            canvas.onclick = pullAnimation;
            return;
        }else{
            frameX++;
        }
    }
    gameFrame++;
    requestAnimationFrame(pullAnimation)
}






