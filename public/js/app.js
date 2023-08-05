
const modal = document.getElementById('myModal');
const openModalButton = document.getElementById('openModal');
const openModalButtons = document.querySelector('#captcha');
const signupForm = document.querySelector('.form--login');
const countdownElement = document.getElementById('count-down');
const cancelButton = document.getElementById("cancelButton")
const modalFirstName = document.getElementById("modal-firstName");
const modalLastName = document.getElementById("modal-lastName");
let recaptcha_response = "";
// const captchaResponse = grecaptcha.getResponse()
function verifyCaptcha(token) {
  recaptcha_response = token;
  document.getElementById("g-recaptcha-error").innerHTML = "";
}
if(signupForm){
  signupForm.addEventListener("submit", async(e)=>{
    e.preventDefault()
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    if (!firstName || !lastName || !email) {
      showAlert("error", "Please Enter All Details");
    }
    if(recaptcha_response.length == 0) {
        document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">This field is required.</span>'
        return false;
    }
    signup(firstName, lastName, email);
  })
}
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
      modalFirstName.textContent = firstName;
      modalLastName.textContent = lastName;
      openModal()
      window.setTimeout(() => {
        location.assign("/about");
      }, 15000);
    }
    console.log(result);
  } catch (err) {
    showFullAlert("error", err.response.data.message);
  }
};
if (cancelButton) {
  cancelButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
}
const openModal = () => {
  let position = 100;
  const interval = setInterval(() => {
    if (position <= 0) {
      clearInterval(interval);
      let secondsLeft = 20;
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
}
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
const showFullAlert = (type, msg) => {
  let secondsLeft = 20;
  const countdownElement = document.getElementById("count-down");
  const cancelsButton = document.querySelector(".close-btn");
  const modal = document.getElementsByClassName("alert");

  countdownElement.textContent = `Redirecting in ${secondsLeft} seconds`;

  const countdownInterval = setInterval(() => {
    secondsLeft--;
    countdownElement.textContent = `Redirecting in ${secondsLeft} seconds`;

    if (secondsLeft === 0) {
      clearInterval(countdownInterval);
      window.location.assign("/index");
    }
  }, 10000);

 if (cancelsButton){
   cancelsButton.addEventListener("click", () => {
    const modal = document.querySelector(".alert");
     modal.style.display = "none";
   });
 }

 const markup = `
    <div class="alert alert--${type}" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: rgba(0, 0, 0, 0.8); z-index: 9999; transition duration-200"">
      <span style="position: absolute; top: 20px; right: 35px; font-size: 24px; cursor: pointer; color: white;" id="cancelsButton" class="close-btn">&times;</span>
      <img src="./images/creed.gif" style="height: 50vh; object-fit: contain; margin-top: -30vh; max-width: 100%; margin-bottom: -170px;">
      <div>
        <p style="color: white; text-align: center; font-size: 1.6rem; width: 60%; margin: 7% auto">${msg}</p>
        <p style="color: white; text-align: center; margin-top: 4rem; font-size: 1.6rem" id="count-down">Redirecting to home page...</p>
      </div>
    </div>
  `;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
  window.setTimeout(() => {
    location.assign("/about");
  }, 3000);
};