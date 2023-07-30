const modal = document.getElementById('myModal');
const openModalButton = document.getElementById('openModal');
const countdownElement = document.getElementById('count-down');

openModalButton.addEventListener('click', (e) => {
  e.preventDefault()
  // Slide modal to top
  let position = 100;
  const interval = setInterval(() => {
    if (position <= 0) {
      clearInterval(interval);
      // Navigate to index.html after 5 seconds
      let secondsLeft = 8;
      countdownElement.textContent = `Redirecting in ${secondsLeft} seconds`;

      const countdownInterval = setInterval(() => {
        secondsLeft--;
        countdownElement.textContent = `Redirecting in ${secondsLeft} seconds`;

        if (secondsLeft === 0) {
          clearInterval(countdownInterval);
          window.location.href = openModalButton.getAttribute('href');
        }
      }, 1000);
    } else {
      position -= 10;
      console.log(position)
      modal.style.top = `${position}vh`;
    }
  }, 10);
});
