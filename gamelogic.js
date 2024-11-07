function getRandomInt()
{
    return Math.floor(Math.random() * 3);
}

function getRPC(num)
{
    return num == 0 ? "rock" : num == 1 ? "paper" : "scissor"
}

function getComputerChoice()
{
    let rnd = getRandomInt();
    return getRPC(num);
}

function testGetComputerChoice()
{
    console.log(getComputerChoice());
}

function getHumanChoice()
{
    let choice;
    while(true){
        choice = prompt("Choose rock (0), paper (1) or scissors (2)!");
        if(choice == 0 || choice == 1 || choice == 2)
        {
            break;
        }
    }

    return getRPC(choice);
}

function testGetHumanChoice()
{
    console.log(getHumanChoice());
}