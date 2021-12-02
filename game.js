var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameState = false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function() {$("." + currentColour).removeClass("pressed");}, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("succes");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {$("body").removeClass("game-over")}, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        gameState = false;
        level = 0;
        gamePattern = [];
        userClickedPattern = [];

    }
}

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    console.log(userClickedPattern);
    console.log(gamePattern);

    checkAnswer(userClickedPattern.length - 1);

});

$(document).keydown(function(event) {
    if (gameState === false) {
        nextSequence();
        gameState = true;
    }
});