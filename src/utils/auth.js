export function isUserAuthenticated() {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

export function loginUser(token) {
  const currentTime = Date.now() + 86400000;
  localStorage.setItem("expire", currentTime);
  localStorage.setItem("token", token);
}

export function logoutUser() {
  localStorage.removeItem("expire");
  localStorage.removeItem("token");
}
