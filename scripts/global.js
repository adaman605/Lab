export function drawOopa(posX, posY, ctx, width, height, image){

    ctx.drawImage(image, posX*32, posY*32, 32, 32, 0, 0, width, height)


    return {x: posX, y: posY, rarity: pool[posY].rarity, name: pool[posY].oopas[posX], color: pool[posY].color} 
}

const oopasImage = new Image()
oopasImage.src = "images/Oopa.png"
oopasImage.style.imageRendering = "pixelated"
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
export {oopasImage}
export {pool}
export {machine}
