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
var highScore = 0;
var intervalId = undefined;
var gameOn = false;
var currentSong = 0;

var songs = [
	[
		["b1", 85, 227],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["d2", 79, 185],
		["x", null, null],
		["d2", 79, 185],
		["x", null, null],
		["x", null, null],
		["c2", 73, 206],
		["b1", 85, 227],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["a1", 89, 247],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["d2", 79, 185],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["a1", 89, 247],
		["g1", 84, 267],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["d2", 79, 185],
		["x", null, null],
		["d2", 79, 185],
		["x", null, null],
		["x", null, null],
		["c2", 73, 206],
		["b1", 85, 227],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["a1", 89, 247],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["d2", 79, 185],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["a1", 89, 247],
		["g1", 84, 267],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["d2", 79, 185],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["e2", 80, 163],
		["d2", 79, 185],
		["c2", 73, 206],
		["b1", 85, 227],
		["c2", 73, 206],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["d2", 79, 185],
		["c2", 73, 206],
		["b1", 85, 227],
		["a1", 89, 247],
		["b1", 85, 227],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["c2", 73, 206],
		["b1", 85, 227],
		["a1", 89, 247],
		["g1", 84, 267],
		["a1", 89, 247],
		["x", null, null],
		["x", null, null],
		["d1", 87, 328],
		["d1", 87, 328],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["g1", 84, 267],
		["x", null, null],
		["a1", 89, 247],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["c2", 73, 206],
		["x", null, null],
		["b1", 85, 227],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["a1", 89, 247],
		["x", null, null],
		["x", null, null],
		["g1", 84, 267],
		["g1", 84, 267]
	],
	[
		["e2", 80, 163],
		["x", null, null],
		["d#2", 48, 185],
		["c#2", 57, 206],
		["b1", 85, 227],
		["x", null, null],
		["x", null, null],
		["a1", 89, 247],
		["g#1", 54, 267],
		["x", null, null],
		["f#1", 82, 290],
		["x", null, null],
		["e1", 69, 310],
		["x", null, null],
		["x", null, null],
		["b1", 85, 227],
		["c#2", 57, 206],
		["x", null, null],
		["x", null, null],
		["c#2", 57, 206],
		["d#2", 48, 185],
		["x", null, null],
		["x", null, null],
		["d#2", 48, 185],
		["e2", 80, 163],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["x", null, null],
		["e2", 80, 163],
		["e2", 80, 163],
		["d#2", 48, 185],
		["c#2", 57, 206],
		["b1", 85, 227],
		["b1", 85, 227],
		["a1", 89, 247],
		["g#1", 54, 267],
		["e2", 80, 163],
		["e2", 80, 163],
		["d#2", 48, 185],
		["c#2", 57, 206],
		["b1", 85, 227],
		["b1", 85, 227],
		["a1", 89, 247],
		["g#1", 54, 267],
		["f#1", 82, 290],
		["g#1", 54, 267],
		["g#1", 54, 267],
		["g#1", 54, 267],
		["a1", 89, 247],
		["b1", 85, 227],
		["x", null, null],
		["x", null, null],
		["g#1", 54, 267],
		["f#1", 82, 290],
		["f#1", 82, 290],
		["f#1", 82, 290],
		["g#1", 54, 267],
		["a1", 89, 247],
		["x", null, null],
		["x", null, null],
		["g#1", 54, 267],
		["e1", 69, 310],
		["e2", 80, 163],
		["x", null, null],
		["c#2", 57, 206],
		["b1", 85, 227],
		["x", null, null],
		["g#1", 54, 267],
		["a1", 89, 247],
		["g#1", 54, 267],
		["x", null, null],
		["f#1", 82, 290],
		["x", null, null],
		["e1", 69, 310],
	],
	[
		["e2", 80, 163],
		["d#2", 48, 185],
		["e2", 80, 163],
		["d#2", 48, 185],
		["e2", 80, 163],
		["b1", 85, 227],
		["d2", 79, 185],
		["c2", 73, 206],
		["a1", 89, 247],
		["x", null, null],
		["x", null, null],
		["c1", 81, 348],
		["e1", 69, 310],
		["a1", 89, 247],
		["b1", 85, 227],
		["x", null, null],
		["x", null, null],
		["e1", 69, 310],
		["g#1", 54, 267],
		["b1", 85, 227],
		["c2", 73, 206],
		["x", null, null],
		["x", null, null],
		["e1", 69, 310],
		["e2", 80, 163],
		["d#2", 48, 185],
		["e2", 80, 163],
		["d#2", 48, 185],
		["e2", 80, 163],
		["b1", 85, 227],
		["d2", 79, 185],
		["c2", 73, 206],
		["a1", 89, 247],
		["x", null, null],
		["x", null, null],
		["c1", 81, 348],
		["e1", 69, 310],
		["a1", 89, 247],
		["b1", 85, 227],
		["x", null, null],
		["x", null, null],
		["d1", 87, 328],
		["c2", 73, 206],
		["b1", 85, 227],
		["a1", 89, 247],
		["x", null, null],
		["x", null, null],
		["b1", 85, 227],
		["c2", 73, 206],
		["d2", 79, 185],
		["e2", 80, 163],
		["x", null, null],
		["x", null, null],
		["g1", 84, 267],
		["f2", 219, 143],
		["e2", 80, 163],
		["d2", 79, 185],
		["x", null, null],
		["x", null, null],
		["f1", 82, 290],
		["e2", 80, 163],
		["d2", 79, 185],
		["c2", 73, 206],
		["x", null, null],
		["x", null, null],
		["e1", 69, 310],
		["d2", 79, 185],
		["c2", 73, 206],
		["b1", 85, 227],
		["x", null, null],
		["x", null, null],
		["e1", 69, 310]
	]
]

