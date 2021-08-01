class GameBoard {

    constructor(){
        //make properties for the game
        this.gameBoard = [[], [],[], [],[], []];
        this.gameZone = document.querySelector(".gameZone");
        this.playerWon = "";
        this.row = 6;
        this.column = 7;
        this.playerRed = new Player("Red", "#d92555" , new Token("Red"));
        this.playerGreen = new Player("Green", "#25d99a", new Token("Green"));
        this.currentPlayer = this.playerRed;
    }

    //create a method to draw the board
    drawBoard(){
        //make a board by using nested loops
        //prints follow rows and collumns pattern
        for(let row = 0; row < this.row; row++){
            
            for (let col = 0; col < this.column; col++){
                let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            
                //set attributes for each circle
                circle.setAttribute("cx",(col + 0.6) * 140);
                circle.setAttribute("cy", (row + 0.8) * 120);
                circle.setAttribute("r", 50);
                circle.setAttribute("fill", "white");
        
                if(row == 0){
                    circle.classList.add(`Row${row}-Col${col}`,"empty");
                    
                }else{
                    circle.classList.add(`Row${row}-Col${col}`, "empty");
                }

                //add each circle to the gameBoard to keep track them
                this.gameBoard[row][col] = circle;


                circle.addEventListener("mouseover",() => {
                    //make the circle top move when the mouse move
                    let circleTop = document.getElementById("circleTop");
                    circleTop.setAttribute("cx", circle.getAttribute("cx"))

                    //change the color of circle top when player changed 
                    circleTop.setAttribute("fill", this.currentPlayer.color); 
                })

           
                circle.addEventListener("click",() => {
                    //call play method each time the player clicked to start tracking where they move
                    this.play(col);
                    //call this method to display current player to make move
                    this.displayCurrentPlayer();
                
                })


                //push it to the svg
                this.gameZone.appendChild(circle);

                //animate the board, each column will display follow the delay time
                gsap.from(`.Row${row}-Col${col}`, {delay: col * 0.5, alpha: 0, duration: 1})
                
            }
            
            this.gameZone.appendChild(document.createElement("BR"));
            
        }
    }


    //play method is used to mark where the player have made a move
    play(column){
        for (let row = 5; row >= 0; row--){
            if (this.gameBoard[row][column].classList.contains("empty")){
                if(this.currentPlayer == this.playerRed){
                    this.gameBoard[row][column].classList.remove("empty");
                    this.gameBoard[row][column].setAttribute("fill", "#d92555");
                    this.gameBoard[row][column].setAttribute("token", this.token(this.playerRed));                   
                    this.currentPlayer = this.playerGreen;              
                    gsap.from(`.Row${row}-Col${column}`, {y: "random(-120, 100)", alpha: 0, ease: "bounce.out", duration: 0.7})
                }else{
                    this.gameBoard[row][column].classList.remove("empty");
                    this.gameBoard[row][column].setAttribute("fill", "#25d99a");
                    this.gameBoard[row][column].setAttribute("token", this.token(this.playerGreen));
                    this.currentPlayer = this.playerRed;
                    gsap.from(`.Row${row}-Col${column}`, {y: "random(-50, 50)", alpha: 0, ease: "bounce.out", duration: 0.7})
                }
              
                this.checkHorizontally(row, column);  
                this.checkVertically(row, column);
                this.checkDiagonally(this.gameBoard, row, column);

                break;   

            }   
        }
    }


    //make a method to get token for player
    token(player){
        return player.token.getTokenName();
    }


    //display on the screen which player making move
    displayCurrentPlayer (){
        let div = document.querySelector(".player");
        
        if(this.playerWon != ""){
            div.innerHTML = `Winner Detected: <p>${this.playerWon}</p>` ;
        }else{
            div.innerHTML = `${this.currentPlayer.getName()}'s move` ;
        }
        
    }


    //check horizontally, the row is not changing, but the column is changing each time through loop/
    checkHorizontally(rowArg, columnArg){
        
        if(columnArg == 3){
             
            if(this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg - 1].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg - 2].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg - 3].getAttribute("token")){
                this.playerWon = `${this.gameBoard[rowArg][columnArg].getAttribute("token")} won`;
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg - 1);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg - 2);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg - 3);
           
                
            }else if (this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg + 1].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg + 2].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg + 3].getAttribute("token")){
                this.playerWon = `${this.gameBoard[rowArg][columnArg].getAttribute("token")} won`;
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg + 1);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg + 2);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg + 3);

            }else if (this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg + 1].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg + 2].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg - 1].getAttribute("token")){
                this.playerWon = `${this.gameBoard[rowArg][columnArg].getAttribute("token")} won`;
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg + 1);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg + 2);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg - 1);
            
            }else if (this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg - 1].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg - 2].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg + 1].getAttribute("token")){
                this.playerWon = `${this.gameBoard[rowArg][columnArg].getAttribute("token")} won`;
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg - 1);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg - 2);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg + 1);
            }
            
        
        }else if (columnArg < 3){

            if(this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg + 1].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg + 2].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg + 3].getAttribute("token")){
                this.playerWon = `${this.gameBoard[rowArg][columnArg].getAttribute("token")} won`;
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg + 1);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg + 2);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg + 3);
            }
        }else{
            if(this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg - 1].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg - 2].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg][columnArg - 3].getAttribute("token")){
                this.playerWon = `${this.gameBoard[rowArg][columnArg].getAttribute("token")} won`;
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg - 1);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg - 2);
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg - 3);
            }
        } 
        
    }

    //check win case vertically
    checkVertically(rowArg, columnArg){
        if(rowArg < 3) {

            if(this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg+1][columnArg].getAttribute("token")  && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg+2][columnArg].getAttribute("token") && this.gameBoard[rowArg][columnArg].getAttribute("token") == this.gameBoard[rowArg+3][columnArg].getAttribute("token")){
                this.playerWon = `${this.gameBoard[rowArg][columnArg].getAttribute("token")} won`;
                this.changeWinnerAppearance(this.gameBoard, rowArg, columnArg);
                this.changeWinnerAppearance(this.gameBoard, rowArg + 1, columnArg);
                this.changeWinnerAppearance(this.gameBoard, rowArg + 2, columnArg);
                this.changeWinnerAppearance(this.gameBoard, rowArg + 3, columnArg);
            }
        }
        
    }

    //check diagnally to see who win
    checkDiagonally(board, row, col){
        if(col ==3 && row <=2 ){
            
            if( board[row][col].getAttribute("token") == board[row+1][col+1].getAttribute("token") && board[row][col].getAttribute("token") == board[row+2][col+2].getAttribute("token") && board[row][col].getAttribute("token") == board[row+3][col+3].getAttribute("token")){
                this.playerWon = `${board[row][col].getAttribute("token")} won`;
                this.changeWinnerAppearance(board, row, col);
                this.changeWinnerAppearance(board, row + 1, col + 1);
                this.changeWinnerAppearance(board, row + 2, col + 2);
                this.changeWinnerAppearance(board, row + 3, col + 3);

            }else if(board[row][col].getAttribute("token") == board[row+1][col-1].getAttribute("token") && board[row][col].getAttribute("token") == board[row+2][col-2].getAttribute("token") && board[row][col].getAttribute("token") == board[row+3][col-3].getAttribute("token")){
                this.playerWon = `${board[row][col].getAttribute("token")} won`;
                this.changeWinnerAppearance(board, row, col);
                this.changeWinnerAppearance(board, row + 1, col - 1);
                this.changeWinnerAppearance(board, row + 2, col - 2);
                this.changeWinnerAppearance(board, row + 3, col - 3);
            }
            
        }else if(col < 3 && row <= 2){
            if( board[row][col].getAttribute("token") == board[row+1][col+1].getAttribute("token") && board[row][col].getAttribute("token") == board[row+2][col+2].getAttribute("token") && board[row][col].getAttribute("token") == board[row+3][col+3].getAttribute("token")){
                this.playerWon = `${board[row][col].getAttribute("token")} won`;
                this.changeWinnerAppearance(board, row, col);
                this.changeWinnerAppearance(board, row + 1, col + 1);
                this.changeWinnerAppearance(board, row + 2, col + 2);
                this.changeWinnerAppearance(board, row + 3, col + 3);

            }
        }else if(col> 3 && row <= 2){
            if(board[row][col].getAttribute("token") == board[row+1][col-1].getAttribute("token") && board[row][col].getAttribute("token") == board[row+2][col-2].getAttribute("token") && board[row][col].getAttribute("token") == board[row+3][col-3].getAttribute("token")){
                this.playerWon = `${board[row][col].getAttribute("token")} won`;
                this.changeWinnerAppearance(board, row, col);
                this.changeWinnerAppearance(board, row + 1, col - 1);
                this.changeWinnerAppearance(board, row + 2, col - 2);
                this.changeWinnerAppearance(board, row + 3, col - 3);
            }
        }else if((col ==3 && row > 2)){
            if( board[row][col].getAttribute("token") == board[row-1][col+1].getAttribute("token") && board[row][col].getAttribute("token") == board[row-2][col+2].getAttribute("token") && board[row][col].getAttribute("token") == board[row-3][col+3].getAttribute("token")){
                this.playerWon = `${board[row][col].getAttribute("token")} won`;
                this.changeWinnerAppearance(board, row, col);
                this.changeWinnerAppearance(board, row - 1, col + 1);
                this.changeWinnerAppearance(board, row - 2, col + 2);
                this.changeWinnerAppearance(board, row - 3, col + 3);

            }else {
                if( board[row][col].getAttribute("token") == board[row-1][col-1].getAttribute("token") && board[row][col].getAttribute("token") == board[row-2][col-2].getAttribute("token") && board[row][col].getAttribute("token") == board[row-3][col-3].getAttribute("token")){
                    this.playerWon = `${board[row][col].getAttribute("token")} won`;
                    this.changeWinnerAppearance(board, row, col);
                    this.changeWinnerAppearance(board, row - 1, col - 1);
                    this.changeWinnerAppearance(board, row - 2, col - 2);
                    this.changeWinnerAppearance(board, row - 3, col - 3);
    
                }
            }
        }else if(col > 3 && row > 2) {
            if( board[row][col].getAttribute("token") == board[row-1][col-1].getAttribute("token") && board[row][col].getAttribute("token") == board[row-2][col-2].getAttribute("token") && board[row][col].getAttribute("token") == board[row-3][col-3].getAttribute("token")){
                this.playerWon = `${board[row][col].getAttribute("token")} won`;
                this.changeWinnerAppearance(board, row, col);
                this.changeWinnerAppearance(board, row - 1, col - 1);
                this.changeWinnerAppearance(board, row - 2, col - 2);
                this.changeWinnerAppearance(board, row - 3, col - 3);

            }
        }else if(col < 3 && row > 2){
            if( board[row][col].getAttribute("token") == board[row-1][col+1].getAttribute("token") && board[row][col].getAttribute("token") == board[row-2][col+2].getAttribute("token") && board[row][col].getAttribute("token") == board[row-3][col+3].getAttribute("token")){
                this.playerWon = `${board[row][col].getAttribute("token")} won`;
                this.changeWinnerAppearance(board, row, col);
                this.changeWinnerAppearance(board, row - 1, col + 1);
                this.changeWinnerAppearance(board, row - 2, col + 2);
                this.changeWinnerAppearance(board, row - 3, col + 3);

            }
        }
    }


    //change style for the 4 circles that are connected.
    changeWinnerAppearance(board, row, col){
        board[row][col].setAttribute("stroke", "black");
        board[row][col].setAttribute("stroke-width", "5");
    }

   
    //reset method is used to reset the board when the replay button clicked 
    reset(){
        let circles = document.querySelectorAll("circle");
        let br = document.querySelectorAll("br");

        //first i remove all the existing elements

        for(let b = 0; b < br.length; b++){
            br[b].remove();    
        }

        for(let c = 1; c < circles.length; c++){            
            circles[c].remove();      
        }  

        //re-draw the board and display current player who will make a move
        this.drawBoard();
        this.displayCurrentPlayer();
    }
}



//make a class player
//Player class has player's name and player's token
//the token will be generate using the Token class
class Player {

    constructor(name, color, token){
        this.name = name;
        this.color = color;
        this.token = token;
    }

    getName(){
        return this.name;
    }

    setName(value){
        this.name = value;
    }

    
    
}


//make a Token class to generate a token for players
class Token {
    constructor(token){
        this.tokenName = token;

    }

    getTokenName(){
        return this.tokenName;
    } 
    
    setTokenName(value){
        this.tokenName = value;
    }
}

let game =  new GameBoard();
game.drawBoard();
