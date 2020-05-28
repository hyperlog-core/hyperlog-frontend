export function isUserAuthenticated() {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}

export function loginUser(token) {
  localStorage.setItem("token", token);
}

export function logoutUser() {
  localStorage.removeItem("token");
}