var endGame = function () {
	clearInterval(intervalId);
	gameOn = false;
	songPosition = canvas.width + 150
	xNotePosition = songPosition;
	leadNotePosition = songPosition;
	playedNotes = 0;
};

var drawNatural = function (yNotePosition, isDark) {
	if (isDark === true) {
		context.strokeStyle = "rgba(192, 172, 73, .25)";
	} else {
		context.strokeStyle = "#c0ac49";
	}
	context.lineWidth = 7;
	context.beginPath ();
	context.ellipse (xNotePosition, yNotePosition, 16, 12, 0 * Math.PI/180, 0, 2 * Math.PI);
	context.stroke ();
}

var drawSharp = function (yNotePosition, isDark) {
	if (isDark === true) {
		context.strokeStyle = "rgba(192, 172, 73, .25)";
	} else {
		context.strokeStyle = "#c0ac49";
	}
	context.lineWidth = 7;
	context.beginPath ();
	context.ellipse (xNotePosition, yNotePosition, 16, 12, 0 * Math.PI/180, 0, 2 * Math.PI);
	context.stroke ();
	context.closePath();
	context.beginPath ();
	context.lineWidth = 3;
	context.moveTo (xNotePosition-30, yNotePosition+12);
	context.lineTo (xNotePosition-28, yNotePosition-12);
	context.moveTo (xNotePosition-40, yNotePosition+12);
	context.lineTo (xNotePosition-38, yNotePosition-12);
	context.moveTo (xNotePosition-47, yNotePosition+5);
	context.lineTo (xNotePosition-21, yNotePosition+5);
	context.moveTo (xNotePosition-47, yNotePosition-5);
	context.lineTo (xNotePosition-21, yNotePosition-5);
	context.stroke ();
}

