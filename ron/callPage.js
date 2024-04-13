document.addEventListener("DOMContentLoaded", function() {
    var timerElement = document.getElementById('timer');
    var alertElement = document.getElementById('alert');
    var alert118Element = document.getElementById('alert-118');
    var circleFill = document.querySelector('.circle-fill');
    var timerInterval;
    var secondsLeft = 120; // 2 minutes
    var totalSeconds = secondsLeft;

    function startTimer() {
        var timerInterval = setInterval(function() {
            var minutes = Math.floor(secondsLeft / 60);
            var seconds = secondsLeft % 60;

            // Display the timer
            timerElement.textContent = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

            // Calculate the percentage of time elapsed
            var percentageElapsed = (totalSeconds - secondsLeft) / totalSeconds;

            // Update the circle fill accordingly
            circleFill.style.fill = `hsl(${120 * percentageElapsed}, 100%, 50%)`;

            // Check if 118 seconds have elapsed
            if (minutes === 1 && seconds === 58) {
                alert118Element.style.display = 'block';
            }

            // Check if 30 seconds are left
            /*
            if (secondsLeft === 30) {
                alertElement.style.display = 'block';
            }
            */

            // Check if the timer has ended
            if (secondsLeft <= 0) {
                clearInterval(timerInterval);
                alertElement.style.display = 'none';
                alert118Element.style.display = 'none';
                timerElement.textContent = '00:00';
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

