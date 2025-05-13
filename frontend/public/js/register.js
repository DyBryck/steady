import { displayMessage } from "./utils.js";

const registerForm = document.querySelector("#registerForm");
const REGISTER_FETCH_URL = "http://localhost:4000/api/auth/register";

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);
  const body = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(REGISTER_FETCH_URL, {
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
