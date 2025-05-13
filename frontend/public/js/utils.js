export const displayMessage = (message) => {
  window.alert(message);
};

export const refreshToken = async () => {
  const response = await fetch("http://localhost:4000/api/auth/refresh-token", {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  const { accessToken } = data;

  sessionStorage.setItem("accessToken", accessToken);
};

export const logout = async () => {
  await fetch("http://localhost:4000/api/auth/logout", {
    method: "DELETE",
    credentials: "include",
  });

  sessionStorage.removeItem("accessToken");

  window.alert("Déconnexion réussie");
  window.location.replace("http://localhost:3000/connexion");
};
