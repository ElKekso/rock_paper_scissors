let humanScore = 0;
const huSc = document.createElement("p");
let computerScore = 0;
const coSc = document.createElement("p");

const body = document.querySelector("body");
const reset = document.querySelector("#reset")
const results = document.querySelector("#results");
const score = document.querySelector("#score");
score.appendChild(huSc);
score.appendChild(coSc);

let scoreChange = new CustomEvent('scoreChange', {bubbles: true});

function getRandomInt()
{
    return Math.floor(Math.random() * 3);
}

function getComputerChoice()
{
    let rnd = getRandomInt();
    return rnd == 0 ? "rock" : rnd == 1 ? "paper" : "scissors"
}

function testGetComputerChoice()
{
    console.log(getComputerChoice());
}

function getHumanChoice()
{
    let choice;
    while(true){
        choice = prompt("Choose rock, paper or scissors!");
        choice = choice.toLocaleLowerCase();
        if(choice == "rock" || choice == "paper" || choice == "scissors")
        {
            break;
        }
    }

    return choice;
}

function testGetHumanChoice()
{
    console.log(getHumanChoice());
}



function getWinner(humanChoice, computerChoice)
{
    if(humanChoice == computerChoice)
        return 0;
    if((humanChoice == "rock" && computerChoice == "scissors") 
        || (humanChoice == "paper" && computerChoice == "rock") 
        || (humanChoice == "scissors" && computerChoice == "paper"))
        return 1;
    else
        return 2;
}

function playRound(humanChoice, computerChoice)
{
    switch(getWinner(humanChoice, computerChoice))
    {
        case 0: results.textContent = "You used the same strategy. Nobody gets a point!"; break;

        case 1: results.textContent = "You win! " + humanChoice + " beats " + computerChoice + "."; humanScore++; break;

        case 2: results.textContent = "You lose! " + computerChoice + " beats " + humanChoice + "."; computerScore++; break;
    }

    
    results.dispatchEvent(scoreChange);
}

function showResults(){
    if(humanScore > computerScore)
        results.textContent = "You won!!!";
    else if (humanScore < computerScore)
        results.textContent = "You lost! womp womp";
    else
        results.textContent = "Everyone loses (as always)"; 
}

const btn_container = document.querySelector("#btn_container");

btn_container.addEventListener("click", function (e) 
{
    const target = e.target;
    let choice = '';

    switch(target.id)
    {
        case 'rock': choice = "rock"; break;
        case 'paper': choice = "paper"; break;
        case 'scissors' : choice = "scissors"; break;

        case 'reset' : return;
    }

    playRound(choice, getComputerChoice());
});

body.addEventListener("scoreChange", function () 
{
    huSc.textContent = "Human Score: " + humanScore;
    coSc.textContent = "Computer Score: " + computerScore;

    if(humanScore === 5 || computerScore === 5)
        showResults();
});

reset.addEventListener('click', function ()
{
    humanScore = 0;
    computerScore = 0;

    results.textContent = '';
    reset.dispatchEvent(scoreChange, { bubbles: true, cancelable: false});
})