var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;
buttonColours = ["red", "blue", "green", "yellow"];
function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    level++;
    $("#level-title").text("Level " + level);
}

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

$(document).on("keydown", function() {
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".toStart").hide();
    }
})

$(".toStart").on("click", function() {
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        $(".toStart").hide();
    }
})

function checkAnswer(currenLevel) {
    console.log(currenLevel);
    console.log(userClickedPattern);
    console.log(gamePattern);
    if (userClickedPattern[currenLevel] == gamePattern[currenLevel]) {
        console.log("yes");
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("no");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $(".toStart").show();
}
