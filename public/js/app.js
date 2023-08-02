const modal = document.getElementById('myModal');
const openModalButton = document.getElementById('openModal');
const openModalButtons = document.querySelector('.g-recaptcha');
const signupForm = document.querySelector('.form--login');
const countdownElement = document.getElementById('count-down');
const cancelButton = document.getElementById("cancelButton")
  const modalFirstName = document.getElementById("modal-firstName");
  const modalLastName = document.getElementById("modal-lastName");
function onSubmit(response) {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    if (!firstName || !lastName || !email) {
      showAlert("error", "Please Enter All Details");
    } else {
      signup(firstName, lastName, email);
    }
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
      }, 1500);
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
      let secondsLeft = 23;
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
  }, 23000);
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
  hideAlert();
  let secondsLeft = 20;
  const countdownElement = document.getElementById("count-down");
  const cancelButton = document.getElementById("cancelButton");
  const modal = document.getElementById("myModal");

  countdownElement.textContent = `Redirecting in ${secondsLeft} seconds`;

  const countdownInterval = setInterval(() => {
    secondsLeft--;
    countdownElement.textContent = `Redirecting in ${secondsLeft} seconds`;

    if (secondsLeft === 0) {
      clearInterval(countdownInterval);
      window.location.assign("/join");
    }
  }, 1000);

  cancelButton.addEventListener("click", () => {
    clearInterval(countdownInterval);
    hideAlert();
    modal.style.display = "none"; // Hide the modal
  });

  const markup = `
    <div class="alert alert--${type}" style="background-color: #000; height: 100vh; width: 100vw; top: 100vh; display: flex; flex-direction: column; justify-content: center; gap: 1.5rem;transition: all 0.2s;" id="myModal">
      <img src="./images/creed.gif" class="h-[50vh] object-contain -mt-[30vh] mx-auto xl:-mt-[15vh] -mb-[170px] lg:-mb-[100px]" />
      <div>
        <p class="text-white text-center mt-2 xl:text-xl">${msg}</p>
        <p class="text-white text-center mt-4 xl:text-xl" id="count-down">Redirecting to form...</p>
      </div>
    </div>
  `;

  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 5000);
};
