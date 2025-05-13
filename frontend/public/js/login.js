import { displayMessage } from "./utils.js";

const loginForm = document.querySelector("#loginForm");
const LOGIN_FETCH_URL = "http://localhost:4000/api/auth/login";

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginForm);
  const body = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(LOGIN_FETCH_URL, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    sessionStorage.setItem("accessToken", data.accessToken);
    displayMessage(data.message);
    window.location.replace("http://localhost:3000/profile");
  } catch (error) {
    const errorMessage = error.message;
    console.error(errorMessage);
    displayMessage(errorMessage);
  }
});
