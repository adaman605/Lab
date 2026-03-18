
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

    commonIndex: 0,
    rareIndex: 1,
    epicIndex: 2,
    legendaryIndex: 3,
    secretIndex: 4,

};
const pool = [
    {
        rarity: "Common",
        oopas: ["Purple Oopa", "Light Blue Oopa", "Pink Oopa"],
        color: "white",
    },
    {
        rarity: "Rare",
        oopas: ["Green Oopa", "Orange Oopa", "Lime Oopa"],
        color: "green",
    },
    {
        rarity: "Epic",
        oopas: ["Brown Oopa", "Blue Oopa"],
        color: "purple",
    },
    {
        rarity: "Legendary",
        oopas: ["Yellow Oopa", "Sunlit Oopa"],
        color: "yellow",
    },
    {
        rarity: "Secret",
        oopas: ["Metal Oopa"],
        color: "red",
    }

   
]

const machine = new Image();
machine.src = "images/oopamachine.png";
machine.style.imageRendering = "pixelated"

ctx.imageSmoothingEnabled = false;

const frameWidth = 64;
const frameHeight = 64;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 20;

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

    let index = 0
    let pull = Math.random()

    if(pityCount == gachaTable.pity){
        pityCount = 0;
        localStorage.setItem("Pity Count", pityCount)
        drawOopa(gachaTable.legendaryIndex)
        return
    }
    
    
    if(pull < gachaTable.secretRate){
        index = gachaTable.secretIndex

    }else if(pull < gachaTable.secretRate + gachaTable.legendaryRate){
        pityCount = 0;
        localStorage.setItem("Pity Count", pityCount)
        index = gachaTable.legendaryIndex

    }else if(pull < gachaTable.secretRate + gachaTable.legendaryRate + gachaTable.epicRate){
        index = gachaTable.epicIndex

    }else if(pull < gachaTable.secretRate + gachaTable.legendaryRate + gachaTable.epicRate + gachaTable.rareRate){
        index = gachaTable.rareIndex

    }
    drawOopa(index)
}

function closeWindow(){
    pulledOopaWindow.onclick = ()=>{pulledOopaWindow.classList.remove("oopaOpen")}
}

function drawOopa(index){
    let ranOopa = Math.floor(Math.random()*pool[index].oopas.length)
    oopaCtx.drawImage(oopasImage, ranOopa*32, index*32, 32, 32, 0, 0, oopaCanvasWidth, oopaCanvasHeight)
    pulledOopaName.style.color = pool[index].color
    pulledOopaName.innerHTML = pool[index].rarity+": " + pool[index].oopas[ranOopa]
}

function pullAnimation(){
    canvas.onclick = null;
    if(gameFrame % staggerFrames == 0){
        ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(machine, frameX*frameWidth, frameY*frameHeight, frameWidth, frameHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        if((frameX*frameWidth)+frameWidth > machine.width){

            gameFrame = 0;
            frameX = 0;
            ctx.drawImage(machine, frameX*frameWidth, frameY*frameHeight, frameWidth, frameHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            pull()
            document.getElementById("pityCount").innerHTML =pityCount +"/"+gachaTable.pity
            pulledOopaWindow.onclick = null
            pulledOopaWindow.classList.add("oopaOpen")
            setTimeout(closeWindow, 500)
            canvas.onclick = pullAnimation
            return;
        }else{
            frameX++;
        }
    }
    gameFrame++;
    requestAnimationFrame(pullAnimation)
}






