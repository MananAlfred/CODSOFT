  //Default Operator ||
      // if score is null(falsy value)
      /*if(!score){
        score ={
          wins: 0,
          losses: 0,
          ties: 0
        };
      }
                          OR
      */

  const score = JSON.parse(localStorage.getItem
  ('score')) || {
      wins: 0,
      losses: 0,
      ties: 0
  };

  updateScoreElement();

  let isAutoPlay = false;
  let intervalID;
  function autoPlay(){
    if(!isAutoPlay){
      document.querySelector('.js-autoplay-button').innerHTML = 'Stop';
      intervalID = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      },1500);
      isAutoPlay = true;
    }
    else{
      clearInterval(intervalID);
      isAutoPlay = false;
      document.querySelector('.js-autoplay-button').innerHTML = 'AutoPlay';
    }
  }
  
  let computerMove ='';
  let result = '';
  function pickComputerMove() {
    const randomNumber = Math.random();
  
    if (randomNumber >= 0 && randomNumber < (1 / 3)) {
      return 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < (2 / 3)) {
      return 'paper';
    } else {
      return 'scissor';
    }
  }
  

  document.querySelector('.js-rock-button')
  .addEventListener('click',() => {
    playGame('rock');
  });
  
  document.querySelector('.js-paper-button')
  .addEventListener('click',() => {
    playGame('paper');
  });
  
  document.querySelector('.js-scissor-button')
  .addEventListener('click',() => {
    playGame('scissor');
  });
  
  document.querySelector('.js-reset')
  .addEventListener('click',() => {
    playGame('reset');
    if(isAutoPlay){
      clearInterval(intervalID);
      isAutoPlay = false;
      document.querySelector('.js-autoplay-button').innerHTML = 'AutoPlay';
    }
  });
  
  document.querySelector('.js-autoplay-button')
  .addEventListener('click',() => {
    autoPlay();
  });

  document.body.addEventListener('keydown', (event) =>{
    if(event.key === 'r'){
      playGame('rock');
    }
    else if(event.key === 'p'){
      playGame('paper');
    }
    else if(event.key === 's'){
      playGame('scissor');
    }
  });

  function playGame(userMove){
    
    //Computer chooses A move!
    computerMove =  pickComputerMove();
    
    // Determine the Winner!
    if(userMove === 'reset'){
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      result = '';
      document.querySelector('.js-result').innerHTML = '';
      document.querySelector('.js-moves').innerHTML = '';
    }
    else if(userMove === computerMove){
      result = 'Tie!';
    }

    else if((userMove === 'rock' && computerMove === 'paper') ||
            (userMove === 'paper' && computerMove === 'scissor') ||
            (userMove === 'scissor' && computerMove === 'rock')){
      
      result = 'You lose!';
    }
    else{
      result = 'You win!';
    }

    if(result === 'You win!'){
      score.wins += 1;
    }
    
    else if(result === 'You lose!'){
      score.losses += 1;
    }
    
    else if(result === 'Tie!'){
      score.ties += 1;
    }


    // Takes string args only
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreElement();
    
    if(userMove !== 'reset'){
      document.querySelector('.js-result').innerHTML = result;
      document.querySelector('.js-moves').innerHTML = `You <img src="IMAGES/${userMove}-emoji.png" alt="Your MOVE" class="move-icon">
      <img src="IMAGES/${computerMove}-emoji.png" alt="Computer MOVE" class="move-icon">
      Computer`;  
    }

  }

  function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}    Losses: ${score.losses}    Ties: ${score.ties}`;
  }
