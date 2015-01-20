function multidArr(len){
  outerArr = new Array(len);
  for(var i = 0; i < outerArr.length; i++){
    outerArr[i] = new Array(len);
  }
  return outerArr;
};

function Board(){
  this.grid = multidArr(3);
};

Board.prototype.print = function(){
  rows = multidArr(3)
  for( var i = 0; i < this.grid.length; i++){
    for( var j = 0; j < this.grid.length; j++){
      if(typeof this.grid[i][j] === "undefined"){
        rows[i][j] = "_";
      }else{
        rows[i][j] = this.grid[i][j];
      }
    }
  }
  console.log(rows[0] + "\n" + rows[1] + "\n" + rows[2]);
};

Board.prototype.full = function(){
  for(var i = 0; i < this.grid.length; i++){
    for( var j = 0; j < this.grid.length; j++){
      if(typeof this.grid[i][j] === "undefined"){
        return false;
      }
    }
  }
  return true;
};


Board.prototype.won = function(){
  // console.log(this.check(this.grid)+ "ROWS")
  // console.log(this.check(this.columns())+"COLS")
  // console.log(this.check(this.diagonals())+ "DIAG")
  if(this.check(this.grid) || this.check(this.columns()) || this.check(this.diagonals())){
    return true;
  } else{
    return false;
  }
};

//
Board.prototype.check = function(array){

  var filled = null;
  array.forEach(function(row, index){
    if(row.uniq().length === 1 && (row[0] === 'x' || row[0] === 'o')){
      filled =  true;
    } else if (index === array.length-1) {
      if(filled === null){
        filled = false;
      }
    }
  });
  return filled;
};

Board.prototype.columns = function columns(){
  var transposed = multidArr(3);
  for(var i=0;i<transposed.length;i++){
    for(var j=0; j < transposed.length; j++){
      transposed[i][j] = this.grid[j][i];
    }
  }
  return transposed;
};

Board.prototype.diagonals = function(){
  var diagonals = [[this.grid[0][0], this.grid[1][1], this.grid[2][2]],
                  [this.grid[0][2], this.grid[1][1], this.grid[2][0]]];
  return diagonals;
};

Board.prototype.empty = function(pos){
  if(this.grid[pos[0]][pos[1]] === "x" || this.grid[pos[0]][pos[1]] ==="o"){
    return false;
  } else{
    return true;
  }
};

Board.prototype.placeMark = function(pos, mark){
  if(this.empty(pos)){
    this.grid[pos[0]][pos[1]] = mark;
    return true;
  } else {
    console.log("Invalid move");
    return false;
  }
};

Array.prototype.uniq = function(){
  var hash = {}, uniqArr = [];
  for(var i =0; i < this.length; i++){
    if(!hash.hasOwnProperty(this[i])){
      hash[this[i]] = 1;
      uniqArr.push(this[i]);
    }
  }
  return uniqArr;
};




b = new Board();
b.grid = [["x","x","x"],
          ["x","x", "U"],
          ["x","U", "U"]]

b.won()


module.exports = Board;
