var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var cloudNumber = 0;
var xC = -220;
var noteWidth = 40;
var xNotePosition = canvas.width;
var noteSpeed = 2;

var furElise = ["e2",["d#2",true],"e2",["d#2",true],"e2","b1","d2","c2","a1","x","x",
		"c1","e1","a1","b1","x","x","e1",["g#1",true],"b1","c2","x",
		"x","e1","e2",["d#2",true],"e2",["d#2",true],"e2","b1","d2","c2","a1","x","x",
		"c1","e1","a1","b1","x","x","d1","c2","b2","a2","x","x",
		"b1","c2","d2","e2","x","x","g1","f2","e2","d2","x","x",
		"f1","e2","d2","c2","x","x","e1","d2","c2","b1"]

//this one is just a test
var drawNote = function (yNotePosition) {
	context.beginPath();
	context.ellipse(xNotePosition, yNotePosition, 18, 14, 0 * Math.PI/180, 0, 2 * Math.PI);
	context.strokeStyle = "#c0ac49";
	context.stroke();
}

var drawNatural = function (yNotePosition) {
	context.beginPath();
	context.ellipse(xNotePosition, yNotePosition, 18, 14, 0 * Math.PI/180, 0, 2 * Math.PI);
	context.strokeStyle = "#c0ac49";
	context.stroke();
}

var drawSharp = function (yNotePosition) {
	context.beginPath();
	context.ellipse(xNotePosition, yNotePosition, 18, 14, 0 * Math.PI/180, 0, 2 * Math.PI);
	context.strokeStyle = "#c0ac49";
	context.stroke();
}

var drawSong = function () {
	for (i=0, len=furElise.length; i<len; i++) {
		if (furElise[i] === "x") {
			xNotePosition+=24;
			//this is arbitary!!
		} else if (furElise[i][2] === true) {
			drawSharp(furElise[i][1]);
			xNotePosition+=24;
		} else {
			drawNatural(furElise[i][1]);
			xNotePosition+=24;
		}
	}
	xNotePosition-=noteSpeed;		
}

var drawMeasure = function () {
	context.beginPath();
	context.moveTo(145, 140);
	context.lineTo(145, 320);
	context.lineWidth = 8;
	context.strokeStyle = "#c0ac49";
	context.stroke();
};

var drawCloud = function(xC, yC, s) {
	context.beginPath();
	context.moveTo(xC, yC);
	context.bezierCurveTo(xC-s, yC-4*s, xC+3*s, yC-8*s, xC+7*s, yC-4*s);
	context.bezierCurveTo(xC+9*s, yC-10*s, xC+16*s, yC-9*s, xC+16*s, yC-3*s);
	context.bezierCurveTo(xC+18*s, yC-5*s, xC+22*s, yC-3*s, xC+20*s, yC);
	context.lineTo(xC,yC);
	context.lineWidth = 3;
	context.strokeStyle = 'rgba(255,255,255,0.8)';
	context.stroke();
	context.closePath();
};

var draw = function () {
	context.clearRect(0,0,canvas.width,canvas.height);
	var clouds = [[270,10,0.8,], [110, 8, 1.3], [200, 15, 0.6]];
	speed = clouds[cloudNumber][2]
	drawCloud(xC,clouds[cloudNumber][0],clouds[cloudNumber][1]);
	xC += speed;
	if (xC > canvas.width + 20.5*clouds[cloudNumber][1]) {
		cloudNumber+=1;
		if (cloudNumber>2) {
			cloudNumber=0;
		};
		xC = 0 - 21*clouds[cloudNumber][1];
	};
	drawMeasure();
	drawNote(143);
	xNotePosition -= noteSpeed;
};

setInterval (draw, 20);