$(function() {

    var counter;
    var msInt;
    var secInt;
    var ms;
    var seconds;

    afterDiv().firstPage();

    $('.hard').on('click', function() {
        afterDiv().secondPage();
        gamePlay(12, 12);
        gameSetup().hardGame();
        for (var i = 2; i >= 0; i--) {
            $('.fa-heart:last').remove();
        };
    })

    $('.easy').on('click', function() {
        afterDiv().secondPage();
        $('.hard-memory-row').hide();
        gamePlay(9, 15);
        gameSetup().easyGame();
    })
})