// Rory Dwyer
// Lab: #1 snake Lab
// Date: 2017/04/25

class Game {                            // Creates the Game object
    constructor(gameInt, msgInt) {
        this.gameOver = false;
        this.running = false;
        this.score = 0;
        this.interval = 150;        //Interval of speed of the game
        this.msg = false;           //Message that pops up at beggining of game
        this.gameInt = gameInt;     //Var to keep the game loop and clear when game over
        this.msgInt = msgInt;       //Var to keep the message loop and clear when game starts
    }


    run() {                         //Builds Game for first time at load

        window.addEventListener('keypress', (event) => {            //If player presses space and game starts, set message to ''
            if (event.charCode === 32 && !this.gameOver) {
                this.running = true;
                document.getElementById('msg').innerHTML = '';
            }
        });

        if (!this.gameOver && !this.running) {                      //If game is at start, not running and not game over then display message loop
            this.msgInt = setInterval(() => {
                if (!this.running && !this.msg) {
                    document.getElementById('msg').innerHTML = 'Press Space to insert coin';
                    this.msg = true;
                } else if (!this.running && this.msg) {
                    document.getElementById('msg').innerHTML = '';
                    this.msg = false;
                }
            }, 1000);
        }

        this.gameInt = setInterval(() => {                          // If run = true and not game over then start loop, when game over = true then display msg and clear loop
            if (this.running && !this.gameOver) {
                update();
            } else if (this.gameOver) {
                document.getElementById('msg').innerHTML = 'GAME OVER';
                clearInterval(this.gameInt);
            }
        }, this.interval);





    }

    move(){
        if (this.running && !this.gameOver) {
            this.gameInt = setTimeout(this.move.bind(this), this.interval);
            update();
        } else if (this.gameOver) {
            document.getElementById('msg').innerHTML = 'GAME OVER';
            clearTimeout(this.gameInt);
        }
    }

    reset() {                                                       //Resets the game when player hits restart button

        if (this.gameOver) {
            for (let i = 0, len = snake.tailX.length; i < len; i++) {
                set(snake.tailX[i], snake.tailY[i], 'blank');       //Reset snake tail from prev game to 'blank'
            }

            if (snake.snakeX === 0 || snake.snakeX === map.width - 1 || snake.snakeY === 0 || snake.snakeY === map.height - 1) {
                set(snake.snakeX, snake.snakeY, 'wall');            //If snake hit wall, reset snake head from prev game to 'wall'
            } else {
                set(snake.snakeX, snake.snakeY, 'blank');           //If sanke hit tail, reset snake head from prev game to 'blank'
            }
            set(fruit.fruitX, fruit.fruitY, 'blank');               //Clear prev fruit from map
            clearInterval(this.msgInt);                             //Clear the msg loop to start fresh again
            snake = new Snake();                                    //Create new snake
            snake.createSnake();                                    //Render snake
            fruit.createFruit();                                    //Render new fruit
            this.gameOver = false;
            this.running = false;
            this.score = 0;
            this.run();                                             //Start the run and game loop again
        }
    }
}


class Map {
    constructor() {
        this.height = 20;
        this.width = 28;
    }

    createMap() {                                                   //Builds a table based on width and height and sets x and y ids, and classnames for reference

        let table = document.createElement('table');
        table.id = 'game-table';
        for (let y = 0; y < this.height; y++) {
            let tr = document.createElement('tr');
            table.appendChild(tr);
            for (let x = 0; x < this.width; x++) {
                if (x === 0 || x == this.width - 1 || y === 0 || y == this.height - 1) {
                    let td = document.createElement('td');
                    td.className = `wall`;
                    td.id = `${x}-${y}`
                    tr.appendChild(td);
                } else {
                    let td = document.createElement('td');
                    td.className = 'blank';
                    td.id = `${x}-${y}`
                    tr.appendChild(td);
                }
            }
        }
        document.body.appendChild(table);
    }
}


class Snake {
    constructor() {
        this.snakeX = 2;        //Starting point on X
        this.snakeY = 2;        //Starting point on Y
        this.increment = 4;     //How many the snake grows by
        this.tailX = [];        //Set the snake tail to empty array for X
        this.tailY = [];        //Set the snake tail to empty array for Y
        this.length = 0;        //Set starting length
        this.direction = -1;    //up = 0, down = -1, left = 1, right = 2
    }

    createSnake() {
        set(this.snakeX, this.snakeY, 'snake');                     //Sets table cell to 'snake', see below for set()
    }

