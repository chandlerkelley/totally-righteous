var canvas = document.getElementById ("myCanvas");
var context = canvas.getContext ("2d");
var cloudNumber = 0;
var xC = -220;
var noteWidth = 40;
var xNotePosition = canvas.width + 150;
var noteSpeed = 2;
var score = 0;
var highScore = 0;
var intervalId = undefined;

var furElise = ["e2",["d#2",true],"e2",["d#2",true],"e2","b1","d2","c2","a1","x","x",
		"c1","e1","a1","b1","x","x","e1",["g#1",true],"b1","c2","x",
		"x","e1","e2",["d#2",true],"e2",["d#2",true],"e2","b1","d2","c2","a1","x","x",
		"c1","e1","a1","b1","x","x","d1","c2","b2","a2","x","x",
		"b1","c2","d2","e2","x","x","g1","f2","e2","d2","x","x",
		"f1","e2","d2","c2","x","x","e1","d2","c2","b1"]

//this one is just a test
var drawNote = function (yNotePosition) {
	context.beginPath ();
	context.ellipse (xNotePosition, yNotePosition, 18, 14, 0 * Math.PI/180, 0, 2 * Math.PI);
	context.strokeStyle = "#c0ac49";
	context.stroke ();
}

var drawNatural = function (yNotePosition) {
	context.beginPath ();
	context.ellipse (xNotePosition, yNotePosition, 18, 14, 0 * Math.PI/180, 0, 2 * Math.PI);
	context.strokeStyle = "#c0ac49";
	context.stroke ();
}

var drawSharp = function (yNotePosition) {
	context.beginPath ();
	context.ellipse (xNotePosition, yNotePosition, 18, 14, 0 * Math.PI/180, 0, 2 * Math.PI);
	context.strokeStyle = "#c0ac49";
	context.stroke ();
}

var drawSong = function () {
	for (i=0, len=furElise.length; i<len; i++) {
		if (furElise[i] === "x") {
			xNotePosition += 24;
			//this is an arbitary amount!!
		} else if (furElise[i][2] === true) {
			drawSharp (furElise[i][1]);
			xNotePosition += 24;
		} else {
			drawNatural (furElise[i][1]);
			xNotePosition += 24;
		}
	}
	xNotePosition -= noteSpeed;		
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
	drawNote (143);
	xNotePosition -= noteSpeed;
	if (xNotePosition <= 145) {
		clearInterval(intervalId);
		$(".intro").show();
		xNotePosition = canvas.width + 150;
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
	if (e.keyCode === 13) {
		$(".intro").hide();
		intervalId = setInterval (draw, 20);
	};
});




