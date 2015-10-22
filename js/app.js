$(document).ready(function() {

generateQ1()
submit();
restart();

	});

var currentQuestion = 0;

var questions = new Array();

function Question(currentQuestion,answers,correct) {
	this.currentQuestion = currentQuestion;
	this.answers = answers;
	this.correct = correct;
}

questions [0] = new Question ("Name an animal that starts with the letter S",["Seal", "Snake", "Skunk", "Sheep", "Squirrel"], 1);
questions [1] = new Question ("Name an animal you might see on Old McDonald's farm",["Pig", "Duck", "Cow", "Chick", "Horse"], 2);
questions [2] = new Question ("Name something found in every home",["Bed", "Refrigerator" , "Bathroom", "Kitchen", "Television"], 4);
questions [3] = new Question ("Name an ugly dog breed",["Pitbull", "Chinese Crested", "Poodle", "Pug", "Bulldog"], 3);
questions [4] = new Question ("Name something you push",["Cart", "Husband", "Door", "Vacuum", "Lawn Mower"], 0);



// Write first question to page
function generateQ1() {
var q1 = questions [currentQuestion].currentQuestion;
$('#heading').append('<h4>' + q1 + '</h4>').hide().fadeIn('slow');
var write = "";
var a1 = questions [currentQuestion].answers;
for (var i = 0; i < a1.length; i++) {
    write += "<li><input type='radio' name='radio' class='option' value=" +(i)+ ">" + a1[i]+ "</li>";
};
$("#answers").append(write).hide().slideDown('slow');;
// document.getElementById('answers').innerHTML = write;
};


// Radio button being clicked
function submit(){
$('.option').click(function() {
   if($("input[type='radio'][name='radio']").is(':checked')) { 
   	evaluation();
   	$('.option').attr('disabled',true); 
   }
});
};



var selectedAnswer = "";


// Evaluate answer 
function evaluation() {

var selected = $("input[type='radio'][name='radio']:checked");
if (selected.length >= 0) {
    selectedAnswer = selected.val();
};

if (selectedAnswer == questions [currentQuestion].correct) {
	$('#correct').append("<p>Correct</p>");
	$('#next').append("<p>Next</p>");
	next();
	playerScore()
	currentQuestion++

}
	

else {
	$('#incorrect').append("<p>Incorrect. <br> <span class='correct-answer'>The correct answer was" + " " + questions[currentQuestion].answers[questions [currentQuestion].correct] + "</span></p>");
	$('#next').append("<p>Next</p>");
	next();
	currentQuestion++
}

}


function next() {
	$("#next").click(function() {
		$('h4').remove();
		$('li').remove();
		$(".outcome p").remove();

if (currentQuestion >= 5) {
	complete();
	restart();
	return;
}
else {
		generateQ1();
		questionNuber();
		submit();
}

	});

}

var score = 0;

function playerScore() {
	$('#score p').remove();
	score++
	$('#score').append(" " + '<p>' + score + '</p>');

}

function questionNuber() {
	$('#question p').remove();
	$('#question').append(" " + '<p>' + (currentQuestion +1) + '/5</p>');

}

function complete() {
	$('.status').hide();
	$('#heading').append("<h4>Quiz complete. You scored" + " " + score + " " + "out of 5<br>To try again click" + "<div class='restart'>HERE</div></h4>")
}

function restart() {
	$('.restart').click(function() {

	currentQuestion = 0;
	score = (score-(score+1));
	questions [0]
	
	$('h4').remove();
	$('li').remove();
	$(".outcome p").remove();

	questionNuber();
	generateQ1()
	submit();
	playerScore();
	$('.status').show();
	});
};