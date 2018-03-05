$(document).ready(function () {

    var timerNumber = 20;
   
    var numCorrect = 0;
    var numIncorrect =0;
    var numAnswered =0;

    var answers = [];
    var currentQuestion =0;
    //questions,answers, put in array
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
        if(currentQuestion <=3) {
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
    var answerClear = function () {
		for (var i = 0; i < 3; i++) {
			$('#answer' + i).html('');
		}
		hide('.answer');
	};

	// Timer
	var start = function() {
		
		counter = setInterval(countDown, 2000);
		$('#startTitle').empty();
		// hide start button
		hide('#start');

		//write question & answers
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
	var stop = function () {
		clearInterval(counter);
	};

	
	var reset = function () {
		stop();
		timerNumber = 20;
		answers = [];
		currentQuestion = 0;
		clearScreen();
		$('#timerDiv').empty();
		write('#startTitle', 'Press Start Button to Begin!');
		show('#start');
		hide('#reset');
	};
	
	var gameOver = function() {
        stop();
        
		clearScreen();

		//game over results -not working
		write('#startTitle', '<h3>Game Over!</h3>');
		$('#scoreDiv').append('<h3>Here are your results</h3>');
		$('#scoreDiv').append('<h3>Number of correct answers: ' + numCorrect + '</h3>');
		show('#reset');
	};

	//next question function
	var nextQuestion = function () {
		$('#image').css('display', 'none');
		$('#questionDiv').css('display', 'initial');
		$('#answersDiv').css('display', 'initial');
		$('#answerMsg').css('display', 'none');
		clearInterval();
		timerNumber = 20;
	}

	//check answer
	$('.answer').click(function () {
		var clicked = $(this);
		var value = clicked.attr('value');
		var correctAnswer = trivia[currentQuestion].correct;

		if (value == correctAnswer) {
			$('#questionDiv').empty();
			answerClear();
			$('#answersDiv').css('display', 'none');
			$('#questionDiv').css('display', 'none');
			$('#answerMsg').css('display', 'initial');
			
            
            //not sure about this-
            setInterval(nextQuestion, 1 * 200);
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

	 // click handlers	
	$('#start').on("click", start);
	$('#reset').on('click', reset);

})

