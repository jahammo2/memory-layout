function gameSetup () {

	var resultNumbers = []
	var alpha = "a b c d e f g h i j k l m n o p q r s t u v w x"
	var alphabet = alpha.split(' ');

	function chooseNumbers (numberChoice) {
		var i;
		for (i = numberChoice; i >= 1; i--) {
			var number = Math.ceil(Math.random() * 23);
			var num = i;
			if (num === numberChoice) {
				resultNumbers.push(number);
			} else {
				var count = 0;
				for (var n = resultNumbers.length - 1; n >= 0; n--) {			
					if (resultNumbers[n] !== number) {
						count += 1;
					};
				};
				if (count === resultNumbers.length) {
					resultNumbers.push(number);
				} else {
					i += 1;
				}
				count = 0;
			};
		};
	};

	var resultLetters = [];

	function chooseLetters () {
		var tempHolder = []
		for (var i = resultNumbers.length - 1; i >= 0; i--) {
			resultLetters.push(alphabet[resultNumbers[i]]);
			tempHolder.push(alphabet[resultNumbers[i]]);
		};
		//double the letters
		for (var i = tempHolder.length - 1; i >= 0; i--) {
			resultLetters.push(tempHolder[i])
		};
	}

	function shuffle(array) {
		  var currentIndex = array.length, temporaryValue, randomIndex ;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

			    // Pick a remaining element...
			    randomIndex = Math.floor(Math.random() * currentIndex);
			    currentIndex -= 1;

			    // And swap it with the current element.
			    temporaryValue = array[currentIndex];
			    array[currentIndex] = array[randomIndex];
			    array[randomIndex] = temporaryValue;
		  }

		  return array;
	}

	function setLetters (num) {
		var randomNumbers = [];
		for (var i = num; i >= 1; i--) {
			randomNumbers.push(i);
		};

		shuffle(randomNumbers);
		chooseLetters();

		var n;
		var labNum;

		function assignLetter () {
			var label = $('.piece-' + labNum);
			var assignSpan = label.find('.ingame-span');
			assignSpan.html(resultLetters[n]);
			var backSpan = label.find('.beginning-span');
			backSpan.html(resultLetters[n]);
		}

		for (n = num - 1; n >= 0; n--) {
			labNum = randomNumbers[n];
			assignLetter();
		}

	}

	function clock (secs) {
		ms = 99;
		seconds = secs;

		function secClock (sec) {
			seconds -= 1;
			setTimer();
			// stopClock();
		}

		function msClock () {
			ms -= 1;
			if (ms <= 0){
				ms = 99;
			}
			setTimer();
			stopClock();
		}

		function stopClock () {
			if (seconds === 0 && ms <= 50) {
				clearInterval(msInt);
				clearInterval(secInt);
				$('.timer').html('00:00:00');	
				gamePlay().gameLoss();	
			}
		}

		function addZero (timeSpec) {
			if (timeSpec < 10) {
				timeSpec = "0" + timeSpec;
			}
			return timeSpec;
		}

		function setTimer () {
			ms = addZero(ms);
			if (seconds < 10) {
				$('.timer').html('00:' + '0' + seconds + ':' + ms);
			} else { 
				$('.timer').html('00:' + seconds + ':' + ms);
			}		
		}
				
		msInt = window.setInterval(function(){msClock()},10);
		secInt = window.setInterval(function(){secClock()},1000);
	}

	return {
		easyGame: function () {
			chooseNumbers(9);
			setLetters(18);
			clock(59);
		},

		hardGame: function () {
			chooseNumbers(12);
			setLetters(24);
			clock(39);
		}
	}
}




// For reset: set resultNumbers = []