var drawSong = function () {
	for (i=0, len=songs[currentSong].length; i<len; i++) {
		var dark = false
		if (i < playedNotes) {
			dark = true;
		}
		if (songs[currentSong][i][0] === "x") {
			xNotePosition += (noteWidth/2);
			//this is an arbitary amount!!
		} else if (songs[currentSong][i][0].includes("#") === true) {
			drawSharp (songs[currentSong][i][2], dark);
			xNotePosition += noteWidth;
		} else {
			drawNatural (songs[currentSong][i][2], dark);
			xNotePosition += noteWidth;
		};
	};;		
}

var drawMeasure = function () {
	context.beginPath ();
	context.moveTo (145, 140);
	context.lineTo (145, 312);
	context.lineWidth = 8;
	context.strokeStyle = "#c0ac49";
	context.stroke ();
};

var drawCloud = function (xC, yC, s) {
	context.beginPath ();
	context.moveTo (xC, yC);
	context.bezierCurveTo (xC-s, yC-4*s, xC+3*s, yC-8*s, xC+7*s, yC-4*s);
	context.bezierCurveTo (xC+9*s, yC-10*s, xC+16*s, yC-9*s, xC+16*s, yC-3*s);
	context.bezierCurveTo (xC+18*s, yC-5*s, xC+22*s, yC-3*s, xC+20*s, yC);
	context.lineTo (xC,yC);
	context.closePath ();
	context.lineWidth = 3;
	context.strokeStyle = 'rgba(255,255,255,0.8)';
	context.stroke ();
	context.fillStyle = 'rgba(255,255,255,0.3)';
	context.fill();
};

var draw = function () {
	context.clearRect (0,0,canvas.width,canvas.height);
	var clouds = [ [110, 12, 1.3], [395, 25, 0.8] , [265,18,1.1,]];
	cloudSpeed = clouds[cloudNumber][2]
	drawCloud (xC,clouds[cloudNumber][0],clouds[cloudNumber][1]);
	xC += cloudSpeed;
	if (xC > canvas.width + clouds[cloudNumber][1]) {
		cloudNumber += 1;
		if (cloudNumber > 2) {
			cloudNumber = 0;
		};
		xC = 0 - 21 * clouds[cloudNumber][1];
	};
	drawMeasure ();
	drawSong ();
	songPosition -= noteSpeed;
	xNotePosition = songPosition;
	leadNotePosition -= noteSpeed;
	//for when you lose :(
	if (leadNotePosition <= 163) {
		endGame();
		if (score > highScore) {
			highScore = score;
			document.getElementById("high-score-p").innerHTML = highScore;
		};
		score = 0;
		$("#lose").show();
	};
};

var playSound = function (pitch) {
	var sound = document.getElementById(pitch);
	sound.currentTime = 0;
	sound.play();
}

