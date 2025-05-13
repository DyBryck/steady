import { logout, refreshToken } from "./utils.js";

const GET_PROFILE_FETCH_URL = "http://localhost:4000/api/students/me";

const getProfile = async (hasRetried = false) => {
  const token = sessionStorage.getItem("accessToken");
  if (!token && hasRetried) {
    window.location.replace("http://localhost:3000/connexion");
  }

  const response = await fetch(GET_PROFILE_FETCH_URL, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) {
    logout();
    return;
  }

  const data = await response.json();

  if (response.status === 401 && !hasRetried) {
    await refreshToken();
    return getProfile(true);
  }

  displayStudentProfile(data.student);
  displayNextCourses(getNextCourses(data.student.courses));
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

const getNextCourses = (courses) => {
  const today = new Date();

  return courses
    .filter(({ date }) => {
      const courseDate = new Date(date);
      return courseDate > today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

const nextCoursesCtn = document.querySelector("#nextCoursesCtn");
const nextCoursesTitle = document.querySelector("#nextCoursesTitle");
const displayNextCourses = (courses) => {
  if (courses.length === 0) {
    nextCoursesTitle.textContent = "Vous n'avez pas de cours programmé.";
    return;
  } else {
    nextCoursesTitle.textContent = "Vos prochains cours :";
    courses.forEach((c) => {
      const title = document.createElement("h2");
      title.textContent = c.name;
      nextCoursesCtn.appendChild(title);

      const date = new Date(c.date);
      const dateP = document.createElement("p");
      dateP.textContent = `${date.toLocaleDateString("fr-FR")} à ${date.toLocaleTimeString(
        "fr-FR",
      )}`;
      nextCoursesCtn.appendChild(dateP);
    });
  }
};

getProfile();
