const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];
let slides=[
    "slideRight",
    "slideLeft",
    "slideUp",
    "slideDown",
]
const createMaze = ()=>{
    let contIds =0
    let divMaz = document.querySelector(".container_maze")
    for(let row=0;row<map.length;row++){
        let divRow =document.createElement("div");
        divRow.classList="row"
        divMaz.appendChild(divRow)
        for(let col=0;col<map[row].length;col++){
            let divCol = document.createElement("div")
            if(map[row][col]==="W"){
                divCol.classList=`wall row${row} col${col}`
            }
            if(map[row][col]==="S"){
                divCol.classList=`floor row${row} col${col} playerPosition`
                let divPlayer = document.createElement("div")
                divPlayer.id = "player"
                divCol.appendChild(divPlayer)
            }
            if(map[row][col]===" "){
                divCol.classList=`floor row${row} col${col}`
            }
            if(map[row][col]==="F"){
                divCol.classList=`finish row${row} col${col}`
            }
            divRow.appendChild(divCol)
        }
    }
}
createMaze()

const collide= (row, col)=>{
    let wherePlayer = document.querySelector(".playerPosition")
    let nextPosition = document.querySelector(`.row${row}.col${col}`)
    if(nextPosition!==null && !nextPosition.className.includes("wall")){
        nextPosition.classList.add("playerPosition")
        nextPosition.appendChild(player)
        wherePlayer.classList.remove("playerPosition")
    }
    if(nextPosition!==null && nextPosition.className.includes("finish")){
        victory()
    }
}
const movePlayer =()=>{
    document.addEventListener("keydown", (event) => {
        const keyName = event.key;
        let wherePlayer = document.querySelector(".playerPosition")
        let playerAnimation = document.querySelector("#player")
        console.log(playerAnimation)
        let rowPlayer = wherePlayer.classList[1]
        let colPlayer = wherePlayer.classList[2]
        let numberRow = rowPlayer.replace(/\D/gim, '')
        let numberCol = colPlayer.replace(/\D/gim, '')
    if(keyName==="ArrowRight"){
        playerAnimation.classList.remove("slideDown")
        playerAnimation.classList.add("slideRight")
        playerAnimation.classList.remove("slideUp")
        playerAnimation.classList.remove("slideLeft")

        numberCol ++
        collide(numberRow, numberCol)
        
    }
    if(keyName==="ArrowDown"){
        playerAnimation.classList.add("slideDown")
        playerAnimation.classList.remove("slideRight")
        playerAnimation.classList.remove("slideUp")
        playerAnimation.classList.remove("slideLeft")
        
        numberRow++
        collide(numberRow, numberCol)
    }
    if(keyName==="ArrowUp"){
        playerAnimation.classList.remove("slideDown")
        playerAnimation.classList.remove("slideRight")
        playerAnimation.classList.add("slideUp")
        playerAnimation.classList.remove("slideLeft")

        numberRow--
        collide(numberRow, numberCol)
    }
    if(keyName==="ArrowLeft"){
        playerAnimation.classList.remove("slideDown")
        playerAnimation.classList.remove("slideRight")
        playerAnimation.classList.remove("slideUp")
        playerAnimation.classList.add("slideLeft")

        numberCol--
        collide(numberRow, numberCol)
    }
    })
}
movePlayer()

const victory=()=>{
    let divMaz = document.querySelector(".container_maze")
    divMaz.classList.add("hidden")
    let divWinner = document.querySelector(".winner")
    divWinner.classList.remove("hidden")
}
const Restart=()=>{
    let divMaz = document.querySelector(".container_maze")
    divMaz.innerText=""
    divMaz.classList.remove("hidden")
    let divWinner = document.querySelector(".winner")
    divWinner.classList.add("hidden")
    createMaze()
}
let restart = document.querySelector(".restart")
restart.addEventListener("click", Restart)