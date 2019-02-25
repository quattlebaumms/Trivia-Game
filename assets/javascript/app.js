var triviaQuestions = [{
  question: "Who is the Greek god of wine?",
  answerList: ["Eros", "Dionysus", "Ares", "Apollo"],
  answer: 1
}, {
  question: "Who is the goddess of the hunt?",
  answerList: ["Demeter", "Artemis", "Athena", "Hestia"],
  answer: 1
}, {
  question: "Which hero was NOT a warrior in Troy?",
  answerList: ["Achilles", "Patroclus", "Bellerophon", "Ajax"],
  answer: 2
}, {
  question: "Who is the god of death?",
  answerList: ["Ares", "Hypnos", "Midas", "Thanatos"],
  answer: 3
}, {
  question: "Who is the father of Icarus?",
  answerList: ["Daedalus", "Midas", "Zeus", "Nyx"],
  answer: 0
}, {
  question: "Who is NOT a gorgon?",
  answerList: ["Amycus", "Medusa", "Stheno", "Euryale"],
  answer: 0
}, {
  question: "What is one of Hera's sacred animals?",
  answerList: ["Dolphin", "Cat", "Owl", "Heifer"],
  answer: 3
}, {
  question: "Who is Scylla?",
  answerList: ["Demigod", "Sea Monster", "Cup-Bearer to the Gods", "Warrior of Troy"],
  answer: 1
}, {
  question: "A Satyr is half human and half what?",
  answerList: ["Donkey", "Horse", "Goat", "Dog"],
  answer: 2
}, {
  question: "Who is the husband of Aphrodite?",
  answerList: ["Hephaestus", "Ares", "Zeus", "Apollo"],
  answer: 0
}, {
  question: "Who ate from a pomegranate and subsequently became trapped in the underworld?",
  answerList: ["Hera", "Tartarus", "Persephone", "Hades"],
  answer: 2
}, {
  question: "Hippomenes beat Atalanta in a foot-race with the help of what golden fruit?",
  answerList: ["Banana", "Pomegranate", "Olive", "Apple"],
  answer: 3
}, {
  question: "Which hero passed six entrances to the Underworld along the road to Athens?",
  answerList: ["Perseus", "Oedipus", "Theseus", "Hercules"],
  answer: 2
}, {
  question: "What concept is not represented by a Muse?",
  answerList: ["Astronomy", "Poetry", "Divination", "Tragedy"],
  answer: 2
}, {
  question: "Which creature did Hercules fight for his 12 Labours?",
  answerList: ["The Erymanthian Boar", "The Sphinx", "The Minotaur", "The Calydonian Boar"],
  answer: 0
}];
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var messages = {
  correct: "That's Correct!",
  incorrect: "No, Wrong Answer.",
  endTime: "You Ran Out of Time!",
  finished: "Done! Let's Check Your Score."
}

$('#startBtn').on('click', function () {
  $(this).hide();
  newGame();
});

$('#startOverBtn').on('click', function () {
  $(this).hide();
  newGame();
});

function newGame() {
  $('#finalMessage').empty();
  $('#correctAnswers').empty();
  $('#incorrectAnswers').empty();
  $('#unanswered').empty();
  currentQuestion = 0;
  correctAnswer = 0;
  incorrectAnswer = 0;
  unanswered = 0;
  newQuestion();
}

function newQuestion() {
  $('#message').empty();
  $('#correctedAnswer').empty();
  answered = true;

  $('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
  $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
  for (var i = 0; i < 4; i++) {
    var choices = $('<div>');
    choices.text(triviaQuestions[currentQuestion].answerList[i]);
    choices.attr({
      'data-index': i
    });
    choices.addClass('thisChoice');
    $('.answerList').append(choices);
  }
  countdown();
  $('.thisChoice').on('click', function () {
    userSelect = $(this).data('index');
    clearInterval(time);
    answerPage();
  });
}

function countdown() {
  seconds = 15;
  $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
  answered = true;
  time = setInterval(showCountdown, 1000);
}

function showCountdown() {
  seconds--;
  $('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
  if (seconds < 1) {
    clearInterval(time);
    answered = false;
    answerPage();
  }
}

function answerPage() {
  $('#currentQuestion').empty();
  $('.thisChoice').empty(); 
  $('.question').empty();

  var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
  var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

  if ((userSelect == rightAnswerIndex) && (answered == true)) {
    correctAnswer++;
    $('#message').html(messages.correct);
  } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
    incorrectAnswer++;
    $('#message').html(messages.incorrect);
    $('#correctedAnswer').html('Correct Answer: ' + rightAnswerText);
  } else {
    unanswered++;
    $('#message').html(messages.endTime);
    $('#correctedAnswer').html('Correct Answer: ' + rightAnswerText);
    answered = true;
  }

  if (currentQuestion == (triviaQuestions.length - 1)) {
    setTimeout(scoreboard, 5000)
  } else {
    currentQuestion++;
    setTimeout(newQuestion, 5000);
  }
}

function scoreboard() {
  $('#timeLeft').empty();
  $('#message').empty();
  $('#correctedAnswer').empty();
  $('#finalMessage').html(messages.finished);
  $('#correctAnswers').html("Correct Answers: " + correctAnswer);
  $('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
  $('#unanswered').html("Unanswered: " + unanswered);
  $('#startOverBtn').addClass('reset');
  $('#startOverBtn').show();
  $('#startOverBtn').html('Play Again?');
}