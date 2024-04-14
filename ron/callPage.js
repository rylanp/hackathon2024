const phrases = [
    "What is your favorite movie?",
    "What kind of food do you like?",
    "What is your major?",
    "Where are you from?",
    "Where would you like to visit?",
    "What are your siblings like?",
    "Why have you joined FrieNDme?",
    "What is something you enjoy?",
    "What sports do you play?",
    "What hobbies do you have?",
    "What is your deepest, darkest fear?",
    "What is your hometown like?"
]



document.addEventListener("DOMContentLoaded", function() {
    var timerElement = document.getElementById('timer');
    var tipElement = document.getElementById('tip');
    var alert118Element = document.getElementById('alert-118');
    var circleFill = document.querySelector('.circle-fill');
    var secondsLeft = 120; // 2 minutes
    var totalSeconds = secondsLeft;
    var tipNext = false;
    function startTimer() {
        var timerInterval = setInterval(function() {
            var minutes = Math.floor(secondsLeft / 60);
            var seconds = secondsLeft % 60;

            // Display the timer
            timerElement.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

            // Calculate the percentage of time elapsed
            var percentageElapsed = 1 - ((totalSeconds - secondsLeft) / totalSeconds);

            // Update the circle fill accordingly
            circleFill.style.fill = `hsl(${120 * percentageElapsed}, 75%, 50%)`;

            // Check if 118 seconds have elapsed
            if (secondsLeft <= 30 && secondsLeft > 26) {
                alert118Element.style.opacity = 1;
            }

            if (secondsLeft <= 24) {
                alert118Element.style.opacity = 0;
            }

            // Check if 30 seconds are left
            if (secondsLeft > 30) {
                alert118Element.style.opacity = 0;
            }
            if (tipNext <= 0){
                tipElement.textContent = phrases[Math.floor(Math.random()*phrases.length)];
                tipElement.style.opacity = 1;
                tipElement.style.transform = "translate(-50%, -50%)";
                tipNext = 100;
            }
            if (((secondsLeft+6) % 18) == 0){
                tipElement.style.opacity = 0;
                tipElement.style.transform = "translate(-150%, -50%)";
                tipNext = 6;
            }
            tipNext -= 1;

            // Check if the timer has ended
            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                timerElement.textContent = '00:00';
                alert118Element.style.opacity = 0;
                tipElement.style.opacity = 0;
                tipElement.style.transform = "translate(-150%, -50%)";
            } else {
                secondsLeft--;
            }
        }, 1000); // Update every second
    }

    startTimer();

    addTimeButton.addEventListener('click', function() {
        // Increment timer by one minute
        secondsLeft += 60;

        // Change button color to red
        addTimeButton.style.backgroundColor = '#f44336';

        // Disable button
        addTimeButton.disabled = true;
    });
});

