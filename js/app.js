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
let defficulity;
let selectNumOldId;
let prevRow;
let currRow;
let nextRow;
let prevCol;
let currCol;
let nextCol;
let sec;
/*------------------------ Cached Element References ------------------------*/

const boardEl = document.querySelector('#board')
const numberEl = document.querySelectorAll('.number');
const timeEl = document.querySelector('#time');
const resetBtn = document.querySelector('#reset');
const startEl = document.querySelector('.start');
const containerEl = document.querySelector('.container');
// const startBtn = document.querySelector('#startGame');
const easyBtn = document.querySelector('#easy'); 
const miedumBtn = document.querySelector('#medium'); 
const hardBtn = document.querySelector('#hard'); 
const modal = document.getElementById("myModal");
const mybtn = document.getElementById("myBtn");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

/*-------------------------------- Functions --------------------------------*/
const startPlay = (element) =>{
    startEl.style.display = 'none';
    containerEl.style.display = 'block';
    console.log(element.target.id);
    defficulity = element.target.id;   
    // let easy = false;
    // // if(!easy){
    // //     easy = true;
    // //     easyBtn = easy;
    // // }
    startTime()
}

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
    sec=null;
    console.log("time reset"+sec);
    AddNum = null;
    numbers = null;
    box = null;
    boxEl = null;
    selectedNum = null;
    winner = false;
    prevRow=null;
    currRow=null;
    nextRow=null;
    prevCol=null;
    currCol=null;
    nextCol=null;
    for(let i = 0;i<81;i++){
        document.querySelector(".board").removeChild(document.querySelector(".board div"));
    }
    for(let i=0;i<9;i++){
        document.querySelector(".numbers").removeChild(document.querySelector(".numbers div"));
    }
    mistakes=0;
    document.querySelector("#mistakes").innerHTML = mistakes;
    boardEsay = boardReset;
    startEl.style.display = 'block';
    containerEl.style.display = 'none';
    
    startGame()
    startTime()
}

const startGame = () => {
    // document.querySelector(".modal").style.display = "block";
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
            if (col == 2 || col == 5 ){
                box.style.borderRight = ' 3px solid #000';
            }
            if ( row == 2 || row == 5){
                console.log(row);
                box.style.borderBottom = ' 3px solid #000';
            }
            box.addEventListener('click', updateBoard)

        }
    }
}

const updateBoard = (element) => {
    // console.log("number" + selectedNum);
    if (eraseNum==true){
        erase(element)
    }

    if (selectedNum) {
        let currentRow = element.target.id[0]
        let found = false;
        let currentCol = element.target.id[1]
        // let id = String(currentRow) + String(currentCol)
        // check row
        for (let i = 0; i < boardEsay[currentRow].length; i++) {
                if (boardEsay[currentRow].includes(parseInt(selectedNum))) {
                    console.log("found at row " +currentRow)
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
                console.log("found at column " + currentCol)
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
        

        // check 3x3 grid if contains the number
        if (currentRow == 0 || currentRow == 1 || currentRow == 2){
            prevRow = 0; nextRow=2; currRow=currentRow;
            if (currentCol == 0 || currentCol == 1 || currentCol == 2){
                prevCol =0; nextCol=2; currCol=currentCol;
            }
            else if (currentCol == 3 || currentCol == 4 || currentCol == 5){
                prevCol = 3; nextCol = 5; currCol=currentCol;
            }
            else{
                prevCol = 6; nextCol = 8; currCol=currentCol;
            }
        }
        else if (currentRow == 3 || currentRow == 4 || currentRow == 5) {
            prevRow = 3; nextRow = 5; currRow=currentRow;
            if (currentCol == 0 || currentCol == 1 || currentCol == 2) {
                prevCol = 0; nextCol = 2; currCol=currentCol;
            }
            else if (currentCol == 3 || currentCol == 4 || currentCol == 5) {
                prevCol = 3; nextCol = 5; currCol=currentCol;
            }
            else {
                prevCol = 6; nextCol = 8; currCol=currentCol;
            }
        }
        else{
            prevRow = 6; nextRow = 8; currRow=currentRow;
            if (currentCol == 0 || currentCol == 1 || currentCol == 2) {
                prevCol = 0; nextCol = 2; currCol=currentCol;
            }
            else if (currentCol == 3 || currentCol == 4 || currentCol == 5) {
                prevCol = 3; nextCol = 5; currCol=currentCol;
            }
            else {
                prevCol = 6; nextCol = 8; currCol=currentCol;
            }
        }
        for (let i = prevRow; i <= nextRow; i++) {
            for (let j = prevCol; j <= nextCol; j++) {

                if (boardEsay[i][j] == parseInt(selectedNum)) {
                    console.log("found at row: " +i+" Column: "+ j)
                    if (eraseNum == false) {
                        mistakes++;
                    } else {
                        mistakes--;
                    }
                    document.querySelector("#mistakes").innerHTML = mistakes;
                    found = true;
                    return;
                }
            }
        }
 
        if (!found) {
            // console.log("add new num")
            document.getElementById(element.target.id).textContent = selectedNum;
            boardEsay[currentRow][currentCol] = parseInt(selectedNum)
            console.log(found);
        }


        
    }

    checkForWinner();
    if(winner==true){
        clearInterval(timer);
        if (selectNumOldId)
            document.getElementById(selectNumOldId).classList.remove("selectNumY");
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // console.log("t");
                let id = String(row) + String(col)
                document.getElementById(id).classList.add("disabledDiv");

            }
        }
        for (let i = 1; i <= 9; i++) {
            document.getElementById(i).classList.add("disabledDiv");
            document.getElementById(i).classList.add("selectNumN");
        }
        document.querySelector(".modal-body").innerHTML = "<h1> Congratulations! You Won! </h1>"
        document.querySelector(".modal").style.display = "block";
        console.log("game ended");
    }

}

