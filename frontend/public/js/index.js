document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const btnLogin = document.getElementById("showLogin");
  const btnRegister = document.getElementById("showRegister");
  const body = document.querySelector("body");

  const OPEN_DELAY = 200;

  let currentForm = null;

  function openForm(formToShow) {
    body.classList.add("dimmed");

    if (currentForm === formToShow) {
      currentForm.classList.remove("active");
      currentForm = null;
      return;
    }

    if (currentForm) {
      const onTransitionEnd = (e) => {
        if (e.propertyName === "height") {
          currentForm.removeEventListener("transitionend", onTransitionEnd);

          setTimeout(() => {
            formToShow.classList.add("active");
            currentForm = formToShow;
          }, OPEN_DELAY);
        }
      };
      currentForm.addEventListener("transitionend", onTransitionEnd);
      currentForm.classList.remove("active");
    } else {
      formToShow.classList.add("active");
      currentForm = formToShow;
    }
  }

  btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    openForm(loginForm);
  });

  btnRegister.addEventListener("click", (e) => {
    e.preventDefault();
    openForm(registerForm);
  });
});
