//Feito no vscode e depois passado para o replit

//0 = X || 1 = O
let turno = 0;

let winSound = new Audio('./audios/win.mp3');
let loseSound = new Audio('./audios/lose.mp3');

let jogador = [];
let computador = [];

let winCount = 0;
let moveCount = 0;
let playing = false;

let winX = 0;
let winO = 0;

let moveX = 0;
let moveO = 0;

let melhorTempo = 120;

let timerStart = 0;

//Posições válidas
let positions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [3,5,7],
    [1,4,7],
    [2,5,8],
    [3,6,9]
]
let time = 0;

let timer = setInterval(() => {
  if (timerStart == 1)
  {
    time++;
    document.querySelector('#tempo').innerText = time;
  }
}, 1000);

function setup() {
    let squares = document.querySelectorAll('.square');

    squares.forEach((square) => {
        square.addEventListener('click', move);
    })

    document.querySelector('#winX').innerText = winX;
    document.querySelector('#winO').innerText = winO;
    document.querySelector('#tempo').innerText = time;
    document.querySelector('#b-tempo').innerText = melhorTempo;
}

function move(e)
{
  if (timerStart == 0) {
    timerStart = 1;
  }
  moveCount++
    let currSquare = e.target;
    checkCurrentPlayer(currSquare);
    currSquare.className = 'square-block';
    currSquare.removeEventListener("click", move);
    checkPlayer();
    checkComp();
    checkTie();
}

function checkCurrentPlayer(currSquare)
{
      if (turno == 0) {
        currSquare.style = "color: green";
        currSquare.innerText = "X";
        jogador.push(currSquare.dataset.id);
        turno = 1
        moveX++
        document.querySelector('#jogador').style = "color: red";
        document.querySelector('#jogador').innerText = "O";
        
    } else {
        currSquare.style = "color: red";
        currSquare.innerText = "O";
        computador.push(currSquare.dataset.id);
        turno = 0;
        moveO++;
        document.querySelector('#jogador').style = "color: green";
        document.querySelector('#jogador').innerText = "X";
    }
}

function checkTie() {
  if (moveCount == 9 && winCount < 3 && winComp < 3){
      console.log('Move func: ', winCount);
      document.querySelector('#modal-bg').style = "display: flex";
      document.querySelector('#title-win').innerHTML = "Deu velha";
      loseSound.volume = 0.2;
      loseSound.play();
      return;
    }
}

function checkPlayer() {
    playing = true;
    for(let i = 0;i < positions.length;i++)
    {
        let group = positions[i];
        for(let j = 0; j < jogador.length;j++)
        {
            let move = parseInt(jogador[j]);
            if (group.includes(move))
            {
                winCount++;
                if (winCount >= 3) {
                    i = 10;
                    if(moveX < 4) {
                      winX += 2;
                    } else {
                      winX++;
                    }
                    displayWin('color: green', 'X', winX);
                    break;
                }
                
            }
        }
        if (winCount != 3)
        {
          winCount = 0;
        }
    }
}

function displayWin(color, player, win) {
                    timerStart = 0;
                  if(time < melhorTempo)
                  {
                    melhorTempo = time;
                  }
              
                  document.querySelector('#winX').innerText = win;
                    document.querySelector('#modal-bg').style = "display: flex";
                    document.querySelector('#win').style = color;
                    document.querySelector('#win').innerText = player
                    winSound.play();
                playing = false;
}

let winComp = 0;
function checkComp() {
  playing = true;
    for(let i = 0;i < positions.length;i++)
    {
        let group = positions[i];
        for(let j = 0; j < computador.length;j++)
        {
            let move = parseInt(computador[j]);
            if (group.includes(move))
            {
                winComp++;
                if (winComp >= 3) {
                    i = 10;
                    if(moveO < 4) {
                      winO += 2;
                    } else {
                      winO++;
                    }
                    displayWin('color: red', 'O', winO);
                    break;
                }
            }
        }
        if (winComp != 3)
        {
          winComp = 0;
        } 
    }
}

function reset() {
  moveCount = 0;
  moveX = 0;
  moveO = 0;
  winCount = 0;
  winComp = 0;
  turno = 0;
  jogador = [];
  computador = [];

  document.querySelector('#modal-bg').style = "display: none";

  document.querySelector('#jogador').style = "color: green";
  document.querySelector('#jogador').innerText = "X";

  let squares = document.querySelectorAll('.square')
  squares.forEach((square) => {
      square.innerText = "";
  });

  let squaresBlock = document.querySelectorAll('.square-block')
  squaresBlock.forEach((square) => {
    square.className = "square";  
    square.innerText = "";
  });
  time = 0;
  timerStart = 0;

  setup();
}

setup();