
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
if(!localStorage.getItem("Pity Count")){
    localStorage.setItem("Pity Count", 0);
}
let pityCount = Number(localStorage.getItem("Pity Count"));

const machine = new Image();
machine.src = "images/oopamachine.png";
machine.style.imageRendering = "pixelated"

ctx.imageSmoothingEnabled = false;

document.getElementById("pityCount").innerHTML =pityCount +"/"+gachaTable.pity

oopaCtx.imageSmoothingEnabled = false;
const oopasImage = new Image()
oopasImage.src = "images/Oopa.png"
oopasImage.style.imageRendering = "pixelated"

const frameWidth = 64;
const frameHeight = 64;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 10;


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
    return drawOopa(false, null, index)
    
}



function drawOopa(custom, x, y, nameEle, ctx, width, height){
    let posX = x
    let posY = y
    if(!custom){
        if(!x){
            posX = Math.floor(Math.random()*pool[posY].oopas.length)
            console.log(x)
        }
        oopaCtx.drawImage(oopasImage, posX*32, posY*32, 32, 32, 0, 0, oopaCanvasWidth, oopaCanvasHeight)
        pulledOopaName.style.color = pool[posY].color
        pulledOopaName.innerHTML = pool[posY].rarity+": " + pool[posY].oopas[posX]
    }else{
        ctx.drawImage(oopasImage, posX*32, posY*32, 32, 32, 0, 0, width, height)
        nameEle.style.color = pool[posY].color
        nameEle.innerHTML = pool[posY].rarity+": " + pool[posY].oopas[posX]
    }



    return {x: posX, y: posY, rarity: pool[posY].rarity, name: pool[posY].oopas[posX]} 
}
let oopaInfo = null
function pullAnimation(){
    canvas.onclick = null;
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
            setTimeout(() => {pulledOopaWindow.onclick = closeWindow}, 500)
            canvas.onclick = pullAnimation
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
const inventoryWindow = document.getElementById("inventoryWindow")
const cardsContainer = document.getElementById("cardsContainer")

let previousLength = 0
function showInventory(){
    let inv = JSON.parse(inventory) || []
    if(previousLength != inv.length){
        for(let i = previousLength; i < inv.length; i++){
            let div = document.createElement("div")
            let p = document.createElement("p")
            let canvas = document.createElement("canvas")
            canvas.width = 128
            canvas.height = 128
            let canvasCtx = canvas.getContext("2d")
            canvasCtx.imageSmoothingEnabled = false;
        
            drawOopa(true, inv[i].x, inv[i].y, p, canvasCtx, canvas.width, canvas.height)

            div.classList.add("invenCards")
            div.append(p, canvas)

            cardsContainer.appendChild(div)
        }
        previousLength = inv.length
    }
    document.documentElement.style.overflow = "hidden"
    inventoryWindow.classList.add("openInventory")
}
function closeInventory(){
    document.documentElement.style.overflow = "scroll"
    inventoryWindow.classList.remove("openInventory")
}
openBtn.addEventListener("click", ()=>{
    oopaWindow.classList.add("open")
})
oopaWindow.addEventListener("click", ()=>{
    oopaWindow.classList.remove("open")
})
machine.onload = function(){drawMachine()}




