
    // This is the word bank
    var words = ["Smirnoff", "Grey Goose", "Ciroc", "Capitan Morgan", "Kraken", "Malibu",
     "Bacardi", "Patron", "Don Julio", "Jose Cuervo", "Hendricks", "Bombay", "Fireball", "Jagermeister"
     , "Jack Daniels", "Crown Royal", "Hennessy", "Jameson"];

    var currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();

    // Counter for Guesses Left
    var guessesLeft = 10;
    document.getElementById("guesses-left").textContent = "Guesses Left: " + guessesLeft;

    // Counter for number of wins
    var wins = 0;
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    //counter for losses
    var loss = 0;
    document.getElementById("losses").innerHTML = "Losses: " + loss;

    var resetLettersGuessed = "Letters Guessed: "

    // empty array for the blanks
    var progressWord = [];

    var mysteryWord = [];
    var i;

    console.log("Current word is: " + currentWord);

    // Pushed blanks depending on word
    // 
    for (i = 0; i < currentWord.length; i++) {
        progressWord.push("__");
    }
    document.getElementById("word-guess").innerHTML = progressWord.join(" ");

    function letterInWord(letter) {
        
        var positions = new Array();
        for (i = 0 ; i < currentWord.length; i++) {
            if (currentWord[i] === letter)
                positions.push(i);
        }
        return positions
    }

    // return number of letters that is still not guessed
    function lettersToGuess() {
        var i ;
        var toGess = 0 ;
        for (i in progressWord) {
            if (progressWord[i] === "__")
                toGess++;
        }
        return toGess;
    }

    
    document.onkeyup = function (event) {
        var letter = event.key;
        var lettersGuessed = letter.toLocaleUpperCase();
        var i;

        console.log("You have typed a letter: ".concat(letter));

        var positions = letterInWord(lettersGuessed);


        
        if (positions.length) {
            console.log("User has pressed a letter from word: " + letter);

            for (i = 0 ; i < positions.length; i++) {
                progressWord[positions[i]] = lettersGuessed;
            }

            // replace progress Word underscore with letter pressed
            document.getElementById("word-guess").innerHTML = progressWord.join(" ");
        } else {
            document.getElementById("letters-guessed").innerHTML += lettersGuessed + " ";

            // subtract a point from guesses left
            guessesLeft--;
            document.getElementById("guesses-left").textContent = "Guesses Left: " + guessesLeft;
        }


        if (guessesLeft === 0) {
   
            
            loss = loss + 1;
            
            document.getElementById("losses").innerHTML = "Losses: " + loss;
            
            guessesLeft = 10;
            
            document.getElementById("letters-guessed").innerHTML = resetLettersGuessed;
            
            currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
            
            progressWord = [];
            for (i = 0; i < currentWord.length; i++) {
            progressWord.push("__");
        }



        }

        // this is the code that alerts you when you've won the game, then it will reset
        // the current word to begin another round
        if (lettersToGuess() == 0) {

        	alert("You Win!");
            




            // reset guesses left
            guessesLeft = 10;
            document.getElementById("guesses-left").textContent = "Guesses Left: " + guessesLeft;

            // reset letters guessed
            document.getElementById("letters-guessed").innerHTML = resetLettersGuessed;

            // This code generates a new word to guess and then pushes out the blanks again
            currentWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
            

            progressWord = [];
            for (i = 0; i < currentWord.length; i++) {
                progressWord.push("__");
            }
            document.getElementById("word-guess").innerHTML = progressWord.join(" ");

            // Add to the win total
            wins++;
            document.getElementById("wins").innerHTML = "Wins: " + wins;
            
        }
    }
