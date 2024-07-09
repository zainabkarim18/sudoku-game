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
let AddNum;
let numbers;
let box;
let timer;
let boxEl;
let selectedNum;
/*------------------------ Cached Element References ------------------------*/

const boardEl = document.querySelector('#board')
// const boxEl = document.querySelectorAll('.box');
const numberEl = document.querySelectorAll('.number');
const timeEl = document.querySelector('#time');

/*-------------------------------- Functions --------------------------------*/

const init = () => {

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
    if (selectedNum) {


        let currentRow = element.target.id[0]
        let found = false;
        let currentCol = element.target.id[1]

        // check row
        for (let i = 0; i < boardEsay[currentRow].length; i++) {
                if (boardEsay[currentRow].includes(parseInt(selectedNum))) {
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

    // for(let k = 2; )
}

const selectNum = (event) => {
    // console.log("log"+event);
    AddNum = event.target.textContent;
    selectedNum = AddNum;
    console.log('Clicked number:', AddNum);
}

const startTime = () => {
    let sec = 0;
    timer = setInterval(() => {
        timeEl.innerHTML = `00:${sec}`;
        sec++;
    }, 1000) // each  1 sec
}

/*----------------------------- Event Listeners -----------------------------*/


// selectNum()
startGame()
updateBoard()
startTime()







