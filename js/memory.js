// holds game tiles
let tile = document.getElementsByClassName("tile");
let tiles = [...tile]

// declares deck element
const deck = document.getElementById("tile-deck");

// declares starting attempts and counter
let attempts = 0;
let counter = document.querySelector(".attempts");

// declares stars variable
const stars = document.querySelectorAll(".fa-star");

// declares tile as matched
let matchedTile = document.getElementsByClassName("match");

// declares close icon in modal
let closeicon = document.querySelector(".close");

// declares modal element
let modal = document.getElementById("youWin")

// declares array for opened tiles
var openedTiles = [];


// function shuffles tiles and returns shuffled array (from http://stackoverflow.com/a/2450976)
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

// shuffles tiles when page is refreshed or loads
document.body.onload = startGame();


// function to start a new game
function startGame(){
    // shuffles tiles
    tiles = shuffle(tiles);
    // clears exisiting classes from all tiles
    for (var i = 0; i < tiles.length; i++){
        deck.innerHTML = "";
        [].forEach.call(tiles, function(item) {
            deck.appendChild(item);
        });
        tiles[i].classList.remove("show", "open", "match", "disabled");
    }
    // resets attempts
    attempts = 0;
    counter.innerHTML = attempts;
    // resets star rating
    for (var i=0; i<stars.length; i++){
        stars[i].style.color = "#FF0080";
        stars[i].style.visibility = "visible";
    }
    //resets timer
    seconds = 0;
    minutes = 0;
    hours = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// toggles open, show and disable classes to displayTiles
var displayTile = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// function adds opened tiles to the OpenedTiles list and checks if tiles are matched or not
function tileOpen() {
    openedTiles.push(this);
    var len = openedTiles.length;
    if(len === 2){
        attemptCounter();
        if(openedTiles[0].type === openedTiles[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// defines when tiles match
function matched(){
    openedTiles[0].classList.add("match", "disabled");
    openedTiles[1].classList.add("match", "disabled");
    openedTiles[0].classList.remove("show", "open",);
    openedTiles[1].classList.remove("show", "open", );
    openedTiles = [];
}


// defines when tiles don't match
function unmatched(){
    openedTiles[0].classList.add("unmatched");
    openedTiles[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedTiles[0].classList.remove("show", "open","unmatched");
        openedTiles[1].classList.remove("show", "open","unmatched");
        enable();
        openedTiles = [];
    },1100);
}


// temporarily disables tiles
function disable(){
    Array.prototype.filter.call(tiles, function(tile){
        tile.classList.add('disabled');
    });
}


// enables tiles and disables matched tiles
function enable(){
    Array.prototype.filter.call(tiles, function(tile){
        tile.classList.remove('disabled');
        for(var i = 0; i < matchedTile.length; i++){
            matchedTile[i].classList.add("disabled");
        }
    });
}


// counts number of attempts
function attemptCounter(){
    attempts++;
    counter.innerHTML = attempts;
    //starts timer on first click
    if(attempts == 1){
        seconds = 0;
        minutes = 0;
        hours = 0;
        startTimer();
    }
    // sets star rating based on number attempts
    if (attempts > 8 && attempts < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (attempts > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// creates and runs timer
var seconds = 0, minutes = 0; hours = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minutes + " mins " +seconds+ " secs";
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds=0;
        }
        if(minutes == 60){
            hours++;
            minutes = 0;
        }
    },1000);
}

// shows congratulation modal, with attempts, time and star rating when all tiles match
function congratulations(){
    if (matchedTile.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //show attempts, star rating, and time it took to match all tiles
        document.getElementById("finalAttempt").innerHTML = attempts;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}

// closes congratulations modal and restarts game
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// restart game from button on congratulation modal
function playAgain(){
    modal.classList.remove("show");
    startGame();
}


// adds listeners to each tile
for (var i = 0; i < tiles.length; i++){
    tile = tiles[i];
    tile.addEventListener("click", displayTile);
    tile.addEventListener("click", tileOpen);
    tile.addEventListener("click",congratulations);
};