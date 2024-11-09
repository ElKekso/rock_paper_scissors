let humanScore = 0;
const huSc = document.createElement("p");
let computerScore = 0;
const coSc = document.createElement("p");

const results = document.querySelector("#results");
const score = document.querySelector("#score");
score.appendChild(huSc);
score.appendChild(coSc);


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

    let scoreChange = new CustomEvent('scoreChange');
    dispatchEvent(scoreChange);
}

function showResults(){
    if(humanScore > computerScore)
        results.textContent = "You won!!!";
    else if (humanScore < computerScore)
        results.textContent = "You lost! womp womp";
    else
        results.textContent = "Everyone loses (as always)"; 
}

const btn_container = querySelector("#btn_container");

btn_container.addEventListener("click", function (e) 
{
    const target = e.target;
    const choice = '';

    switch(target.id)
    {
        case 'rock': choice = "rock"; break;
        case 'paper': choice = "paper"; break;
        case 'scissors' : choice = "scissors"; break;
    }

    playRound(choice, getComputerChoice());
});

document.addEventListener("scoreChange", function () 
{
    huSc.textContent("Human Score: " + humanScore);
    coSc.textContent("Computer Score: " + computerScore);

    if(humanScore === 5 || computerScore === 5)
        showResults();
});
