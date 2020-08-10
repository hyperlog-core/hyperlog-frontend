export function isUserAuthenticated() {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

export function loginUser(token, user, remember) {
  let currentTime;
  if (remember) {
    currentTime = Date.now() + 864000000;
  } else {
    currentTime = Date.now() + 86400000;
  }
  localStorage.setItem("expire", currentTime);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

export function logoutUser() {
  localStorage.removeItem("expire");
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}
