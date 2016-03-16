//Declare variables
var userName = "Player 1";
var userNameTwo = "Player 2";
var playerLocation;
var screenOne, screenTwo, screenThree, screenFour, correctAnswer, thisStateFact, thisStateName, wrongAnswers;
var counter = 0;
var userScoreOne = 0;
var userScoreTwo = 0;
var tenPercent = $("div.race").width()/10;
var resetCars = function() {
	$("#car1").removeAttr("style");
	$("#car2").removeAttr("style");
}
//additional states variables & objects at bottom of file

//hide screens at start
var startScreen = function() {
	$(".firstScreen").hide();
	$(".firstScreen").fadeIn(1500);
	$("div.gameBoard").hide();
	$("form.firstPlayer").show();
	$("div.race").hide();
	userScoreOne = 0;
	userScoreTwo = 0;
	counter = 0;
	$("#playerTwoTurn span").removeClass("glyphicon glyphicon-arrow-down");
	$("#playerOneTurn span").addClass("glyphicon glyphicon-arrow-down");
	/*userName = '';
	userNameTwo = '';*/
	states = [ alabama, alaska, arizona, arkansas, california, colorado, connecticut, delaware, florida, georgia, hawaii, idaho, illinois, indiana, iowa, kansas, kentucky, louisiana, maine, maryland, massachusetts, michigan, minnesota, mississippi, missouri, montana, nevada, nebraska, nj, nh, ny, nm, nc, nd, ohio, oklahoma, oregon, pennsylvania, ri, sc, sd, tennessee, texas, utah, vermont, virginia, washington, wv, wisconsin, wyoming ]
}

//load first screen
$(document).ready(function() {
	startScreen();
	//Add event listener to get user's userName
	/*$("button.startGame").click(function(e) {
		e.preventDefault();
		if ($("#player1Name").val() != '') {	
			userName = $("#player1Name").val();
			$("#player1Name").val('');
			$("form.firstPlayer").hide(1000);
			$(".userName").text(userName);
			if ($("#player2Name").val() != '') {	
				userNameTwo = $("#player2Name").val();
				$("#player1Name").val('');
				$("form.firstPlayer").hide(1000);
				$(".userNameTwo").text(userNameTwo);
			}
		} else {
			swal({
				title: "Name needed!",
				text: "Please enter names for both players!",
				timer: 1000,
				showConfirmButton: false });
		}
	});*/

	//function to set up gameBoard for next question round
	var nextRound = function() {
		correctAnswer = Math.floor(Math.random() * states.length);
		thisStateName = states[correctAnswer].name;
		thisStateFact = states[correctAnswer].fact;
	
		//Remove this state from the array so question isn't duplicated later in game
		states.splice(correctAnswer, 1);
		var statesCount = states.length;
		$("#statesLength").text("EXIT: " + ' ' + statesCount);
		
		//Reset wrong answers, pull 3 random wrong answers from remaining states array
		var statesCopy = states.slice(0);
		allAnswers = [thisStateFact];
		var getWrongAnswers = function() {
			for (var x = 0; x < 3; x++) {
				var wrongFact = Math.floor(Math.random() * statesCopy.length);
				allAnswers.push(statesCopy[wrongFact].fact);
				statesCopy.splice(wrongFact, 1);
			}
		}
		getWrongAnswers();

		//Randomly assign answer order & show on screen
		var randomAnswers = [];
		for (var n = 0; n < 4; n++) {
			var randomOrder = Math.floor(Math.random() * allAnswers.length);
			randomAnswers.push(allAnswers[randomOrder]);
			allAnswers.splice(randomOrder, 1);
		}
		$("div.question").text(thisStateName);
		$("#optionOne").text(randomAnswers[0]);
		$("#optionTwo").text(randomAnswers[1]);
		$("#optionThree").text(randomAnswers[2]);
		$("#optionFour").text(randomAnswers[3]);
	}

	//Start Game
	$("button.startGame").on("click", function() {
		$(".firstScreen").hide();
		nextRound();
		$("div.gameBoard").show();
		$("div.race").show();
		$("#userOneScore").text(userScoreOne);
		$("#userTwoScore").text(userScoreTwo);
	});
	
	//Declare function to check for winner after each round
	var checkWinner = function() {
		if (userScoreOne === 5) {
			swal(userName + " wins!");
			startScreen();
			resetCars();
		} else if (userScoreTwo === 5) {
			swal(userNameTwo + " wins!");
			startScreen();
			resetCars();
		} else if (states.length === 0) {
			swal("Game over", "Out of states!");
			startScreen();
			resetCars();
		} else {
			nextRound();
		}
	}

	//Get answer & alert right or wrong, if right add score & move car
	$("div.answer").on("click", function() {
		if ($(this).context.innerHTML == thisStateFact) {
			if (counter % 2 === 0) {
				swal("Correct!", "Point for " + userName, "success");
				userScoreOne+=1;
				$("#userOneScore").text(userScoreOne);
				$("#car1").animate({
					left: "+=9%",
					bottom: "+=14%",
					width: "-=5%",
					height: "-=10%"
				}, 700, checkWinner);
			} else {
				swal("Correct!", "Point for " + userNameTwo, "success");
				userScoreTwo+=1;
				$("#userTwoScore").text(userScoreTwo);
				$("#car2").animate({
					right: "+=9%",
					bottom: "+=14%",
					width: "-=5%",
					height: "-=10%" 
				}, 700, checkWinner);
			}
		} else {
			swal("Sorry, that's not right.", "The correct answer is: " + thisStateFact, "error");
			nextRound();
		}
		counter+=1;
		if (counter % 2 === 0) {
			$("#playerTwoTurn span").removeClass("glyphicon glyphicon-arrow-down");
			$("#playerOneTurn span").addClass("glyphicon glyphicon-arrow-down");
		} else {
			$("#playerOneTurn span").removeClass("glyphicon glyphicon-arrow-down");
			$("#playerTwoTurn span").addClass("glyphicon glyphicon-arrow-down");
		}
	});
});

