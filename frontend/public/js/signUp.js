const signUpForm = document.querySelector("#signUpForm");
const url = "http://localhost:4000/api/auth/register";

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signUpForm);
  const body = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    displayMessage(data.message);
    window.location.replace("http://localhost:3000/connexion");
  } catch (error) {
    const errorMessage = error.message;
    console.error(errorMessage);
    displayMessage(errorMessage);
  }
});

const displayMessage = (message) => {
  window.alert(message);
};
