import { logout, refreshToken } from "./utils.js";

const GET_PROFILE_FETCH_URL = "http://localhost:4000/api/students/me";

const getProfile = async (hasRetried = false) => {
  const token = sessionStorage.getItem("accessToken");
  const response = await fetch(GET_PROFILE_FETCH_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  if (response.status === 401 && data.error === "Token expiré" && !hasRetried) {
    await refreshToken();
    return getProfile(true);
  }

  displayStudentProfile(data.student);
};

const displayStudentProfile = (studentData) => {
  const { firstName, lastName } = studentData;
  const profileDataCtn = document.querySelector("#profileDataCtn");

  const greetings = document.createElement("p");
  greetings.textContent = `Bonjour ${firstName} ${lastName}`;
  profileDataCtn.appendChild(greetings);

  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "Déconnexion";
  logoutBtn.addEventListener("click", logout);
  profileDataCtn.appendChild(logoutBtn);
};

getProfile();
