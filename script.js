

const gameBoard = ( ()=> {

    const board = ["", "", "", "", "", "","", "", ""]; 

    

    const getIndex = (num) => board[num]; 

    function setIndex(num, Player){
        
        board[num] = Player.marker; 
    }

    const getBoard = () =>  console.log(board);

    const reset = () => board = ["", "", "", "", "", "","", "", ""]; 


    const won_combos = [
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 1, 2], [3, 4, 5], [6, 7 , 8], 
        [0, 4, 8], [2, 4, 6]
    ]; 

    function Winner(){
     for(let combo of won_combos){
        if (
			board[combo[0]] == board[combo[1]] &&
			board[combo[1]] == board[combo[2]] &&
			board[combo[0]] != ""
            
		) 
            
        {
           
			return true;
		}
	}
	
	return false;
}

    function Draw(){
        for(let i =0; i < 9; i++){
            if(board[i] === ""){
                return false;
            }
          
                
            
        }
        return true;
    }
     
    

    return {
        getIndex,
        setIndex,
        reset,
        Winner,
        Draw,
        getBoard

    };

    
    
  })();


  function Player(name, marker, turn){
    
    return {name:name, marker:marker, turn: turn}
  }


  const controlFlow = (function (){
    let gameState = document.querySelector('.game-state')
    function currentTurn(){
        if(player1.turn){
            gameState.textContent = ` Player ${player2.marker}'s turn`;
            return player1;
        }
        else{
            gameState.textContent = ` Player ${player1.marker}'s turn`;
            return player2;
        }
    }

    function switchTurn(){
        player1.turn = !player1.turn;
        player2.turn = !player2.turn;
    }

    function placeMarker(index){
        if(!gameBoard.Winner()){
            currentPlayer = currentTurn();
            
            
            if(gameBoard.getIndex(index) === "" && currentPlayer.turn){
                gameBoard.setIndex(index, currentPlayer);
            }
                let winner = gameBoard.Winner(); 
                let draw = gameBoard.Draw();  
                if(winner){
                    gameState.textContent = `Player with ${currentPlayer.marker} marker won!`;
                    
                }
                else if(draw){
                    gameState.textContent = "It's a Draw! ";
                }
                else{
                    controlFlow.switchTurn(); 
                }
        }

            
        
        
    }

    return{
        currentTurn,
        switchTurn,
        placeMarker
    };
    

  })();

const player1 = Player("Player 1", "X", true);
const player2 = Player("Player 2", "O", false);



const domLogic = ( ()=> {
    const container = document.querySelector('.container');
    const squares = document.querySelectorAll('.square');
    const resetButton = document.querySelector('.reset');

    const refreshPage = () => {
        location.reload();
      }
      
      resetButton.addEventListener('click', refreshPage)

    squares.forEach((square, index) => {
        if (!gameBoard.Winner()) {
            square.addEventListener('click', () => {
                controlFlow.placeMarker(index);
                boardRender();
            });
        }
    });
    
    function boardRender(){
        

        for(let i =0; i < 9; i++){
            squares[i].textContent =gameBoard.getIndex(i);
            squares[i].dataset.id = `${i}`;
        }


     }

    

    return {
       boardRender,
       refreshPage
       

    };

    
    
  })();

