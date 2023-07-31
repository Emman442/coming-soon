const modal = document.getElementById('myModal');
const openModalButton = document.getElementById('openModal');
const countdownElement = document.getElementById('count-down');
const signupForm = document.querySelector(".form--login");
openModalButton.addEventListener('click', (e) => {
  e.preventDefault()
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  console.log(firstName, lastName, email);
  signup(firstName, lastName,email)
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
const signup = async (firstName, lastName, email) => {
  console.log(email, firstName, lastName);
  try {
    const result = await axios({
      method: "POST",
      url: "/users/join-waitlist",
      data: {
        firstName,
        lastName,
        email,
      },
    });
    if (result.status == "201") {
      showAlert("success", "Account Created Successfully!!");
      window.setTimeout(() => {
        location.assign("/about");
      }, 1500);
    }
    console.log(result);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

// if (signupForm) {
//   signupForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const firstName = document.getElementById("firstName").value;
//     const lastName = document.getElementById("lastName").value;
//     const email = document.getElementById("email").value;
//     console.log(firstName, lastName, email);
//     signup(firstName, lastName, email);
//   });
// }
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};
const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}" style="background-color: #DAA520; text-align: center; color: white">${msg}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};
