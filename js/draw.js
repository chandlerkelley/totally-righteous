function drawNatural(y, isDark) {
  if (isDark === true) {
    context.strokeStyle = "rgba(192, 172, 73, .25)";
  } else {
    context.strokeStyle = "#c0ac49";
  }
  context.lineWidth = 7;
  context.beginPath ();
  context.ellipse (xNotePosition, y, 16, 12, 0 * Math.PI/180, 0, 2 * Math.PI);
  context.stroke ();
}

function drawSharp(y, isDark) {
  if (isDark === true) {
    context.strokeStyle = "rgba(192, 172, 73, .25)";
  } else {
    context.strokeStyle = "#c0ac49";
  }
  context.lineWidth = 7;
  context.beginPath ();
  context.ellipse (xNotePosition, y, 16, 12, 0 * Math.PI/180, 0, 2 * Math.PI);
  context.stroke ();
  context.closePath();
  context.beginPath ();
  context.lineWidth = 3;
  context.moveTo (xNotePosition-30, y+12);
  context.lineTo (xNotePosition-28, y-12);
  context.moveTo (xNotePosition-40, y+12);
  context.lineTo (xNotePosition-38, y-12);
  context.moveTo (xNotePosition-47, y+5);
  context.lineTo (xNotePosition-21, y+5);
  context.moveTo (xNotePosition-47, y-5);
  context.lineTo (xNotePosition-21, y-5);
  context.stroke ();
}

function isNewNote(note) {
  let delta = noteSpeed / 2;
  let max = canvas.width - 50;
  return max - delta <= xNotePosition && xNotePosition < max + delta;
}

function drawNote(note, played) {
  if (note.note.includes("#")) {
    drawSharp(note.y, played);
  }
  else {
    drawNatural(note.y, played);
  }

  if (autoPlay && !played && isNewNote(note)) {
    console.log('playWinningNote:', songs[currentSong][i].note);
    playNote(note);
    setTimeout(function() {
      resetNote(note);
    }, 200);
    playWinningNote();
  }
}

var drawSong = function () {
  for (i=0, len=songs[currentSong].length; i<len; i++) {
    var played = i < playedNotes;
    if (songs[currentSong][i].note === "x") {
      xNotePosition += noteWidth / 2; // this is an arbitary amount!!
    }
    else {
      drawNote(songs[currentSong][i], played);
      xNotePosition += noteWidth;
    }
  }
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

// this is the looped function that animates the game
var draw = function () {
  context.clearRect (0,0,canvas.width,canvas.height);
  var clouds = [ [110, 12, 1.3], [395, 25, 0.8] , [265,18,1.1] ];
  cloudSpeed = clouds[cloudNumber][2]
  drawCloud (xC,clouds[cloudNumber][0], clouds[cloudNumber][1]);
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
    $("#lose").fadeIn(200);
  };
};