const selectNum = (event) => {
    // console.log("log"+event);

    eraseNum =false;
    AddNum = event.target.textContent;
    selectedNum = AddNum;
    // console.log("id: "+event.target.id);
    document.getElementById(AddNum).classList.add("selectNumY");
    if(selectNumOldId==null){
    selectNumOldId = AddNum;
    }else{
        document.getElementById(selectNumOldId).classList.remove("selectNumY");
        selectNumOldId = AddNum;
    }

    console.log('Clicked number:', AddNum);
}

const startTime = () => {
    clearInterval(timer);
    if (defficulity =="easy"){
        sec = 600;
    }
    else if (defficulity == "medium"){
        sec = 300;
    }
    else{
        sec = 180;
    }
  
    // if (easyBtn){
        // console.log(easyBtn);
        // console.log(miedumBtn);
        
    timer = setInterval(() => {
        // console.log(sec);
       
        if (sec <= 0) {
            clearInterval(timer);
            if(selectNumOldId)
            document.getElementById(selectNumOldId).classList.remove("selectNumY");
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    // console.log("t");
                    let id = String(row) + String(col)
                    document.getElementById(id).classList.add("disabledDiv");
                    
                }
            }
            for(let i =1;i<=9;i++){
                document.getElementById(i).classList.add("disabledDiv");
                document.getElementById(i).classList.add("selectNumN");
            }
            document.querySelector(".modal-body").innerHTML = "<h3> Game Finished </h3>"
            document.querySelector(".modal").style.display = "block";
        }
        let timeM = Math.floor(sec / 60);
        // console.log(timeM);
        let timeS = sec % 60;
        // console.log(timeM);
        if(sec>=0){
        timeEl.innerHTML = `${timeM}:${timeS}`;
        }else{
            timeEl.innerHTML =`00:00`;
        }
        sec--;
    }, 1000)
}

const erase =(element)=>{
    if(selectedNum)
    document.getElementById(selectedNum).classList.remove("selectNumY");
    selectedNum=null;
    let currentRow = element.target.id[0]
    let currentCol = element.target.id[1]
    let id = String(currentRow) + String(currentCol)
    document.getElementById(id).textContent = '';
    boardEsay[currentRow][currentCol] = 0;
    eraseNum = false;

}



/*----------------------------- Event Listeners -----------------------------*/
document.querySelector(".close").addEventListener('click',function(){
    document.querySelector(".modal").style.display = "none";
})
easyBtn.addEventListener('click', startPlay);
miedumBtn.addEventListener('click', startPlay);
hardBtn.addEventListener('click', startPlay);
resetBtn.addEventListener('click', init)
document.querySelector("#erase").addEventListener("click",function(){
    if(eraseNum==false){
        eraseNum =true;
        document.querySelector("#erase").classList.add("eraseClick");
    }
    else{
    eraseNum=false;
    document.querySelector("#erase").classList.remove("eraseClick");
}
})


// selectNum()
startGame()
updateBoard()



