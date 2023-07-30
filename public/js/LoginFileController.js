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
        location.assign("/");
      }, 1500);
    }
    console.log(result);
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
const signupForm = document.querySelector(".form--login");
const openModalButton = document.querySelector("#openModal")

if (signupForm && openModalButton) {
    console.log(signupForm)
    console.log(openModalButton)
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    console.log(firstName, lastName, email);
    signup(firstName, lastName, email);
  });
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
