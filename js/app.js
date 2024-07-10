/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let boardEsay = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [5, 9, 8, 3, 0, 4, 6, 2, 0],
    [7, 6, 4, 1, 0, 0, 3, 8, 0],
    [8, 0, 1, 2, 0, 6, 4, 0, 0],
    [0, 4, 0, 0, 0, 1, 2, 0, 0],
    [0, 5, 6, 7, 0, 0, 0, 0, 0],
    [4, 2, 0, 0, 5, 8, 0, 3, 0],
    [0, 0, 0, 0, 3, 2, 8, 7, 6],
    [6, 0, 0, 0, 0, 7, 0, 4, 0]
]

let boardReset = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [5, 9, 8, 3, 0, 4, 6, 2, 0],
    [7, 6, 4, 1, 0, 0, 3, 8, 0],
    [8, 0, 1, 2, 0, 6, 4, 0, 0],
    [0, 4, 0, 0, 0, 1, 2, 0, 0],
    [0, 5, 6, 7, 0, 0, 0, 0, 0],
    [4, 2, 0, 0, 5, 8, 0, 3, 0],
    [0, 0, 0, 0, 3, 2, 8, 7, 6],
    [6, 0, 0, 0, 0, 7, 0, 4, 0]
]
let AddNum;
let numbers;
let box;
let timer;
let boxEl;
let selectedNum;
let mistakes = 0;
let eraseNum = false;
let winner = false;
/*------------------------ Cached Element References ------------------------*/

const boardEl = document.querySelector('#board')
// const boxEl = document.querySelectorAll('.box');
const numberEl = document.querySelectorAll('.number');
const timeEl = document.querySelector('#time');
const resetBtn = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
const checkForWinner = () => {
    // console.log("t");

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            // console.log("t");
            let id = String(row)+String(col)
            if(document.getElementById(id).textContent ==''){
                return winner=false;
            }
                
            
        }
    }
    return winner=true;
}
const init = () => {

    console.log('reset')
    AddNum = null;
    numbers = null;
    box = null;
    clearInterval(timer);
    boxEl = null;
    selectedNum = null;
    winner = false;
    for(let i = 0;i<81;i++){
        document.querySelector(".board").removeChild(document.querySelector(".board div"));
    }
    for(let i=0;i<9;i++){
        document.querySelector(".numbers").removeChild(document.querySelector(".numbers div"));
    }
    mistakes=0;
    document.querySelector("#mistakes").innerHTML = mistakes;
    boardEsay = boardReset;
    startGame()
    // updateBoard()
    startTime()
    // startGame()
}

const startGame = () => {
    // numbers 1-9 (show the numbers in the HTML)
    for (let i = 1; i <= 9; i++) {
        numbers = document.createElement('div');
        numbers.id = i;
        numbers.innerText = i;
        numbers.classList.add('number');
        let num = document.querySelector('.numbers').appendChild(numbers);
        num.addEventListener('click', selectNum)
    }
    // 9x9 board
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            box = document.createElement('div')
            box.id = row.toString() + col.toString();
            //show array
            if (boardEsay[row][col] != 0) {
                box.innerText = boardEsay[row][col];
            }
            box.classList.add('box');
            boxEl = document.querySelector('.board').append(box);
            box.addEventListener('click', updateBoard)

        }
    }
}

const updateBoard = (element) => {
    // console.log("number" + selectedNum);
    if (eraseNum==true){
        erase(element)
        eraseNum=false;
    }
    if (selectedNum) {

        
        let currentRow = element.target.id[0]
        let found = false;
        let currentCol = element.target.id[1]
        let id = String(currentRow) + String(currentCol)
        // check row
        for (let i = 0; i < boardEsay[currentRow].length; i++) {
                if (boardEsay[currentRow].includes(parseInt(selectedNum))) {
                    if(eraseNum==false){
                    mistakes++;
                    }else{
                        mistakes--;
                    }
                    document.querySelector("#mistakes").innerHTML = mistakes;
                    found = true;
                    return;
                }
                // } else {
                //     document.getElementById(element.target.id).textContent = selectedNum;
                //     boardEsay[currentRow][parseInt(element.target.id)] = parseInt(selectedNum)
                // }
                
        }

            // check column
        for (let j = 0; j < boardEsay.length; j++) {

            if (boardEsay[j][currentCol] == parseInt(selectedNum)){
                console.log("found at" + j + currentCol)
                if(eraseNum==false){
                mistakes++;
                }else{
                    mistakes--;
                }
                document.querySelector("#mistakes").innerHTML = mistakes;
                found = true;
                return;
            } 
            
        }

        if (!found) {
            console.log("add new num")
            document.getElementById(element.target.id).textContent = selectedNum;
            boardEsay[currentRow][currentCol] = parseInt(selectedNum)
        }
    }

    checkForWinner();
    if(winner==true){
        console.log("game ended");
    }
    // for(let k = 2; )
}

const selectNum = (event) => {
    // console.log("log"+event);
    eraseNum =false
    AddNum = event.target.textContent;
    selectedNum = AddNum;
    console.log('Clicked number:', AddNum);
}

const startTime = () => {
    let sec = 300;
    timer = setInterval(() => {
        let timeM = Math.floor(sec /60);
        let timeS = sec%60;
        timeEl.innerHTML = `${timeM}:${timeS}`;
        sec--;
    }, 1000) // each  1 sec
}

const erase =(element)=>{
    // if(mistakes>0){
    //     mistakes--
    // }
    let currentRow = element.target.id[0]
    let currentCol = element.target.id[1]
    let id = String(currentRow) + String(currentCol)
    document.getElementById(id).textContent = '';

}



/*----------------------------- Event Listeners -----------------------------*/


resetBtn.addEventListener('click', init)
document.querySelector("#erase").addEventListener("click",function(){
    if(eraseNum==false)
        eraseNum =true;
    else
    eraseNum=false;
})
// selectNum()
startGame()
updateBoard()
startTime()
// init()