//Function to create State objects
function State(name, fact) {
	this.name = name;
	this.fact = fact;
}

//Create new object for each state
var alabama = new State("Alabama", "It is illegal to wear a fake mustache that causes laughter in church.");
var alaska = new State("Alaska", "It is illegal to wake a sleeping bear to take a photo.");
var arizona = new State("Arizona", "It is illegal for donkeys to sleep in bathtubs.");
var arkansas = new State("Arkansas", "It is illegal to mispronounce 'Arkansas'.");
var california = new State("California", "A frog that dies during a frog-jumping contest cannot legally be eaten.");
var colorado = new State("Colorado", "It is illegal to ride a horse while under the influence.");
var connecticut = new State("Connecticut", "A pickle cannot be legally considered a pickle unless it bounces.");
var delaware = new State("Delaware", "R-rated movies shall not be shown at drive-in theaters.");
var florida = new State("Florida", "If an elephant is left tied to a parking meter, the parking fee has to be paid just as it would for a vehicle.");
var georgia = new State("Georgia", "It is illegal to keep an ice cream cone in your back pocket on Sundays.");
var hawaii = new State("Hawaii", "Coins are not allowed to be placed in one's ears.");
var idaho = new State("Idaho", "It is illegal to give your sweetheart a box of chocolates weighing more than 50 pounds.");
var illinois = new State("Illinois", "It is legal for a minor to drink as long as he or she is enrolled in a culinary program.");
var indiana = new State("Indiana", "Mustaches are illegal if the bearer has a tendency to habitually kiss other humans.");
var iowa = new State("Iowa", "One armed piano players must, by law, perform for free.");
var kansas = new State("Kansas", "A poorly worded law states that if two trains meet on the same track, neither shall proceed until the other has passed.");
var kentucky = new State("Kentucky", "One may not dye a duckling blue and offer it for sale unless more than six are for sale at once.");
var louisiana = new State("Louisiana", "You can be fined $500 for sending a pizza order to someone's house without his or her knowledge.");
var maine = new State("Maine", "It is illegal to keep Christmas decorations up after January 14.");
var maryland = new State("Maryland", "It is a violation to be in a public park with a sleeveless shirt. $10 fine.");
var massachusetts = new State("Massachusetts", "It is illegal to own an explosive golf ball.");
var michigan = new State("Michigan", "It is illegal for women to cut their own hair without their husband's permission.");
var minnesota = new State("Minnesota", "A person may not cross state lines with a duck atop his or her head.");
var mississippi = new State("Mississippi", "One may be fined up to $100 for using profane language in public places.");
var missouri = new State("Missouri", "It is illegal to drive with an uncaged bear.");
var montana = new State("Montana", "Guiding sheep onto a railroad track with intent to injure the train is subject to a fine up to $50,000 and serving at most five years in prison.");
var nevada = new State("Nevada", "It is illegal to drive a camel on the highway.");
var nebraska = new State("Nebraska", "It is illegal for a mother to give her daughter a perm without a state license.");
var nj = new State("New Jersey", "It is against the law for a man to knit during the fishing season.");
var nh = new State("New Hampshire", "As of 1973, it's illegal to carry away or collect seaweed at night.");
var ny = new State("New York", "Slippers are not to be worn after 10 p.m.");
var nm = new State("New Mexico", "State officials ordered 400 words of sexually explicit material to be cut from Romeo and Juliet.");
var nc = new State("North Carolina", "Elephants may not be used to plow cotton fields.");
var nd = new State("North Dakota", "It is illegal to lie down and fall asleep with your shoes on.");
var ohio = new State("Ohio", "It is illegal to get a fish drunk.");
var oklahoma = new State("Oklahoma", "It is illegal to wrestle a bear.");
var oregon = new State("Oregon", "It is illegal to go hunting in a cemetary.");
var pennsylvania = new State("Pennsylvania", "It is illegal to tell a fortune teller where to dig for buried treasure.");
var ri = new State("Rhode Island", "Biting off someone's limb will result in 1-20 years in prison.");
var sc = new State("South Carolina", "Horses may not be kept in bathtubs.");
var sd = new State("South Dakota", "It is illegal to sleep in a cheese factory.");
var tennessee = new State("Tennessee", "It is illegal to share your Netflix password.");
var texas = new State("Texas", "It is illegal to sell one's eye.");
var utah = new State("Utah", "It is illegal NOT to drink milk.");
var vermont = new State("Vermont", "Women must obtain written permission from their husbands to wear false teeth.");
var virginia = new State("Virginia", "Children are not to go trick-or-treating on Halloween.");
var washington = new State("Washington", "The harassing of Bigfoot, Sasquatch or other undiscovered subspecies is a felony punishable by a fine and/or imprisonment.");
var wv = new State("West Virginia", "Whistling underwater is prohibited.");
var wisconsin = new State("Wisconsin", "It is illegal to serve butter substitutes in prison.");
var wyoming = new State("Wyoming", "You may not take a picture of a rabbit from January to April without an official permit.");

//create array with all 50 states
var states = [ alabama, alaska, arizona, arkansas, california, colorado, connecticut, delaware, florida, georgia, hawaii, idaho, illinois, indiana, iowa, kansas, kentucky, louisiana, maine, maryland, massachusetts, michigan, minnesota, mississippi, missouri, montana, nevada, nebraska, nj, nh, ny, nm, nc, nd, ohio, oklahoma, oregon, pennsylvania, ri, sc, sd, tennessee, texas, utah, vermont, virginia, washington, wv, wisconsin, wyoming ]

