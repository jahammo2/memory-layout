function gamePlay(counterNum, heartNum) {

    var letter;
    var first;
    var second;
    var firstLetter;
    var secondLetter;
    var clicked;
    var heartLength;
    counter = counterNum;
    var lastClick;
    var lastClickFirst;

    $('.piece-section').on('click', function() {
        if (!($(this).hasClass('selected'))) {
            clicked = $(this);
            letter = $('span', clicked).html();
            var box = clicked.closest('.piece').find('.other-checkbox');
            box.prop('checked', true);
            matchPieces();
            if (counter === 0) {
                gameWin();
            }
        }
        if (lastClick) {
            lastClick.removeClass('selected');
        };
        lastClick = $(this);
        lastClick.addClass('selected');
    });

    function matchPieces() {
        if (firstLetter === undefined) {
            firstLetter = letter;
            first = clicked;
        } else {
            secondLetter = letter;
            second = clicked;
            checkMatch();
            clearLetters();
        }
    }

    function gameWin() {
        console.log('win');
        score = (seconds * 60) + ms;
        afterDiv().thirdPage();
        document.querySelector('.score-screen-reset').addEventListener("click", function() {
            location.reload();
        });
        $('.score-screen-score').html('score: ' + score);
        $('.score-screen-errors').html('errors: ' + (12 - heartLength));
        if ((60 - seconds) < 10) {
            $('.score-screen-time').html('time: 00:' + '0' + (60 - seconds) + ':' + (100 - ms));
        } else {
            $('.score-screen-time').html('time: 00:' + (60 - seconds) + ':' + (100 - ms));
        };
    }

    function checkMatch() {
        if (firstLetter === secondLetter) {
            function permanentLetter(piece) {
                var checkbox = piece.closest('.piece').find('.other-checkbox')
                var chosenLetter = piece.find('span');
                checkbox.remove();
                chosenLetter.css({
                    'opacity': 1,
                    'z-index': 10000
                })
            }
            permanentLetter(clicked)
            permanentLetter(first)
            counter -= 1;
        } else {
            function redoLetter(piece) {
                var pieceSec = piece.closest('.piece')
                var checkbox = pieceSec.find('.other-checkbox');
                checkbox.prop('checked', false);
            }

            window.setTimeout(function() {
                redoLetter(first)
            }, 400);
            window.setTimeout(function() {
                redoLetter(second)
            }, 400);
            window.setTimeout(function() {
                removeHearts()
            }, 401);
        }
    }

    function removeHearts() {
        heartLength = $('.fa-heart').length;
        console.log(heartLength)
        if (heartLength !== 1) {
            $('.hearts').find('.fa-heart:last').remove();
        } else {
            $('.hearts').find('.fa-heart:last').remove();
            gamePlay().gameLoss()
        }
    }

    function clearLetters() {
        firstLetter = undefined;
        secondLetter = undefined;
    }

    return {
        gameLoss: function() {
            console.log('lost');
            $('.other-checkbox').prop('checked', true);
            $('.you-lose-input').prop('checked', true);
            window.setTimeout(function() {
                location.reload()
            }, 1500);
        }
    }
}