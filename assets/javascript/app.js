//timer is running super slowly. I would like it to go to zero after the third question is answered, but it doesn't. This is a lot of pieced together code from many different google searches and w3schools examples. I'm sure there is a more efficient method,but it's sort of working... so... yay!?!

$(document).ready(function () {

    var timerNumber = 20;
   
    var numCorrect = 0;
    var numIncorrect =0;
    var numAnswered =0;

    var answers = [];
    var currentQuestion =0;
    
    var trivia = [
        q1 = {
            question: "Pirates always fly the Smile Face Flag when they are at sea.",
            multChoice: ["True", "False"],
            correct: 1,
        },
        q2 = {
            question: "Scurvy is a real disease.",
            multChoice: ["True", "False"],
            correct: 0,
        },
        q3 = {
            question: "Captain Hook is Peter Pan's nemisis.",
            multChoice: ["True", "False"],
            correct: 0,
        },
	];
	
    //hide 
    var hide = function(elementId) {
        $(elementId).css("visibility", "hidden");
    };
    //show 
    var show = function(elementId) {
        $(elementId).css("visibility", "visible");
    };
   
    var questionWrite = function () {
        if(currentQuestion <=2) {
            $("#questionDiv").html("<h2>"+ trivia[currentQuestion].question + "</h2>");
            answers=trivia[currentQuestion].multChoice;
            show(".answer");
            for (var i = 0; i < answers.length; i++) {
                $("#answer" + i).html("<h3>" + answers[i] + "</h3>");
            }
        }
            else {
                gameOver();

        }
	};
	//I don't really understand how this function works, but it allows the next answer to be accepted (clears out the previous one)
    var answerClear = function () {
		for (var i = 0; i < 3; i++) {
			$('#answer' + i).html('');
		}
		hide('.answer');
	};

	//starts the game and counter
	var start = function() {
		
		counter = setInterval(countDown, 2000); 
		$('#startTitle').empty();
		// hide start button
		hide('#start');

		
		questionWrite();	
	};

	// clears all content
	var clearScreen = function () {
		$('#startTitle').empty();
		$('#questionDiv').empty();
		$('#scoreDiv').empty();
		answerClear();
	}

	
	var countDown = function () {
		timerNumber --;
		$('#timerDiv').html('<h2> Time Remaining: ' + timerNumber + '</h2>');
		if (timerNumber == 0) {
			gameOver();
		}
	};
	//game stops at 0
	var stop = function () {
		clearInterval(counter);
	};
	var gameOver = function() {
        stop();
      	clearScreen();

	// shows results 	
		$("#scoreDiv").append("<h3>Here be your results:</h3>");
		$("#scoreDiv").append("<h3>You got: " + numCorrect + " correct!</h3>");
		
	};

	//next question function
	var nextQuestion = function () {
		
		$("#questionDiv").css("display", "initial");
		$("#answersDiv").css("display", "initial");
		$("#answerMsg").css("display", "none");
		clearInterval();
		timerNumber = 20;
	}

	
	$(".answer").click(function () {
		var clicked = $(this);
		var value = clicked.attr("value");
		var correctAnswer = trivia[currentQuestion].correct;

		if (value == correctAnswer) {
			$("#questionDiv").empty();
			answerClear();
			$("#answersDiv").css("display", "none");
			$("#questionDiv").css("display", "none");
			$("#answerMsg").css("display", "initial");
			
                   
            setInterval(nextQuestion, 3 * 200);
			numAnswered ++;
			numCorrect ++;
			currentQuestion ++;
			questionWrite();
		}
		else {
			numAnswered ++;
			numIncorrect ++;
			currentQuestion ++;
			timerNumber = 20;
			$('#questionDiv').empty();
			answerClear();
			questionWrite();
		}
	});

	$('#start').on("click", start);
	

})