    updateTail() {                                                  //Array shift for when the snake is moving
        for (let i = this.length; i > 0; i--) {
            this.tailX[i] = this.tailX[i - 1];
            this.tailY[i] = this.tailY[i - 1];
        }
        this.tailX[0] = this.snakeX;                                //Set front part of snake to the head
        this.tailY[0] = this.snakeY;
    }

    setGrowth(val) {                                                //Upates the increment if user changes the setting in menu
        this.increment = val;
    }
}


class Fruit {
    constructor(fruitX, fruitY) {
        this.found = false;         //If snake hasnt eaten fruit, found = false
        this.fruitX = fruitX;       //Build X var
        this.fruitY = fruitY;       //Build Y var
    }

    createFruit() {                                                 //Sets random coordinates in map and set id to 'fruit' and found to false
        this.fruitX = this.rand(1, map.width - 1);
        this.fruitY = this.rand(1, map.height - 1);
        set(this.fruitX, this.fruitY, 'fruit');
        this.found = false;
    }

    rand(min, max) {                                                //Method to get random coordinates in map
        return Math.floor(Math.random() * (max - min) + min);
    }
}


function init() {        //Initializes the game for the first time
    map = new Map();
    snake = new Snake();
    fruit = new Fruit();
    map.createMap();
    snake.createSnake();
    fruit.createFruit();
}


//////////////////////////////////////////////////////////
//                  GameLoop
//////////////////////////////////////////////////////////


function update() {
    window.addEventListener("keydown", (function(canMove) {         //Delays the time when you can press a key so you can't press too many
        return function(event) {                                    //at the same time and run into yourself
            if (!canMove) return false;
            canMove = false;
            setTimeout(function() {
                canMove = true;
            }, game.interval);  //Delay is set to the game interval

            let key = event.keyCode;

                                //Change direction based on keys. wasd, WASD and arrow keys included
            if (snake.direction !== -1 && (key === 119 || key === 87 || key === 38)) { //If W is pressed
                snake.direction = 0;
            } else if (snake.direction !== 0 && (key === 115 || key === 83 || key === 40)) { //If S is pressed
                snake.direction = -1;
            } else if (snake.direction !== 2 && (key === 97 || key === 65 || key === 37)) { //If A is pressed
                snake.direction = 1;
            } else if (snake.direction !== 1 && (key === 100 || key === 68 || key === 39)) { //If D is pressed
                snake.direction = 2;
            }
        };
    })(true), false);

    set(fruit.fruitX, fruit.fruitY, 'fruit');                      //Sets the fruit cell to 'fruit'
    snake.updateTail();                                            //Update the tail
    set(snake.tailX[snake.length], snake.tailY[snake.length], 'blank');     //Change last tail to 'blank'

                                //Change the snake head X and Y depending on the direction set
    if (snake.direction === 0) {
        snake.snakeY--;
    } else if (snake.direction === -1) {
        snake.snakeY++;
    } else if (snake.direction === 1) {
        snake.snakeX--;
    } else if (snake.direction === 2) {
        snake.snakeX++;
    }

    set(snake.snakeX, snake.snakeY, 'snake');                       //Set snake head to current coordinates

    for (let i = 1, len = snake.tailX.length; i < len; i++) {
        if (snake.snakeX === snake.tailX[i] && snake.snakeY === snake.tailY[i]) {       //If snake head touches snake tail, game over
            game.gameOver = true;
            break;
        }
    }

    if (snake.snakeX === 0 || snake.snakeX === map.width - 1 || snake.snakeY === 0 || snake.snakeY === map.height - 1) {        //If snake hits wall, game over
        game.gameOver = true;
    } else if (snake.snakeX == fruit.fruitX && snake.snakeY == fruit.fruitY) {      //If snake eats fruit, increment snake, create new fruit and increase score
        game.score ++;
        fruit.found = true;
        fruit.createFruit();
        snake.length += snake.increment;
    }
    document.getElementById('score').innerHTML = 'Score: ' + game.score;            //Update Score
}


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


function get(x, y) {                                                //Get the id of the cell with the given coordinates
    return document.getElementById(x + '-' + y);
}

function set(x, y, value) {                                         //Set the id of the cell with the given coordinates to a specified name
    if (x != null && y != null) {
        get(x, y).setAttribute('class', value);
    }
}

function getType(x, y) {                                            //Get the class of the cell with the given coordinates
    return get(x, y).getAttribute('class');
}


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////


