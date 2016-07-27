var canvas = document.getElementById ("myCanvas");
var context = canvas.getContext ("2d");
var cloudNumber = 0;
var xC = -220;
var noteWidth = 80;
var songPosition = canvas.width + 150;
var xNotePosition = songPosition;
var leadNotePosition = songPosition;
var playedNotes = 0;
var noteSpeed = 2;
var score = 0;
var highScore = 0;
var intervalId = undefined;
var gameOn = false;

var furElise = [
	["e2", 80, 165],
	["d#2", 48, 187],
	["e2", 80, 165],
	["d#2", 48, 187],
	["e2", 80, 165],
	["b1", 85, 275],
	["d2", 79, 209],
	["c2", 73, 253],
	["a1", 89, 320],
// 	["x"],
// 	["x"],
// 	["c1"],
// 	["e1"],
// 	["a1", 89, 320],
// 	["b1", 85, 275],
// 	["x"],
// 	["x"],
// 	["e1"],
// 	["g#1"],
// 	["b1", 85, 275],
// 	["c2", 73, 253],
// 	["x"],
// 	["x"],
// 	["e1"],
// 	["e2", 80, 187],
// 	["d#2", 48, 143],
// 	["e2"],
// 	["d#2", 48, 187],
// 	["e2", 80, 165],
// 	["b1", 85, 275],
// 	["d2", 79, 209],
// 	["c2", 73, 253],
// 	["a1", 89, 320],
// 	["x"],
// 	["x"],
// 	["c1"],
// 	["e1"],
// 	["a1", 89, 320],
// 	["b1", 85, 275],
// 	["x"],
// 	["x"],
// 	["d1"],
// 	["c2", 73, 253],
// 	["b2"],
// 	["a2"],
// 	["x"],
// 	["x"],
// 	["b1", 85, 275],
// 	["c2", 73, 253],
// 	["d2", 79, 209],
// 	["e2", 80, 165],
// 	["x"],
// 	["x"],
// 	["g1"],
// 	["f2"],
// 	["e2", 80, 165],
// 	["d2"],
// 	["x"],
// 	["x"],
// 	["f1"],
// 	["e2", 80, 165],
// 	["d2", 79, 209],
// 	["c2", 73, 253],
// 	["x"],
// 	["x"],
// 	["e1"],
// 	["d2", 79, 209],
// 	["c2", 73, 253],
// 	["b1", 85, 275]
]

//this one is just a test
var drawNote = function (yNotePosition) {
	context.beginPath ();
	context.ellipse (xNotePosition, yNotePosition, 18, 14, 0 * Math.PI/180, 0, 2 * Math.PI);
	context.strokeStyle = "#c0ac49";
	context.stroke ();
}

var drawNatural = function (yNotePosition, isDark) {
	context.beginPath ();
	context.ellipse (xNotePosition, yNotePosition, 18, 14, 0 * Math.PI/180, 0, 2 * Math.PI);
	if (isDark === true) {
		context.strokeStyle = "rgba(192, 172, 73, .25)";
	} else {
		context.strokeStyle = "#c0ac49";
	}
	context.stroke ();
	console.log(yNotePosition);
}

var drawSharp = function (yNotePosition, isDark) {
	context.beginPath ();
	context.ellipse (xNotePosition, yNotePosition, 18, 14, 0 * Math.PI/180, 0, 2 * Math.PI);
	if (isDark === true) {
		context.strokeStyle = "rgba(192, 172, 73, .25)";
	} else {
		context.strokeStyle = "#c0ac49";
	}
	context.stroke ();
	console.log(yNotePosition);
}

var drawSong = function () {
	for (i=0, len=furElise.length; i<len; i++) {
		var dark = false
		if (i < playedNotes) {
			dark = true;
		}
		if (furElise[i] === "x") {
			xNotePosition += noteWidth;
			//this is an arbitary amount!!
		} else if (furElise[i][0].includes("#") === true) {
			drawSharp (furElise[i][2], dark);
			xNotePosition += noteWidth;
		} else {
			drawNatural (furElise[i][2], dark);
			xNotePosition += noteWidth;
		};
	};;		
}

var drawMeasure = function () {
	context.beginPath ();
	context.moveTo (145, 140);
	context.lineTo (145, 320);
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
	context.lineWidth = 3;
	context.strokeStyle = 'rgba(255,255,255,0.8)';
	context.stroke ();
	context.closePath ();
};

var draw = function () {
	context.clearRect (0,0,canvas.width,canvas.height);
	var clouds = [ [270,10,0.8,], [110, 8, 1.3], [200, 15, 0.6] ];
	speed = clouds[cloudNumber][2]
	drawCloud (xC,clouds[cloudNumber][0],clouds[cloudNumber][1]);
	xC += speed;
	if (xC > canvas.width + 20.5 * clouds[cloudNumber][1]) {
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
		clearInterval(intervalId);
		$(".intro").show();
		songPosition = canvas.width + 150
		xNotePosition = songPosition;
		leadNotePosition = songPosition;
		gameOn = false;
		if (score > highScore) {
			highScore = score;
		};
		notesPlayed = 0;
	};
};

$(document).keydown(function(e) {
	if (e.keyCode === 81) {
		$("#c-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 50) {
		$("#c-sharp-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 87) {
		$("#d-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 51) {
		$("#d-sharp-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 69) {
		$("#e-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 82) {
		$("#f-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 53) {
		$("#f-sharp-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 84) {
		$("#g-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 54) {
		$("#g-sharp-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 89) {
		$("#a-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 55) {
		$("#a-sharp-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 85) {
		$("#b-1").css("background-color", "#c0ac49");
	} else if (e.keyCode === 73) {
		$("#c-2").css("background-color", "#c0ac49");
	} else if (e.keyCode === 57) {
		$("#c-sharp-2").css("background-color", "#c0ac49");
	} else if (e.keyCode === 79) {
		$("#d-2").css("background-color", "#c0ac49");
	} else if (e.keyCode === 48) {
		$("#d-sharp-2").css("background-color", "#c0ac49");
	} else if (e.keyCode === 80) {
		$("#e-2").css("background-color", "#c0ac49");
	} else if (e.keyCode === 219) {
		$("#f-2").css("background-color", "#c0ac49");
	} else if (e.keyCode === 187) {
		$("#f-sharp-2").css("background-color", "#c0ac49");
	} else if (e.keyCode === 221) {
		$("#g-2").css("background-color", "#c0ac49");
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

$(document).keyup(function(e) {
	if (e.keyCode === 13 && gameOn === false) {
		gameOn = true;
		score = 0;
		$(".intro").hide();
		intervalId = setInterval (draw, 20);
	};
})

// for when you try to play a note

$(document).keydown(function(e) {
	if (e.keyCode === furElise[playedNotes][1] && gameOn === true) {
		playedNotes++;
		leadNotePosition += noteWidth;
		score += 5;
		//Update score here somehow
		if (furElise[notesPlayed][0] === "x") {
			playedNotes++;
			leadNotePosition += noteWidth;
		};
		// for when you win
		if (playedNotes.length === furElise.length) {
			alert("You win!");
			$(".intro").show();
			songPosition = canvas.width + 150
			xNotePosition = songPosition;
			leadNotePosition = songPosition;
			gameOn = false;
			if (score > highScore) {
			highScore = score;
			notesPlayed = 0;
			};
		};
	};
});