$(document).keydown(function(e) {
	if (e.keyCode === 81) {
		$("#c-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("c1")};
	} else if (e.keyCode === 50) {
		$("#c-sharp-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("c#1")};
	} else if (e.keyCode === 87) {
		$("#d-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("d1")};
	} else if (e.keyCode === 51) {
		$("#d-sharp-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("d#1")};
	} else if (e.keyCode === 69) {
		$("#e-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("e1")};
	} else if (e.keyCode === 82) {
		$("#f-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("f1")};
	} else if (e.keyCode === 53) {
		$("#f-sharp-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("f#1")};
	} else if (e.keyCode === 84) {
		$("#g-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("g1")};
	} else if (e.keyCode === 54) {
		$("#g-sharp-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("g#1")};
	} else if (e.keyCode === 89) {
		$("#a-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("a1")};
	} else if (e.keyCode === 55) {
		$("#a-sharp-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("a#1")};
	} else if (e.keyCode === 85) {
		$("#b-1").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("b1")};
	} else if (e.keyCode === 73) {
		$("#c-2").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("c2")};
	} else if (e.keyCode === 57) {
		$("#c-sharp-2").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("c#2")};
	} else if (e.keyCode === 79) {
		$("#d-2").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("d2")};
	} else if (e.keyCode === 48) {
		$("#d-sharp-2").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("d#2")};
	} else if (e.keyCode === 80) {
		$("#e-2").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("e2")};
	} else if (e.keyCode === 219) {
		$("#f-2").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("f2")};
	} else if (e.keyCode === 187) {
		$("#f-sharp-2").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("f#2")};
	} else if (e.keyCode === 221) {
		$("#g-2").css("background-color", "#c0ac49");
		if (gameOn === false) {playSound("g2")};
	}
})

$(document).keyup(function(e) {
	if (e.keyCode === 81) {
		$("#c-1").css("background-color", "#fff");
	} else if (e.keyCode === 50) {
		$("#c-sharp-1").css("background-color", "#000");
	} else if (e.keyCode === 87) {
		$("#d-1").css("background-color", "#fff");
	} else if (e.keyCode === 51) {
		$("#d-sharp-1").css("background-color", "#000");
	} else if (e.keyCode === 69) {
		$("#e-1").css("background-color", "#fff");
	} else if (e.keyCode === 82) {
		$("#f-1").css("background-color", "#fff");
	} else if (e.keyCode === 53) {
		$("#f-sharp-1").css("background-color", "#000");
	} else if (e.keyCode === 84) {
		$("#g-1").css("background-color", "#fff");
	} else if (e.keyCode === 54) {
		$("#g-sharp-1").css("background-color", "#000");
	} else if (e.keyCode === 89) {
		$("#a-1").css("background-color", "#fff");
	} else if (e.keyCode === 55) {
		$("#a-sharp-1").css("background-color", "#000");
	} else if (e.keyCode === 85) {
		$("#b-1").css("background-color", "#fff");
	} else if (e.keyCode === 73) {
		$("#c-2").css("background-color", "#fff");
	} else if (e.keyCode === 57) {
		$("#c-sharp-2").css("background-color", "#000");
	} else if (e.keyCode === 79) {
		$("#d-2").css("background-color", "#fff");
	} else if (e.keyCode === 48) {
		$("#d-sharp-2").css("background-color", "#000");
	} else if (e.keyCode === 80) {
		$("#e-2").css("background-color", "#fff");
	} else if (e.keyCode === 219) {
		$("#f-2").css("background-color", "#fff");
	} else if (e.keyCode === 187) {
		$("#f-sharp-2").css("background-color", "#000");
	} else if (e.keyCode === 221) {
		$("#g-2").css("background-color", "#fff");
	}
})

$(document).ready( function() {
	document.getElementById("score-p").innerHTML = score;
	document.getElementById("high-score-p").innerHTML = highScore;
});

$(document).keyup(function(e) {
	if (e.keyCode === 13 && gameOn === false) {
		gameOn = true;
		document.getElementById("score-p").innerHTML = score;
		$(".intro").hide();
		intervalId = setInterval (draw, 20);
	};
})

// for when you try to play a note

$(document).keydown(function(e) {
	// for playing the right key
	if (gameOn === true) {
		if (e.keyCode === songs[currentSong][playedNotes][1]) {
			var note = songs[currentSong][playedNotes][0];
			playSound(note);
			playedNotes++;
			leadNotePosition += noteWidth;
			score += 5;
			document.getElementById("score-p").innerHTML = score;
			//if you win
			if (playedNotes === songs[currentSong].length) {
				endGame();
				if (currentSong > 2) {
					currentSong++;
				};
				$("#win").show();
				// if current song = 3, final screen
			}
			if (songs[currentSong][playedNotes][0] === "x") {
				while (songs[currentSong][playedNotes][0] === "x") {
					playedNotes++;
					leadNotePosition += (noteWidth/2);
				};
			};
		} else if (e.keyCode === 27) {
			endGame();
			if (score > highScore) {
				highScore = score;
				document.getElementById("high-score-p").innerHTML = highScore;
			};
			score = 0;
			$("#begin").show();
		//if you press the wrong key
		} else {
			document.getElementById("flub").play();
			score -= 1;
			document.getElementById("score-p").innerHTML = score;
		}
	}
});