let game = new Game();      //Build new game at load
init();                     //Initializes game
game.run();                 //Start game loop




////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
             // Babel Compiled
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
//
// 'use strict';
//
// var map,
//     snake,
//     fruit;
//
// var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
//
// function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
//
// var Game = function () {
//     function Game(gameInt, msgInt) {
//         _classCallCheck(this, Game);
//
//         this.gameOver = false;
//         this.running = false;
//         this.score = 0;
//         this.interval = 150;
//         this.msg = false;
//         this.gameInt = gameInt;
//         this.msgInt = msgInt;
//     }
//
//     _createClass(Game, [{
//         key: 'run',
//         value: function run() {
//             var _this = this;
//
//             window.addEventListener('keypress', function (event) {
//                 if (event.charCode === 32 && !_this.gameOver) {
//                     _this.running = true;
//                     document.getElementById('msg').innerHTML = '';
//                 }
//             });
//
//             if (!this.gameOver && !this.running) {
//                 this.msgInt = setInterval(function () {
//                     if (!_this.running && !_this.msg) {
//                         document.getElementById('msg').innerHTML = 'Press Space to insert coin';
//                         _this.msg = true;
//                     } else if (!_this.running && _this.msg) {
//                         document.getElementById('msg').innerHTML = '';
//                         _this.msg = false;
//                     }
//                 }, 1000);
//             }
//
//             this.gameInt = setInterval(function () {
//                 if (_this.running && !_this.gameOver) {
//                     update();
//                 } else if (_this.gameOver) {
//                     document.getElementById('msg').innerHTML = 'GAME OVER';
//                     clearInterval(_this.gameInt);
//                     console.log('still running');
//                 }
//             }, this.interval);
//         }
//     }, {
//         key: 'reset',
//         value: function reset() {
//
//             if (this.gameOver) {
//                 for (var i = 0, len = snake.tailX.length; i < len; i++) {
//                     set(snake.tailX[i], snake.tailY[i], 'blank');
//                 }
//
//                 if (snake.snakeX === 0 || snake.snakeX === map.width - 1 || snake.snakeY === 0 || snake.snakeY === map.height - 1) {
//                     set(snake.snakeX, snake.snakeY, 'wall');
//                 } else {
//                     set(snake.snakeX, snake.snakeY, 'blank');
//                 }
//                 set(fruit.fruitX, fruit.fruitY, 'blank');
//                 clearInterval(this.msgInt);
//                 snake = new Snake();
//                 snake.createSnake();
//                 fruit.createFruit();
//                 this.gameOver = false;
//                 this.running = false;
//                 this.score = 0;
//                 this.run();
//             }
//         }
//     }]);
//
//     return Game;
// }();
//
// var Map = function () {
//     function Map(tableElm) {
//         _classCallCheck(this, Map);
//
//         this.height = 20;
//         this.width = 28;
//         this.tableElm = tableElm;
//     }
//
//     _createClass(Map, [{
//         key: 'createMap',
//         value: function createMap() {
//             var table = document.createElement('table');
//             table.id = 'game-table';
//             for (var y = 0; y < this.height; y++) {
//                 var tr = document.createElement('tr');
//                 table.appendChild(tr);
//                 for (var x = 0; x < this.width; x++) {
//                     if (x === 0 || x == this.width - 1 || y === 0 || y == this.height - 1) {
//                         var td = document.createElement('td');
//                         td.className = 'wall';
//                         td.id = x + '-' + y;
//                         tr.appendChild(td);
//                     } else {
//                         var _td = document.createElement('td');
//                         _td.className = 'blank';
//                         _td.id = x + '-' + y;
//                         tr.appendChild(_td);
//                     }
//                 }
//             }
//             console.log(table);
//             document.body.appendChild(table);
//         }
//     }]);
//
//     return Map;
// }();
//
// var Snake = function () {
//     function Snake() {
//         _classCallCheck(this, Snake);
//
//         this.snakeX = 2;
//         this.snakeY = 2;
//         this.increment = 4;
//         this.tailX = [];
//         this.tailY = [];
//         this.length = 0;
//         this.direction = -1; //up = 0, down = -1, left = 1, right = 2
//     }
//
//     _createClass(Snake, [{
//         key: 'createSnake',
//         value: function createSnake() {
//             set(this.snakeX, this.snakeY, 'snake');
//         }
//     }, {
//         key: 'updateTail',
//         value: function updateTail() {
//             for (var i = this.length; i > 0; i--) {
//                 this.tailX[i] = this.tailX[i - 1];
//                 this.tailY[i] = this.tailY[i - 1];
//             }
//             this.tailX[0] = this.snakeX;
//             this.tailY[0] = this.snakeY;
//         }
//     }, {
//         key: 'setGrowth',
//         value: function setGrowth(val) {
//             this.increment = val;
//         }
//     }]);
//
//     return Snake;
// }();
//
// var Fruit = function () {
//     function Fruit(fruitX, fruitY) {
//         _classCallCheck(this, Fruit);
//
//         this.found = false;
//         this.fruitX = fruitX;
//         this.fruitY = fruitY;
//     }
//
//     _createClass(Fruit, [{
//         key: 'newFruit',
//         value: function newFruit() {
//             if (this.found) {
//                 this.fruitX = this.rand(1, map.width - 1);
//                 this.fruitY = this.rand(1, map.height - 1);
//                 set(this.fruitX, this.fruitY, 'fruit');
//                 this.found = false;
//             }
//         }
//     }, {
//         key: 'createFruit',
//         value: function createFruit() {
//             console.log('here');
//             this.fruitX = this.rand(1, map.width - 1);
//             this.fruitY = this.rand(1, map.height - 1);
//             set(this.fruitX, this.fruitY, 'fruit');
//             this.found = false;
//         }
//     }, {
//         key: 'rand',
//         value: function rand(min, max) {
//             return Math.floor(Math.random() * (max - min) + min);
//         }
//     }]);
//
//     return Fruit;
// }();
//
// function init() {
//     map = new Map();
//     snake = new Snake();
//     fruit = new Fruit();
//     map.createMap();
//     snake.createSnake();
//     fruit.createFruit();
// }
//
// //////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////
//
//
// function update() {
//     window.addEventListener("keydown", function (canMove) {
//         return function (event) {
//             if (!canMove) return false;
//             canMove = false;
//             setTimeout(function () {
//                 canMove = true;
//             }, game.interval);
//
//             var key = event.keyCode;
//             console.log(key);
//             if (snake.direction != -1 && (key === 119 || key === 87 || key === 38)) {
//                 //If W is pressed
//                 snake.direction = 0;
//             } else if (snake.direction != 0 && (key === 115 || key === 83 || key === 40)) {
//                 //If S is pressed
//                 snake.direction = -1;
//             } else if (snake.direction != 2 && (key === 97 || key === 65 || key === 37)) {
//                 //If A is pressed
//                 snake.direction = 1;
//             } else if (snake.direction != 1 && (key === 100 || key === 68 || key === 39)) {
//                 //If D is pressed
//                 snake.direction = 2;
//             }
//         };
//     }(true), false);
//
//     set(fruit.fruitX, fruit.fruitY, 'fruit');
//     snake.updateTail();
//     set(snake.tailX[snake.length], snake.tailY[snake.length], 'blank');
//
//     if (snake.direction === 0) {
//         snake.snakeY--;
//     } else if (snake.direction == -1) {
//         snake.snakeY++;
//     } else if (snake.direction == 1) {
//         snake.snakeX--;
//     } else if (snake.direction == 2) {
//         snake.snakeX++;
//     }
//
//     set(snake.snakeX, snake.snakeY, 'snake');
//
//     for (var i = 1, len = snake.tailX.length; i < len; i++) {
//         if (snake.snakeX === snake.tailX[i] && snake.snakeY === snake.tailY[i]) {
//             game.gameOver = true;
//             break;
//         }
//     }
//
//     if (snake.snakeX === 0 || snake.snakeX === map.width - 1 || snake.snakeY === 0 || snake.snakeY === map.height - 1) {
//         game.gameOver = true;
//     } else if (snake.snakeX == fruit.fruitX && snake.snakeY == fruit.fruitY) {
//         game.score += snake.increment;
//         fruit.found = true;
//         fruit.newFruit();
//         snake.length += snake.increment;
//     }
//     document.getElementById('score').innerHTML = 'Score: ' + game.score;
// }
//
// //////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////
//
//
// function get(x, y) {
//     return document.getElementById(x + '-' + y);
// }
//
// function set(x, y, value) {
//     if (x != null && y != null) {
//         get(x, y).setAttribute('class', value);
//     }
// }
//
// function getType(x, y) {
//     return get(x, y).getAttribute('class');
// }
//
// //////////////////////////////////////////////////////////
// //////////////////////////////////////////////////////////
//
//
// var game = new Game();
// init();
// game.run();
