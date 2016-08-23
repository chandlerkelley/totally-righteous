$(document).keyup(function(e) {
  if (e.keyCode === 13 && gameOn === false) {
    startGame();
  }
  else {
    console.log('e.keyCode:', e.keyCode);
    switch (e.keyCode) {
      case 83: toggleSpeed(); break;
      case 65: toggleAutoPlay(); break;
    }
  }
});

var playSound = function(pitch) {
  var sound = document.getElementById(pitch);
  sound.currentTime = 0;
  sound.play();
};

function playNote(note) {
  $(note.noteId).css("background-color", "#c0ac49");
  if (gameOn === false) {
    playSound(note.note);
  }
}

function resetNote(note) {
  $(note.noteId).css("background-color", note.bgColor);
}

function findNote(keyCode) {
  return allNotes.find( n => n.keyCode === keyCode );
}

// plays sound
$(document).keydown(function(e) {
  let note = findNote(e.keyCode);
  if (note) {
    playNote(note);
  }
});

// unplay note
$(document).keyup(function(e) {
  let note = findNote(e.keyCode);
  if (note) {
    resetNote(note);
  }
});

function playWinningNote() {
  var note = songs[currentSong][playedNotes];
  playSound(note.note);
  playedNotes++;
  leadNotePosition += noteWidth;
  score += 5;
  $score.innerHTML = score;

  if (score > highScore) {
    highScore = score;
    $highScore.innerHTML = highScore;
  }

  // when you win
  if (playedNotes === songs[currentSong].length) {
    setTimeout(function() {
      endGame();
      currentSong = (currentSong + 1) % songs.length;
    }, 50);
    $("#win").fadeIn(200);
  }
  // skips blank "x" notes
  while (songs[currentSong][playedNotes].note === "x") {
    playedNotes++;
    leadNotePosition += (noteWidth / 2);
  }
}

// when note is played during game
$(document).keydown(function(e) {
  // when the right key is played
  if (gameOn === true) {
    if (e.keyCode === songs[currentSong][playedNotes].keyCode || autoCorrect) {
      playWinningNote();
    }
    // when ESC key is hit
    else if (e.keyCode === 27) {
      endGame();
      score = 0;
      $("#begin").fadeIn(200);
    }
    // when wrong key is pressed
    else {
      playSound("flub");
      score -= 1;
      $score.innerHTML = score;
    }
  }
});
