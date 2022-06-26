'use strict'

document.addEventListener('DOMContentLoaded', function() {

    let wordsList = ['come', 'jugo', 'Lima', 'amor', 'casa', 'chile', 'bares', 'bebes', 'borre', 'bonos', 'apodos',
        'aretes', 'active', 'arrojo', 'belice', 'brasil', 'camerun', 'caldito', 'alpinos', 'alabama', 'bovedas'
    ];
    let randomLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    let wordGuess = [];
    let wordShow = [];
    let letterRecord = [];
    let tries = 10;
    let userWins = 0;
    let computerWins = 0;
    let nodeLetter = document.querySelector('#letter');
    let nodeBotton = document.querySelector('#botton');
    let nodeResult = document.querySelector('#result');
    let nodeTries = document.querySelector('#tries');
    let nodeRecord = document.querySelector('#record');
    let nodeUserWins = document.querySelector('#userWins');
    let nodeComputerWins = document.querySelector('#computerWins');
    let nodeBottonUser = document.querySelector('#bottonUser')
    let userAnswer = false;





    function beginGame() {

        let posAleatoriaListaPalabras = _.random(wordsList.length - 1);

        let randomWord = wordsList[posAleatoriaListaPalabras];

        wordGuess = randomWord.split('');

        for (let letter of wordGuess) {
            wordShow.push('_');
        }

        drawGame();
    }

    const userHelp = () => {

        let hint = _.random(randomLetters.length - 1);

        hint = randomLetters[hint];

        userAnswer = confirm("Desea una pista? Se mostrara una letra al azar, puede que sea trampa!");
        if (userAnswer = true) {
            window.confirm(hint)
            tries -= 1;
        } else {
            window.alert("A rechazado la pista")
        }
    }


    function secondTry() {
        let posAleatoriaListaPalabras = _.random(wordsList.length - 1);

        let randomWord = wordsList[posAleatoriaListaPalabras];

        wordGuess = randomWord.split('');
        wordShow = [];


        for (let letter of wordGuess) {
            wordShow.push('_');
        }
    }

    function drawGame() {

        let restart = 10;

        nodeResult.textContent = wordShow.join(' ');

        nodeTries.textContent = tries;

        nodeRecord.textContent = letterRecord.join(' ');

        nodeUserWins.textContent = userWins;

        nodeComputerWins.textContent = computerWins;

        if (tries <= 0) {
            tries = restart;
            secondTry();
        }

    }


    function testUserLetter() {

        let userLetter = nodeLetter.value;

        nodeLetter.value = '';

        nodeLetter.focus();

        for (const [posicion, letraAdivinar] of wordGuess.entries()) {

            if (userLetter == letraAdivinar) {

                wordShow[posicion] = letraAdivinar;
            }
        }

        if (!wordGuess.includes(userLetter)) {

            tries -= 1;

            letterRecord.push(userLetter);
        }

        endGame();

        drawGame();
    }


    function testEnter(evento) {
        if (evento.code == 'Enter') {
            testUserLetter();
        }
    }


    function endGame() {


        if (!wordShow.includes('_')) {
            Swal.fire({
                'icon': 'success',
                'title': 'Has Ganado!',
                'text': 'Has logrado acertar todas las letras! '
            });

            userWins = +1;
            secondTry();

        }

        //If para verificar si a el usuario le quedan intentos restantes
        if (tries == 0) {
            Swal.fire({
                'icon': 'error',
                'title': 'Has Perdido',
                'text': 'La palabra era: ' + wordGuess.join()

            });


            computerWins += 1

        }
    }





    nodeBotton.addEventListener('click', testUserLetter);

    nodeLetter.addEventListener('keyup', testEnter);

    nodeBottonUser.addEventListener('click', userHelp);


    let restart = 10;

    //Se llama la funcion beginGame para comenzar el juego nuevamente
    beginGame();




})