import { pool, oopasImage, drawOopa, machine} from "./global.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = canvas.width = 196;
const CANVAS_HEIGHT = canvas.height = 196;
const openBtn = document.getElementById("open")
const oopaWindow = document.getElementById("oopaWindow")
const oopaCanvas = document.getElementById("oopaCanvas")
const pulledOopaWindow = document.getElementById("pulledOopa")
const oopaCtx = oopaCanvas.getContext("2d")
const pulledOopaName = document.getElementById("pulledOopaName")
const oopaCanvasWidth = oopaCanvas.width;
const oopaCanvasHeight = oopaCanvas.height;
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

if(!localStorage.getItem("Pity Count")){
    localStorage.setItem("Pity Count", 0);
}
let pityCount = Number(localStorage.getItem("Pity Count"));



ctx.imageSmoothingEnabled = false;

document.getElementById("pityCount").innerHTML =pityCount +"/"+gachaTable.pity

oopaCtx.imageSmoothingEnabled = false;


const frameWidth = 64;
const frameHeight = 64;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 20;


function closeWindow(){
    pulledOopaWindow.classList.remove("oopaOpen")
}

function drawMachine(){
    console.log("ahoj")
    ctx.drawImage(machine, frameX*frameWidth, frameY*frameHeight, frameWidth, frameHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
}



function pull(){
    pityCount++
    localStorage.setItem("Pity Count", pityCount)

    let y = gachaTable.commonIndex
    let x = Math.floor(Math.random()*pool[y].oopas.length)
    let pull = Math.random()

    if(pityCount == gachaTable.pity){
        pityCount = 0;
        localStorage.setItem("Pity Count", pityCount)
        y = gachaTable.legendaryIndex
        x = Math.floor(Math.random()*pool[y].oopas.length)
        
        return drawOopa(x, y, oopaCtx, oopaCanvasWidth, oopaCanvasHeight, oopasImage)
    }
    
    
    if(pull < gachaTable.secretRate){
        y = gachaTable.secretIndex
        x = Math.floor(Math.random()*pool[y].oopas.length)

    }else if(pull < gachaTable.secretRate + gachaTable.legendaryRate){
        pityCount = 0;
        localStorage.setItem("Pity Count", pityCount)
        y = gachaTable.legendaryIndex
        x = Math.floor(Math.random()*pool[y].oopas.length)

    }else if(pull < gachaTable.secretRate + gachaTable.legendaryRate + gachaTable.epicRate){
        y = gachaTable.epicIndex
        x = Math.floor(Math.random()*pool[y].oopas.length)

    }else if(pull < gachaTable.secretRate + gachaTable.legendaryRate + gachaTable.epicRate + gachaTable.rareRate){
        y = gachaTable.rareIndex
        x = Math.floor(Math.random()*pool[y].oopas.length)
    }
    return drawOopa(x, y, oopaCtx, oopaCanvasWidth, oopaCanvasHeight, oopasImage)
    
}




let oopaInfo = null
function pullAnimation(){
    canvas.removeEventListener("click", pullAnimation)
    if(gameFrame % staggerFrames == 0){
        ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(machine, frameX*frameWidth, frameY*frameHeight, frameWidth, frameHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        if((frameX*frameWidth)+frameWidth > machine.width){

            gameFrame = 0;
            frameX = 0;
            ctx.drawImage(machine, frameX*frameWidth, frameY*frameHeight, frameWidth, frameHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            oopaInfo = pull()
            console.log(oopaInfo)
            document.getElementById("pityCount").innerHTML =pityCount +"/"+gachaTable.pity
            pulledOopaWindow.onclick = null
            pulledOopaWindow.classList.add("oopaOpen")
            pulledOopaName.style.color = oopaInfo.color
            pulledOopaName.innerHTML = oopaInfo.rarity + ": "+oopaInfo.name
            setTimeout(() => {pulledOopaWindow.onclick = closeWindow}, 500)
            canvas.addEventListener("click", pullAnimation)
            return;
        }else{
            frameX++;
        }
    }
    gameFrame++;
    requestAnimationFrame(pullAnimation)
}

if(!localStorage.getItem("Inventory")){
    localStorage.setItem("Inventory", "[]")
}
let inventory = localStorage.getItem("Inventory")
function claimOopa(){
    console.log(inventory)
    let storedObj = JSON.parse(inventory) || []
    storedObj.push(oopaInfo)
    console.log("This is storedObj " + JSON.stringify(storedObj))
    inventory = JSON.stringify(storedObj)
    localStorage.setItem("Inventory", inventory)

    console.log(JSON.parse(inventory))
    
    closeWindow()
}

openBtn.addEventListener("click", ()=>{
    oopaWindow.classList.add("open")
})
oopaWindow.addEventListener("click", ()=>{
    oopaWindow.classList.remove("open")
})
machine.onload = function(){drawMachine()}
canvas.addEventListener("click", pullAnimation)
document.querySelector(".claimOopa").addEventListener("click", claimOopa)

document.getElementById("inventoryBtn").addEventListener("click", () =>{
    window.location.href = "./inventory.html"
})

