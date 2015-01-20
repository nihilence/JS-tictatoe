var Board = require("./board");

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function Game(reader){
  this.reader = reader;
  this.board = new Board();
}

Game.prototype.promptMove = function(callback){
  this.board.print();
  reader.question("Which position would you like to mark? i.e 1,1 \n", function(position){
    position = position.split(",");
    position[0] = parseInt(position[0]);
    position[1] = parseInt(position[1]);
    callback(position);
  })
};

Game.prototype.run = function(mark, completionCallback){
  function gameOver(pos){
    if(!this.board.placeMark(pos, mark)){
      console.log("Not a valid move. Try again.");
    }else{
      if(mark === "x"){
        mark = "o";
      }else{
        mark = "x";
      }
    }
    if(this.board.won() || this.board.full() ){
      completionCallback();
    }else{
      this.run(mark, completionCallback);
    }
  }
  console.log(mark + " plays \n")
  this.promptMove(gameOver.bind(this));
};

g = new Game();

g.run('x',function(){
  g.board.print();
  if(g.board.won){
    console.log("You win!! yeyyyyy!!");
  }else{
    console.log("It's a tie.");
  }
  console.log("Game Over");
  reader.close();
});
