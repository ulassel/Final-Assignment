const buttons = document.querySelectorAll("button");
const scoreboard = document.querySelector("#scoreboard");
const rock_btn = document.querySelector("#rock");
const paper_btn = document.querySelector("#paper");
const scissors_btn = document.querySelector("#scissors");
const computer_text = document.querySelector("#computer_text");
const player_text = document.querySelector("#player_text");
const notify = document.querySelector("#notify");
const results = [["t", "c", "p"], 
                 ["p", "t", "c"], 
                 ["c", "p", "t"]];
let computerSelection = 0;
let playerSelection = 0;
let player = 0;
let computer = 0;
let result = "";

rock_btn.addEventListener('click', () => {
    document.getElementById("player").src = "../images/rock.png";
    playerSelection = 0;
    player_text.innerHTML = "Rock";
    game();
});

paper_btn.addEventListener('click', () => {
    document.getElementById("player").src = "../images/paper.webp";
    playerSelection = 1;
    player_text.innerHTML = "Paper";
    game();
});

scissors_btn.addEventListener('click', () => {
    document.getElementById("player").src = "../images/scissors.png";
    playerSelection = 2;
    player_text.innerHTML = "Scissors";
    game();
});

function computerPlay(){
    return Math.floor(Math.random()*3);
}

function playRound(playerSelection, computerSelection){
    computerSelection = computerPlay();
                         
    switch(computerSelection){
        case 0:
            document.getElementById("computer").src = "../images/rock.png";
            computer_text.innerHTML = "Rock";
            break;
        case 1:
            document.getElementById("computer").src = "../images/paper.webp";
            computer_text.innerHTML = "Paper";
            break;
        case 2:
            document.getElementById("computer").src = "../images/scissors.png";
            computer_text.innerHTML = "Scissors";      
    }
    
    //if(computerSelection == playerSelection){
    //    window.alert("It's a draw!");
    //}else if((computerSelection == 0 && playerSelection == 2) || (computerSelection == 1 && playerSelection == 0) || (computerSelection == 2 && playerSelection == 1)){
    //    window.alert("Computer wins this round!");
    //     computer++;
    //     scoreboard.innerHTML = `Player: ${player} - Computer: ${computer}`;   
    // }else if((computerSelection == 2 && playerSelection == 0) || (computerSelection == 0 && playerSelection == 1) || (computerSelection == 1 && playerSelection == 2)){
    //     window.alert("Player wins this round!");
    //     player++;
    //     scoreboard.innerHTML = `Player: ${player} - Computer: ${computer}`; 
    // }

    return results[playerSelection][computerSelection];
}

function game(){
    while(player != 5 || computer !=5){
        result = playRound();
    
         switch(result){
             case "p":
                 player++;
                 window.alert("Player wins this round!");
                 scoreboard.innerHTML = `Player: ${player} - Computer: ${computer}`;
                 break;
             case "c":
                 computer++;
                 window.alert("Computer wins this round!");
                 scoreboard.innerHTML = `Player: ${player} - Computer: ${computer}`;
                 break;
             case "t":
                 window.alert("It's a draw!");
                 scoreboard.innerHTML = `Player: ${player} - Computer: ${computer}`;
         }
     }

    if(player > computer){
        notify.innerHTML = "Player wins the game!";
    }else if(computer > player){
        notify.innerHTML = "Computer wins the game!";
    }
}