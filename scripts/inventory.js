import { drawOopa, oopasImage} from "./global.js"

document.getElementById("closeBtn").addEventListener("click", closeInventory)
window.addEventListener("load", showInventory)

const cardsContainer = document.getElementById("cardsContainer")


let inventory

function showInventory(){
    inventory = localStorage.getItem("Inventory")
    if(!inventory || inventory === "[]"){
        
        let inventoryEmpty = document.createElement("h1")
        inventoryEmpty.innerHTML = "You need to pull and claim oopa first..."
        inventoryEmpty.style.textAlign = "center"
        cardsContainer.appendChild(inventoryEmpty)
    }else{
        console.log(inventory)
        let inv = JSON.parse(inventory)
        console.log(inv)
        cardsContainer.classList.add("cardsContainer")
        for(let i = 0; i < inv.length; i++){
            console.log("x: "+inv[i].x+" y: "+inv[i].y)
            let div = document.createElement("div")
            let contents = document.createElement("div")
            let p = document.createElement("p")
            let canvas = document.createElement("canvas")
            let canvasCtx = canvas.getContext("2d")
            canvasCtx.imageSmoothingEnabled = false;
            
            let oopaInfo = drawOopa(inv[i].x, inv[i].y,canvasCtx, canvas.width, canvas.height, oopasImage)
            console.log("Color: "+oopaInfo.color)
            console.log("Name: "+oopaInfo.name)
            console.log("Rarity: "+oopaInfo.rarity)
            p.style.color = oopaInfo.color
            p.innerHTML = oopaInfo.rarity + ": "+oopaInfo.name
            contents.classList.add("contents")
            contents.classList.add("cardContents")
            contents.appendChild(canvas)
            div.classList.add("invenCards")
            div.classList.add("frame")
            div.append(p, contents)

            cardsContainer.appendChild(div)
            console.log("")
        }

    }


}


function closeInventory(){
   window.location.href = "./index.html"
}
