var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var n = 0;
var xC = -220;

var keyWidth = canvas.width/14;
var keyWhiteHeight = canvas.height/4;
var keyBlackHeight = canvas.height/7;

var drawWhiteKeys = function () {
	xWK = keyWidth;
	for (i=0; i<12; i++) {
		context.beginPath();
		context.rect(xWK, canvas.height-keyWhiteHeight-.05*canvas.height, keyWidth, keyWhiteHeight);
		context.closePath();
		context.strokeStyle = "#cdf";
		context.stroke();
		context.fillStyle = "#fff";
		context.fill();
		xWK += keyWidth;
	};
};

var drawBlackKeys = function () {
	xWK = 1.5*keyWidth;
	for (i=0; i<11; i++) {
		if (i%7 ===0 || i ===3 || i ===10) {
			xWK +=keyWidth;
		} else {
			context.beginPath();
			context.rect(xWK, canvas.height-keyWhiteHeight-.05*canvas.height, keyWidth, keyBlackHeight);
			context.closePath();
			context.strokeStyle = "cdf";
			context.stroke();
			context.fillStyle = "#000";
			context.fill();
			xWK += keyWidth;
		};
	};
};

// drawWhiteKeys();

// var drawWhiteKey = function () {
// 	context.fillStyle = "#fff";
// 	context.fillRect(keyWidth, 0, keyWidth, keyWhiteHeight);
// };

// drawWhiteKey();

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
	// drawWhiteKeys();
	// drawBlackKeys();
	var clouds = [[270,10,0.8,], [110, 8, 1.3], [200, 15, 0.6]];
	speed = clouds[n][2]
	drawCloud(xC,clouds[n][0],clouds[n][1]);
	xC += speed;
	if (xC > canvas.width + 20.5*clouds[n][1]) {
		n+=1;
		if (n>2) {
			n=0;
		};
		xC = 0 - 21*clouds[n][1];
	};
};

setInterval (draw, 20);