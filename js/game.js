var canvas = document.getElementById ("myCanvas");
var context = canvas.getContext ("2d");
var cloudNumber = 0;
var xC = -220;
var noteWidth = 80;
var songPosition = canvas.width + 150;
var xNotePosition = songPosition;
var leadNotePosition = songPosition;
var playedNotes = 0;
var noteSpeed = 4;
var score = 0;
var $score = null;
var highScore = 0;
var $highScore = null;
var gameTimer = undefined;
var gameOn = false;
var currentSong = 0;
var slow = 40;
var fast = 20;
var shredding = 10;
var godSpeed = 5;
var gameSpeed = fast;
var autoCorrect = false;
var autoPlay = false;

function toggleAutoPlay() {
	autoPlay = !autoPlay;
	let label = autoPlay ? 'On' : 'Off';
	$('#autoplay').text(label);
}

function toggleSpeed() {
	let label;
	switch (gameSpeed) {
		case slow:      gameSpeed = fast;      label = 'Fast';      break;
		case fast:      gameSpeed = shredding; label = 'Shredding'; break;
		case shredding: gameSpeed = godSpeed;  label = 'GodSpeed';  break;
		case godSpeed:  gameSpeed = slow;      label = 'Slow';      break;
	}
	$('#speed').text(label);

	if (gameTimer) {
    clearInterval(gameTimer);
  }
	gameTimer = setInterval(draw, gameSpeed);
}

function startGame() {
	gameOn = true;
  $score.innerHTML = score;
  $(".intro").fadeOut(200);
  gameTimer = setInterval(draw, gameSpeed);
}

function endGame() {
	clearInterval(gameTimer);
	gameOn = false;
	songPosition = canvas.width + 150
	xNotePosition = songPosition;
	leadNotePosition = songPosition;
	playedNotes = 0;

	if (autoPlay) {
		setTimeout(startGame, 500);
	}
};

// displays score of zero when page loads
$(document).ready( function() {
	$score = document.getElementById("score-p");
	$score.innerHTML = score;
	$highScore = document.getElementById("high-score-p");
	$highScore.innerHTML = highScore;
});
