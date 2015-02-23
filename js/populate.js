function afterDiv () {

	var scoreContents = $('.score-contents');
	var homePage = $('.homepage');
	var youWin = $('.you-win');
	var main = $('main')
	var after = $('.after-div');

	function firstToSecondPage () {
		after.append($('#main').html())
		window.setTimeout(function(){$('.top').prop('checked', true)}, 1);
		adjustPiece();
	}

	function adjustPiece () {
		$('.piece').animate({
			'padding': '.7%'
		}, .001, function () {
			$('.piece').css({
				'padding': '7%'
			})
		})
	}

	function secondToThirdPage () {
		$('.you-win-input').prop('checked', true);
	}

	return {
		firstPage: function () {
			after.html($('#homepage').html());
		},

		secondPage: function () {
			firstToSecondPage();
		},

		thirdPage: function() {
			after.append($('#score-contents').html());
			main.hide();
			secondToThirdPage();
		}
	}

	


























}